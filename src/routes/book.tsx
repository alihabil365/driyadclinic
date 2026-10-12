import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Eye, MapPin, Phone } from "lucide-react";
import { CAL_URL, PHONE_INTL, PHONE_NUMBER, translations, type Lang } from "@/lib/i18n";
import { mountCalEmbed } from "@/lib/cal-embed";
import { readLanguage, saveLanguage } from "@/lib/language";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Appointment — Dr. Iyad Eye Clinic" },
      {
        name: "description",
        content:
          "Book an appointment with Dr. Iyad Ali Habil. Choose an available time online — instant email confirmation.",
      },
      { property: "og:title", content: "Book Your Appointment — Dr. Iyad Eye Clinic" },
      {
        property: "og:description",
        content:
          "Book an appointment with Dr. Iyad Ali Habil. Choose an available time online — instant email confirmation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = translations[lang];
  const b = t.booking;
  const isRtl = lang === "ar";

  useEffect(() => {
    setLang(readLanguage());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = t.dir;
    }
  }, [lang, t.dir]);

  useEffect(() => {
    const cleanup = mountCalEmbed({
      elementId: "cal-booking-inline",
      onReady: () => {
        setLoaded(true);
        setFailed(false);
      },
      onError: () => setFailed(true),
    });
    return cleanup;
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    saveLanguage(next);
    setLang(next);
  };
  const fontClass = isRtl ? "font-arabic" : "font-sans";

  return (
    <div dir={t.dir} className={`${fontClass} min-h-screen bg-clinic-mist/40 text-clinic-navy`}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-clinic-navy/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-clinic-navy to-clinic-teal text-white">
              <Eye size={20} />
            </span>
            <span className="font-semibold text-clinic-navy text-sm sm:text-base whitespace-nowrap">
              {t.brand}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-2 rounded-lg border border-clinic-navy/15 text-sm text-clinic-navy hover:border-clinic-teal hover:text-clinic-teal transition-colors"
            >
              {t.langToggle}
            </button>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-clinic-navy/75 hover:text-clinic-teal"
            >
              <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
              {b.backHome}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clinic-teal/10 text-clinic-teal text-xs font-semibold uppercase tracking-wider">
            <CalendarIcon size={14} />
            {isRtl ? "الحجز عبر الإنترنت" : "Online Booking"}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-clinic-navy">
            {b.title}
          </h1>
          <p className="mt-4 text-clinic-navy/70 leading-relaxed">{b.subtitle}</p>
        </div>

        {/* Calendar card */}
        <div className="mt-10 rounded-3xl bg-white border border-clinic-navy/10 shadow-xl shadow-clinic-navy/5 overflow-hidden">
          <div className="relative w-full">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center bg-white z-10">
                {failed ? (
                  <div className="flex flex-col items-center gap-4 text-clinic-navy/70 px-6 text-center">
                    <p className="text-sm max-w-sm">{b.setupNote}</p>
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-clinic-teal text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <CalendarIcon size={16} />
                      {b.fallback}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-clinic-navy/70">
                    <div className="w-10 h-10 rounded-full border-2 border-clinic-teal/30 border-t-clinic-teal animate-spin" />
                    <span className="text-sm">{b.loading}</span>
                  </div>
                )}
              </div>
            )}
            <div
              id="cal-booking-inline"
              dir="ltr"
              className="w-full min-h-[720px] sm:min-h-[780px]"
            />
          </div>
        </div>

        {/* Fallback */}
        <div className="mt-6 flex justify-center">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-clinic-navy/15 text-clinic-navy text-sm font-medium hover:border-clinic-teal hover:text-clinic-teal transition-colors"
          >
            <CalendarIcon size={16} />
            {b.fallback}
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-clinic-navy/70">
          {isRtl
            ? "تتم معالجة بيانات الحجز عبر Cal.com. يرجى مراجعة سياسة الخصوصية وتجنب كتابة معلومات طبية حساسة في الملاحظات؛ اتصل بالعيادة لمناقشتها."
            : "Booking information is handled through Cal.com. Review its privacy policy and avoid entering sensitive medical information in the notes; call the clinic to discuss it."}{" "}
          <a
            href="https://cal.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-clinic-teal"
          >
            {isRtl ? "سياسة خصوصية Cal.com" : "Cal.com privacy policy"}
          </a>
        </p>

        {/* Clinic info */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <a
            href={`tel:${PHONE_INTL}`}
            className="flex items-start gap-4 rounded-2xl bg-white border border-clinic-navy/10 p-5 hover:border-clinic-teal/40 hover:shadow-md transition-all"
          >
            <span className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-clinic-teal/15 to-clinic-navy/10 text-clinic-teal shrink-0">
              <Phone size={20} />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-clinic-navy/50">
                {b.phoneLabel}
              </div>
              <div className="mt-1 text-base font-medium text-clinic-navy" dir="ltr">
                {PHONE_NUMBER}
              </div>
            </div>
          </a>
          <div className="flex items-start gap-4 rounded-2xl bg-white border border-clinic-navy/10 p-5">
            <span className="w-11 h-11 rounded-xl grid place-items-center bg-gradient-to-br from-clinic-teal/15 to-clinic-navy/10 text-clinic-teal shrink-0">
              <MapPin size={20} />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-clinic-navy/50">
                {b.addressLabel}
              </div>
              <div className="mt-1 text-sm text-clinic-navy leading-relaxed">
                {t.contact.address}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-clinic-navy/60">{b.urgentNote}</p>
      </main>
    </div>
  );
}
