import type { Lang } from "./i18n";

export function readLanguage(): Lang {
  try {
    return window.localStorage.getItem("clinic-lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function saveLanguage(lang: Lang): void {
  try {
    window.localStorage.setItem("clinic-lang", lang);
  } catch {
    // The language still works when storage is unavailable.
  }
}
