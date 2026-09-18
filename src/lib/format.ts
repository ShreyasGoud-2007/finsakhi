import type { Language } from "./types";

/** One place for money formatting so ₹ looks the same everywhere. */
export function rupees(amount: number, opts: { decimals?: boolean } = {}): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: opts.decimals ? 2 : 0,
    maximumFractionDigits: opts.decimals ? 2 : 0,
  }).format(amount);
}

export function formatDate(iso: string, lang: Language = "en"): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  const locale = lang === "te" ? "te-IN" : lang === "hi" ? "hi-IN" : "en-IN";
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function greeting(lang: "en" | "te" | "hi" = "en"): string {
  const h = new Date().getHours();
  if (lang === "te") {
    if (h < 12) return "శుభోదయం";
    if (h < 17) return "శుభ మధ్యాహ్నం";
    return "శుభ సాయంత్రం";
  }
  if (lang === "hi") {
    if (h < 12) return "शुभ प्रभात";
    if (h < 17) return "शुभ दोपहर";
    return "शुभ संध्या";
  }
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
