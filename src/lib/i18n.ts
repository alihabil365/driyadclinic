export type Lang = "en" | "ar";

export const translations = {
  en: {
    dir: "ltr" as const,
    brand: "Dr. Iyad Eye Clinic",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      hours: "Working Hours",
      contact: "Contact",
    },
    langToggle: "العربية",
    ctaInstagram: "Contact on Instagram",
    hero: {
      eyebrow: "Ophthalmology Clinic",
      title: "Specialized Eye Care with Dr. Iyad Ali Habil",
      subtitle:
        "Ophthalmologist and consultant in cornea diseases, cataract, and laser vision correction.",
      cta1: "Contact on Instagram",
      cta2: "View Working Hours",
    },
    about: {
      title: "About Dr. Iyad",
      text: "Dr. Iyad Ali Habil is an ophthalmologist specializing in eye medicine and surgery, with a focus on cornea diseases, cataract, and laser vision correction consultations.",
      name: "Dr. Iyad Ali Habil",
      specialty: "Ophthalmologist",
      subSpecialty:
        "Consultant in cornea diseases, cataract, and laser vision correction",
      instagram: "@dr.iyad_eyeclinic",
    },
    services: {
      title: "Services",
      subtitle: "Comprehensive ophthalmology care and consultations.",
      items: [
        "Comprehensive Eye Examination",
        "Cornea Disease Consultation",
        "Cataract Consultation",
        "Laser Vision Correction Consultation",
        "General Ophthalmology Care",
      ],
    },
    hours: {
      title: "Working Hours",
      text: "Saturday and Sunday: 9:00 AM – 2:00 PM",
      note: "Please contact us via Instagram to schedule your visit.",
    },
    contact: {
      title: "Contact the Clinic",
      text: "Appointments and inquiries are currently handled through Instagram.",
      button: "Open Instagram",
      soonTitle: "Coming soon",
      soonText: "Phone number, address, and map location will be added later.",
    },
    footer: {
      disclaimer:
        "This website provides general clinic information and does not replace medical consultation.",
      rights: "All rights reserved.",
    },
  },
  ar: {
    dir: "rtl" as const,
    brand: "عيادة د. إياد للعيون",
    nav: {
      home: "الرئيسية",
      about: "عن الطبيب",
      services: "الخدمات",
      hours: "أوقات الدوام",
      contact: "التواصل",
    },
    langToggle: "English",
    ctaInstagram: "تواصل عبر إنستغرام",
    hero: {
      eyebrow: "عيادة طب وجراحة العيون",
      title: "رعاية متخصصة للعيون مع د. إياد هابيل",
      subtitle:
        "اختصاصي طب وجراحة العيون، واستشاري أمراض القرنية والساد وتصحيح البصر بالليزر.",
      cta1: "تواصل عبر إنستغرام",
      cta2: "عرض أوقات الدوام",
    },
    about: {
      title: "عن د. إياد",
      text: "د. إياد هابيل اختصاصي طب وجراحة العيون، واستشاري في أمراض القرنية والساد وتصحيح البصر بالليزر.",
      name: "د. إياد هابيل",
      specialty: "اختصاصي طب وجراحة العيون",
      subSpecialty: "استشاري أمراض القرنية والساد وتصحيح البصر بالليزر",
      instagram: "@dr.iyad_eyeclinic",
    },
    services: {
      title: "الخدمات",
      subtitle: "رعاية واستشارات شاملة في طب وجراحة العيون.",
      items: [
        "فحص شامل للعين",
        "استشارات أمراض القرنية",
        "استشارات الساد",
        "استشارات تصحيح البصر بالليزر",
        "رعاية عامة لصحة العيون",
      ],
    },
    hours: {
      title: "أوقات الدوام",
      text: "السبت والأحد: 9:00 ص – 2:00 م",
      note: "يرجى التواصل معنا عبر إنستغرام لتحديد موعد الزيارة.",
    },
    contact: {
      title: "تواصل مع العيادة",
      text: "يتم استقبال الاستفسارات والمواعيد حالياً عبر إنستغرام.",
      button: "فتح إنستغرام",
      soonTitle: "قريباً",
      soonText: "سيتم إضافة رقم الهاتف والعنوان وموقع الخريطة لاحقاً.",
    },
    footer: {
      disclaimer:
        "يوفر هذا الموقع معلومات عامة عن العيادة ولا يغني عن الاستشارة الطبية.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export const INSTAGRAM_URL = "https://www.instagram.com/dr.iyad_eyeclinic/";
