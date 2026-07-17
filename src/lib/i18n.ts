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
    ctaBook: "Book Appointment",
    ctaCall: "Call the Clinic",
    hero: {
      eyebrow: "Ophthalmology Clinic",
      title: "Specialized Eye Care with Dr. Iyad Ali Habil",
      subtitle:
        "Ophthalmologist and consultant in cornea diseases, cataract, and laser vision correction.",
      cta1: "Book Appointment",
      cta2: "Call the Clinic",
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
      note: "Book your appointment online or call us during working hours.",
    },
    contact: {
      title: "Contact the Clinic",
      text: "Call us during working hours, or reach us on Instagram, Facebook, or email.",
      button: "Call the Clinic",
      instagramButton: "Open Instagram",
      facebookButton: "Open Facebook",
      phoneLabel: "Phone",
      emailLabel: "Email",
      addressLabel: "Address",
      address:
        "Sham Commercial Center, 4th Floor, Kulieh Al Ahlieh St, Ramallah",
      mapsSoon: "Map location will be added soon.",
    },
    booking: {
      title: "Book Your Appointment",
      subtitle:
        "Choose a date and time that works for you. You'll receive an email confirmation instantly.",
      setupNote:
        "Booking calendar is being set up. Please call us or contact via Instagram for now.",
      close: "Close",
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
    ctaBook: "احجز موعداً",
    ctaCall: "اتصل بالعيادة",
    hero: {
      eyebrow: "عيادة طب وجراحة العيون",
      title: "رعاية متخصصة للعيون مع د. إياد هابيل",
      subtitle:
        "اختصاصي طب وجراحة العيون، واستشاري أمراض القرنية والساد وتصحيح البصر بالليزر.",
      cta1: "احجز موعداً",
      cta2: "اتصل بالعيادة",
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
      note: "احجز موعدك عبر الإنترنت أو اتصل بنا خلال أوقات الدوام.",
    },
    contact: {
      title: "تواصل مع العيادة",
      text: "اتصل بنا خلال أوقات الدوام، أو تواصل معنا عبر إنستغرام أو فيسبوك أو البريد الإلكتروني.",
      button: "اتصل بالعيادة",
      instagramButton: "فتح إنستغرام",
      facebookButton: "فتح فيسبوك",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      addressLabel: "العنوان",
      address: "شارع الكلية الأهلية، مركز شام التجاري، الطابق الرابع، رام الله",
      mapsSoon: "سيتم إضافة موقع الخريطة قريباً.",
    },
    booking: {
      title: "احجز موعدك",
      subtitle:
        "اختر التاريخ والوقت المناسب لك. ستصلك رسالة تأكيد عبر البريد الإلكتروني فوراً.",
      setupNote:
        "تقويم الحجز قيد الإعداد. الرجاء الاتصال بنا أو التواصل عبر إنستغرام حالياً.",
      close: "إغلاق",
    },
    footer: {
      disclaimer:
        "يوفر هذا الموقع معلومات عامة عن العيادة ولا يغني عن الاستشارة الطبية.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
};

export const INSTAGRAM_URL = "https://www.instagram.com/dr.iyad_eyeclinic/";
export const FACEBOOK_URL =
  "https://www.facebook.com/p/DrIyad-Eye-Clinic-61583418184276/";
export const PHONE_NUMBER = "0594599928";
export const PHONE_INTL = "+970594599928";
export const EMAIL = "habiliyad@gmail.com";

// ============================================================================
// BOOKING CALENDAR (Cal.com)
// ============================================================================
// To activate the booking calendar:
//   1. Sign up for a FREE account at https://cal.com (takes 2 minutes)
//   2. Create an event type called "consultation" (or any name)
//      - Set duration (e.g. 30 min)
//      - Set your available hours (Sat & Sun 9:00 AM – 2:00 PM)
//      - Add custom questions: Name*, Phone*, Reason (dropdown)*, Other details
//   3. Replace the values below with your Cal.com username and event slug
//   4. Cal.com will send email confirmations automatically to both you and the
//      client, and you can view/edit all bookings in your Cal.com dashboard
//      (your "admin page" — free, no setup).
// ============================================================================
export const CAL_USERNAME = "driyadclinic";
export const CAL_EVENT_SLUG = "eye-appointment";
export const CAL_LINK = `${CAL_USERNAME}/${CAL_EVENT_SLUG}`;
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
