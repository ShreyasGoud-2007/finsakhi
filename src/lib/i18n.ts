import type { Language } from "./types";

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu",  native: "తెలుగు" },
  { code: "hi", label: "Hindi",   native: "हिन्दी" },
];

/**
 * Flat dictionary. Add a language by adding a column - no other file changes.
 * Only navigation and common actions are translated for the MVP; long-form
 * content stays in English until a translator reviews it.
 */
const dict = {
  "nav.dashboard":    { en: "Home",            te: "హోమ్",              hi: "होम" },
  "nav.transactions": { en: "Transactions",    te: "లావాదేవీలు",        hi: "लेन-देन" },
  "nav.goals":        { en: "Goals",           te: "లక్ష్యాలు",          hi: "लक्ष्य" },
  "nav.learn":        { en: "Learn",           te: "నేర్చుకోండి",       hi: "सीखें" },
  "nav.assistant":    { en: "AI Help",         te: "AI సహాయం",          hi: "AI मदद" },
  "nav.profile":      { en: "Profile",         te: "ప్రొఫైల్",           hi: "प्रोफ़ाइल" },
  "nav.settings":     { en: "Settings",        te: "సెట్టింగ్‌లు",        hi: "सेटिंग्स" },

  "action.addIncome":  { en: "Add Income",     te: "ఆదాయాన్ని జోడించండి", hi: "आय जोड़ें" },
  "action.addExpense": { en: "Add Expense",    te: "ఖర్చును జోడించండి",   hi: "खर्च जोड़ें" },
  "action.createGoal": { en: "Create Goal",    te: "లక్ష్యం చేయండి",     hi: "लक्ष्य बनाएं" },
  "action.askAI":      { en: "Ask AI",         te: "AIని అడగండి",        hi: "AI से पूछें" },
  "action.save":       { en: "Save",           te: "సేవ్ చేయండి",        hi: "सेव करें" },
  "action.cancel":     { en: "Cancel",         te: "రద్దు చేయండి",       hi: "रद्द करें" },
  "action.viewAll":    { en: "View all",       te: "అన్నీ చూడండి",       hi: "सभी देखें" },
  "action.logout":     { en: "Log out",        te: "లాగ్ అవుట్",          hi: "लॉग आउट" },

  "label.income":      { en: "Monthly Income", te: "నెలవారీ ఆదాయం",      hi: "मासिक आय" },
  "label.expenses":    { en: "Total Expenses", te: "మొత్తం ఖర్చులు",      hi: "कुल खर्च" },
  "label.balance":     { en: "Money Left",     te: "మిగిలిన డబ్బు",       hi: "बचा हुआ पैसा" },
  "label.savingsRate": { en: "Savings Rate",   te: "పొదుపు రేటు",        hi: "बचत दर" },
  "label.spending":    { en: "Where your money went", te: "మీ డబ్బు ఎక్కడికి వెళ్ళింది", hi: "आपका पैसा कहाँ गया" },
  "label.subtitle":    { en: "Here's a simple view of your money.", te: "మీ డబ్బు గురించి సులభమైన వివరణ.", hi: "आपके पैसे का आसान विवरण।" },
} as const;

export type TranslationKey = keyof typeof dict;

export function t(key: TranslationKey, lang: Language): string {
  const entry = dict[key];
  return entry?.[lang] ?? entry?.en ?? key;
}
