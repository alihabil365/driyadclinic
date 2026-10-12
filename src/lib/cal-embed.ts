import { CAL_LINK } from "@/lib/i18n";

/**
 * Cal.com official embed loader.
 * Installs the window.Cal command queue stub before embed.js loads, so calls
 * made early are queued and replayed once the script arrives.
 */

type CalCommand = unknown[];
interface CalApi {
  (...args: unknown[]): void;
  q?: CalCommand[];
}
interface CalGlobal {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: CalCommand[];
}

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const NAMESPACE = "booking";
const BRAND_COLOR = "#148A94";

function installCalStub(): CalGlobal {
  // Official Cal.com embed snippet (queue stub)
  const w = window;
  if (!w.Cal) {
    const p = (a: { q?: CalCommand[] }, ar: CalCommand) => {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const cal = function (this: unknown, ...args: unknown[]) {
      const c = w.Cal as CalGlobal;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q || [];
        const script = document.createElement("script");
        script.src = EMBED_SRC;
        script.async = true;
        document.head.appendChild(script);
        c.loaded = true;
      }
      if (args[0] === "init") {
        const api = function (...apiArgs: unknown[]) {
          p(api as unknown as { q?: CalCommand[] }, apiArgs);
        } as CalApi;
        const namespace = args[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          c.ns![namespace] = c.ns![namespace] || api;
          p(c.ns![namespace] as unknown as { q?: CalCommand[] }, args);
          p(c, ["initNamespace", namespace]);
        } else {
          p(c, args);
        }
        return;
      }
      p(c, args);
    } as CalGlobal;
    w.Cal = cal;
  }
  return w.Cal;
}

export interface CalEmbedOptions {
  /** Element id (without #) of the container the calendar renders into */
  elementId: string;
  /** Called when the calendar reports it is ready */
  onReady?: () => void;
  /** Called when the calendar fails to load (bad link, network, etc.) */
  onError?: () => void;
  /** Ms before giving up and calling onError (default 12000) */
  timeoutMs?: number;
}

/**
 * Mount the Cal.com inline calendar into the given element.
 * Safe to call multiple times (reopen/revisit): the container is cleared and
 * the embed re-initialised, so no duplicate calendars appear.
 * Returns a cleanup function.
 */
export function mountCalEmbed({
  elementId,
  onReady,
  onError,
  timeoutMs = 12000,
}: CalEmbedOptions): () => void {
  if (typeof window === "undefined") return () => {};

  const element = document.getElementById(elementId);
  if (!element) {
    onError?.();
    return () => {};
  }

  // Prevent duplicate calendars on remount/reopen
  element.innerHTML = "";

  const Cal = installCalStub();
  Cal("init", NAMESPACE, { origin: "https://cal.com" });

  const ns = Cal.ns?.[NAMESPACE];
  if (!ns) {
    onError?.();
    return () => {};
  }

  let settled = false;
  let ready = false;
  const finish = (ok: boolean) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    if (ok) {
      ready = true;
      onReady?.();
    } else {
      onError?.();
    }
  };

  const timer = window.setTimeout(() => finish(false), timeoutMs);

  ns("inline", {
    elementOrSelector: `#${elementId}`,
    calLink: CAL_LINK,
    config: {
      layout: "month_view",
      theme: "light",
    },
  });

  ns("ui", {
    theme: "light",
    cssVarsPerTheme: {
      light: { "cal-brand": BRAND_COLOR },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
  });

  ns("on", {
    action: "linkReady",
    callback: () => finish(true),
  });
  ns("on", {
    action: "linkFailed",
    callback: () => finish(false),
  });

  return () => {
    window.clearTimeout(timer);
    if (!ready && !settled) {
      settled = true;
    }
  };
}
