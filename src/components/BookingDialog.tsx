import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CAL_LINK, translations, type Lang } from "@/lib/i18n";

interface Props {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}

export function BookingDialog({ open, onClose, lang }: Props) {
  const t = translations[lang].booking;
  const isRtl = lang === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  // Load Cal.com embed script once
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;

    // Inject Cal.com embed script if not already present
    const w = window as unknown as {
      Cal?: ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown> };
    };
    if (!w.Cal) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.onload = () => initCal();
      document.head.appendChild(script);
    } else {
      initCal();
    }

    function initCal() {
      const cal = (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal;
      if (!cal) return;
      cal("init", "booking", { origin: "https://cal.com" });
      cal("inline", {
        elementOrSelector: "#cal-booking-embed",
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          theme: "light",
        },
      });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#148A94" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-clinic-navy/10">
          <div>
            <h2 className="text-2xl font-bold text-clinic-navy">{t.title}</h2>
            <p className="mt-2 text-sm text-clinic-navy/70">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-lg hover:bg-clinic-mist text-clinic-navy shrink-0"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-2 sm:p-4">
          <div
            id="cal-booking-embed"
            ref={containerRef}
            className="min-h-[600px] w-full"
          />
          <noscript>
            <p className="p-4 text-center text-clinic-navy/70">{t.setupNote}</p>
          </noscript>
        </div>
      </div>
    </div>
  );
}
