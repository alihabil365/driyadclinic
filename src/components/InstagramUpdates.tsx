import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { INSTAGRAM_URL, type Lang } from "@/lib/i18n";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let embedLoader: Promise<void> | undefined;

function loadInstagram(): Promise<void> {
  if (window.instgrm) return Promise.resolve();
  if (!embedLoader) {
    embedLoader = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm) resolve();
        else reject(new Error("Instagram embed unavailable"));
      };
      script.onerror = () => {
        script.remove();
        reject(new Error("Instagram script could not load"));
      };
      document.head.appendChild(script);
    }).catch((error) => {
      embedLoader = undefined;
      throw error;
    });
  }
  return embedLoader;
}

const copy = {
  en: {
    eyebrow: "From the clinic",
    title: "Eye-health updates",
    description:
      "Follow our latest informational posts about eye conditions, everyday eye care, and clinic updates on Instagram.",
    latest: "Check our latest posts",
    follow: "Follow the clinic",
    preview: "Latest from @dr.iyad_eyeclinic",
    unavailable:
      "The Instagram preview is unavailable. You can still read our latest posts on Instagram.",
    note: "Posts are shared in their original language. This information does not replace a consultation.",
  },
  ar: {
    eyebrow: "من العيادة",
    title: "معلومات ونصائح لصحة العين",
    description:
      "تابعوا أحدث منشوراتنا التوعوية حول أمراض العيون والعناية اليومية بصحة العين وأخبار العيادة على إنستغرام.",
    latest: "اطّلع على أحدث منشوراتنا",
    follow: "تابع حساب العيادة",
    preview: "أحدث المنشورات من حساب العيادة",
    unavailable:
      "معاينة إنستغرام غير متاحة حالياً. يمكنكم الاطّلاع على أحدث منشوراتنا مباشرةً على إنستغرام.",
    note: "تُعرض المنشورات بلغتها الأصلية. هذه المعلومات لا تغني عن الاستشارة الطبية.",
  },
};

export function InstagramUpdates({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const container = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    const render = () => {
      loadInstagram()
        .then(() => {
          if (!disposed) window.instgrm?.Embeds.process();
        })
        .catch(() => {
          if (!disposed) setUnavailable(true);
        });
    };
    // Keep third-party scripts off the initial page load.
    if (!("IntersectionObserver" in window)) {
      render();
      return () => {
        disposed = true;
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          render();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="updates"
      aria-labelledby="updates-title"
      className="py-20 lg:py-28 bg-clinic-mist/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-clinic-teal text-sm font-semibold uppercase tracking-wider">
            <Instagram size={18} aria-hidden="true" />
            {t.eyebrow}
          </span>
          <h2 id="updates-title" className="mt-3 text-3xl sm:text-4xl font-bold text-clinic-navy">
            {t.title}
          </h2>
          <p className="mt-5 text-clinic-navy/70 leading-relaxed">{t.description}</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-clinic-teal text-white font-medium hover:opacity-90 transition-opacity"
          >
            {t.latest}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-clinic-navy/60">{t.note}</p>
        </div>
        <div
          ref={container}
          className="min-w-0 rounded-3xl bg-white border border-clinic-navy/10 shadow-lg p-3 sm:p-5"
        >
          <p className="mb-4 text-sm font-semibold text-clinic-navy">{t.preview}</p>
          {unavailable ? (
            <p className="py-10 text-clinic-navy/70 leading-relaxed" role="status">
              {t.unavailable}
            </p>
          ) : (
            <div dir="ltr" className="instagram-preview">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={INSTAGRAM_URL}
                data-instgrm-version="14"
                style={{ width: "100%", margin: 0 }}
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 text-center text-clinic-teal"
                >
                  @dr.iyad_eyeclinic
                </a>
              </blockquote>
            </div>
          )}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-clinic-teal hover:underline"
          >
            <Instagram size={16} aria-hidden="true" />
            {t.follow}
          </a>
        </div>
      </div>
    </section>
  );
}
