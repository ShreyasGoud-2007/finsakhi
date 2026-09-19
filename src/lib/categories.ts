import type { CategoryId } from "./types";

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  icon: string;   // lucide icon name, resolved in components/ui/CategoryIcon
  color: string;  // chart + accent colour
}

/** Every spending category the app knows about. Order drives the UI. */
export const CATEGORIES: CategoryMeta[] = [
  { id: "food",       label: "Food",       icon: "UtensilsCrossed", color: "#C6462E" },
  { id: "transport",  label: "Transport",  icon: "Bus",             color: "#1E8C79" },
  { id: "education",  label: "Education",  icon: "GraduationCap",   color: "#2F6DB0" },
  { id: "healthcare", label: "Healthcare", icon: "HeartPulse",      color: "#9B4D8E" },
  { id: "household",  label: "Household",  icon: "Home",            color: "#C98A1E" },
  { id: "shopping",   label: "Shopping",   icon: "ShoppingBag",     color: "#D2704A" },
  { id: "other",      label: "Other",      icon: "Package",         color: "#6B7B75" },
];

export const INCOME_CATEGORY: CategoryMeta = {
  id: "income", label: "Income", icon: "Wallet", color: "#1F8A4C",
};

export function getCategory(id: CategoryId): CategoryMeta {
  if (id === "income") return INCOME_CATEGORY;
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[6];
}
