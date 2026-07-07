import { useEffect, useState } from "react";
import {
  Eye,
  Instagram,
  Facebook,
  Clock,
  Menu,
  X,
  Stethoscope,
  Sparkles,
  ScanEye,
  HeartPulse,
  Sun,
  Languages,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-eye-clinic.jpg";
import doctorImg from "@/assets/doctor-portrait.jpg";
import {
  translations,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  PHONE_NUMBER,
  PHONE_INTL,
  EMAIL,
  type Lang,
} from "@/lib/i18n";

const serviceIcons = [ScanEye, Eye, Sparkles, Sun, HeartPulse];

export function ClinicSite() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      (localStorage.getItem("clinic-lang") as Lang | null)) || null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    localStorage.setItem("clinic-lang", lang);
    document.title = isRtl
      ? "عيادة د. إياد للعيون — طب وجراحة العيون"
      : "Dr. Iyad Eye Clinic — Specialized Ophthalmology Care";
    const desc = isRtl
      ? "عيادة د. إياد هابيل لطب وجراحة العيون، واستشارات أمراض القرنية والساد وتصحيح البصر بالليزر."
      : "Dr. Iyad Ali Habil — ophthalmology clinic offering cornea, cataract, and laser vision correction consultations.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, [lang, t.dir, isRtl]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const navItems: { key: keyof typeof t.nav; href: string }[] = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "hours", href: "#hours" },
    { key: "contact", href: "#contact" },
  ];

  const fontClass = isRtl ? "font-arabic" : "font-sans";

  return (
    <div
      dir={t.dir}
      className={`${fontClass} min-h-screen bg-white text-clinic-navy scroll-smooth`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/85 border-b border-clinic-navy/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-clinic-navy to-clinic-teal text-white">
              <Eye size={20} />
            </span>
            <span className="font-semibold text-clinic-navy text-sm sm:text-base whitespace-nowrap">
              {t.brand}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <a
                key={n.key}
                href={n.href}
                className="text-sm text-clinic-navy/75 hover:text-clinic-teal transition-colors"
              >
                {t.nav[n.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Switch language"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-clinic-navy/15 text-sm text-clinic-navy hover:border-clinic-teal hover:text-clinic-teal transition-colors"
            >
              <Languages size={16} />
              {t.langToggle}
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-clinic-navy to-clinic-teal text-white text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
            >
              <Instagram size={16} />
              {t.ctaInstagram}
            </a>
            <button
              className="lg:hidden p-2 rounded-lg border border-clinic-navy/15"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-clinic-navy/10 bg-white">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((n) => (
                <a
                  key={n.key}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-clinic-navy/80 hover:text-clinic-teal"
                >
                  {t.nav[n.key]}
                </a>
              ))}
              <button
                onClick={toggleLang}
                className="mt-2 py-2 text-start text-clinic-teal font-medium"
              >
                <Languages size={16} className="inline me-2" />
                {t.langToggle}
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-clinic-navy to-clinic-teal text-white text-sm font-medium"
              >
                <Instagram size={16} />
                {t.ctaInstagram}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-clinic-mist via-white to-white"
      >
        <div className="absolute inset-0 pointer-events-none opacity-60 [background:radial-gradient(60%_50%_at_80%_0%,rgba(20,138,148,0.15),transparent),radial-gradient(50%_40%_at_0%_100%,rgba(196,164,90,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clinic-teal/10 text-clinic-teal text-xs font-medium">
              <Stethoscope size={14} />
              {t.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-clinic-navy">
              {t.hero.title}
            </h1>
            <p className="mt-5 text-lg text-clinic-navy/70 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-clinic-navy to-clinic-teal text-white font-medium shadow-lg shadow-clinic-teal/20 hover:shadow-xl transition-shadow"
              >
                <Instagram size={18} />
                {t.hero.cta1}
              </a>
              <a
                href="#hours"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-clinic-navy/15 text-clinic-navy font-medium hover:border-clinic-teal hover:text-clinic-teal transition-colors"
              >
                <Clock size={18} />
                {t.hero.cta2}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-clinic-teal/20 to-clinic-gold/20 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white shadow-2xl shadow-clinic-navy/10">
              <img
                src={heroImg}
                alt=""
                width={1600}
                height={1200}
                className="w-full h-[420px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <span className="text-clinic-teal text-sm font-semibold uppercase tracking-wider">
              {isRtl ? "الطبيب" : "The Doctor"}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-clinic-navy">
              {t.about.title}
            </h2>
            <p className="mt-5 text-lg text-clinic-navy/70 leading-relaxed">
              {t.about.text}
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<Stethoscope size={18} />}
                label={isRtl ? "الاختصاص" : "Specialty"}
                value={t.about.specialty}
              />
              <InfoRow
                icon={<Sparkles size={18} />}
                label={isRtl ? "الاستشارات" : "Consultations"}
                value={t.about.subSpecialty}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-gradient-to-br from-clinic-navy to-clinic-teal p-1 shadow-2xl shadow-clinic-navy/15">
              <div className="rounded-[calc(1.5rem-4px)] bg-white p-6">
                <div className="rounded-2xl overflow-hidden bg-clinic-mist aspect-[4/5]">
                  <img
                    src={doctorImg}
                    alt={t.about.name}
                    width={1000}
                    height={1200}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-clinic-navy">
                    {t.about.name}
                  </h3>
                  <p className="text-sm text-clinic-navy/70 mt-1">
                    {t.about.specialty}
                  </p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-clinic-teal font-medium hover:underline"
                  >
                    <Instagram size={16} />
                    {t.about.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 lg:py-28 bg-clinic-mist/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-clinic-teal text-sm font-semibold uppercase tracking-wider">
              {isRtl ? "ما نقدمه" : "What we offer"}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-clinic-navy">
              {t.services.title}
            </h2>
            <p className="mt-4 text-clinic-navy/70">{t.services.subtitle}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, i) => {
              const Icon = serviceIcons[i] ?? Eye;
              return (
                <div
                  key={i}
                  className="group rounded-2xl bg-white border border-clinic-navy/5 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-clinic-teal/15 to-clinic-navy/10 text-clinic-teal group-hover:from-clinic-navy group-hover:to-clinic-teal group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-clinic-navy">
                    {item}
                  </h3>
                  <div className="mt-4 h-px bg-gradient-to-r from-clinic-teal/30 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section id="hours" className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-clinic-navy to-clinic-teal p-10 lg:p-14 text-white shadow-2xl shadow-clinic-navy/20">
            <div className="absolute -top-16 -end-16 w-56 h-56 rounded-full bg-clinic-gold/20 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl grid place-items-center bg-white/15 backdrop-blur">
                <Clock size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{t.hours.title}</h2>
                <p className="mt-3 text-xl text-white/90">{t.hours.text}</p>
                <p className="mt-2 text-sm text-white/70">{t.hours.note}</p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-clinic-navy font-medium hover:bg-clinic-gold hover:text-white transition-colors"
              >
                <Instagram size={16} />
                {t.ctaInstagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28 bg-clinic-mist/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-clinic-teal text-sm font-semibold uppercase tracking-wider">
              {isRtl ? "تواصل معنا" : "Get in touch"}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-clinic-navy">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-clinic-navy/70">{t.contact.text}</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <ContactCard
              icon={<Phone size={22} />}
              label={t.contact.phoneLabel}
              value={PHONE_NUMBER}
              href={`tel:${PHONE_INTL}`}
              dir="ltr"
            />
            <ContactCard
              icon={<Mail size={22} />}
              label={t.contact.emailLabel}
              value={EMAIL}
              href={`mailto:${EMAIL}`}
              dir="ltr"
            />
            <ContactCard
              icon={<MapPin size={22} />}
              label={t.contact.addressLabel}
              value={t.contact.address}
              hint={t.contact.mapsSoon}
              className="md:col-span-2"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-clinic-navy to-clinic-teal text-white font-medium shadow-lg shadow-clinic-teal/20 hover:shadow-xl transition-shadow"
            >
              <Instagram size={18} />
              {t.contact.button}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-clinic-navy/15 text-clinic-navy font-medium hover:border-clinic-teal hover:text-clinic-teal transition-colors"
            >
              <Facebook size={18} />
              {t.contact.facebookButton}
            </a>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-clinic-navy/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3 items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-clinic-navy to-clinic-teal text-white">
                <Eye size={18} />
              </span>
              <span className="font-semibold text-clinic-navy">{t.brand}</span>
            </div>
            <p className="mt-4 text-sm text-clinic-navy/60 leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </div>
          <div className="md:text-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-clinic-navy hover:text-clinic-teal transition-colors"
            >
              <Instagram size={18} />
              {t.about.instagram}
            </a>
          </div>
          <div className="md:text-end text-sm text-clinic-navy/60">
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-clinic-mist/60 p-4">
      <span className="mt-0.5 text-clinic-teal">{icon}</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-clinic-navy/50">
          {label}
        </div>
        <div className="mt-1 text-sm text-clinic-navy">{value}</div>
      </div>
    </div>
  );
}
