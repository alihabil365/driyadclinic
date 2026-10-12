import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { CAL_URL, translations, type Lang } from "@/lib/i18n";
import { mountCalEmbed } from "@/lib/cal-embed";

interface Props {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}

export function BookingDialog({ open, onClose, lang }: Props) {
  const t = translations[lang].booking;
  const isRtl = lang === "ar";
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Mount the Cal.com embed each time the dialog opens (cleared first, so no
  // duplicate calendars when reopening)
  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    setFailed(false);
    const cleanup = mountCalEmbed({
      elementId: "cal-booking-embed",
      onReady: () => {
        setLoaded(true);
        setFailed(false);
      },
      onError: () => setFailed(true),
    });
    return cleanup;
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
          <div className="relative">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center bg-white z-10">
                {failed ? (
                  <div className="flex flex-col items-center gap-4 text-clinic-navy/70 px-6 text-center">
                    <p className="text-sm max-w-sm">{t.setupNote}</p>
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-clinic-teal text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <CalendarIcon size={16} />
                      {t.fallback}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-clinic-navy/70">
                    <div className="w-10 h-10 rounded-full border-2 border-clinic-teal/30 border-t-clinic-teal animate-spin" />
                    <span className="text-sm">{t.loading}</span>
                  </div>
                )}
              </div>
            )}
            <div id="cal-booking-embed" dir="ltr" className="min-h-[600px] w-full" />
          </div>
          <noscript>
            <p className="p-4 text-center text-clinic-navy/70">{t.setupNote}</p>
          </noscript>
        </div>
      </div>
    </div>
  );
}
