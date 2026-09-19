import {
  BookOpen, Bot, CreditCard, Home, Target, type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard",    labelKey: "nav.dashboard",    icon: Home },
  { href: "/transactions", labelKey: "nav.transactions", icon: CreditCard },
  { href: "/goals",        labelKey: "nav.goals",        icon: Target },
  { href: "/learn",        labelKey: "nav.learn",        icon: BookOpen },
  { href: "/assistant",    labelKey: "nav.assistant",    icon: Bot },
];
