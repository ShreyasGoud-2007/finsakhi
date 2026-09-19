"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, User } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/lib/store";
import { NAV_ITEMS } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();
  const { t, user } = useStore();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition-colors ${
      active
        ? "bg-brand-600 text-white shadow-lift"
        : "text-ink-700 hover:bg-brand-50 hover:text-brand-700"
    }`;

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[272px] flex-col
                      border-r border-ink-300/25 bg-white px-4 py-6">
      <Link href="/dashboard" className="px-2 mb-8" aria-label={t("common.home")}>
        <Logo size={40} showTagline />
      </Link>

      <nav aria-label={t("common.mainNavigation")} className="flex-1">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} className={linkClass(active)}
                      aria-current={active ? "page" : undefined}>
                  <item.icon size={22} aria-hidden="true" />
                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ink-300/25 pt-4 space-y-1.5">
        <Link href="/profile" className={linkClass(isActive("/profile"))}>
          <User size={22} aria-hidden="true" />
          <span>{t("nav.profile")}</span>
        </Link>
        <Link href="/settings" className={linkClass(isActive("/settings"))}>
          <Settings size={22} aria-hidden="true" />
          <span>{t("nav.settings")}</span>
        </Link>
        <div className="flex items-center gap-3 px-4 pt-3 text-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft
                           font-display font-bold text-gold" aria-hidden="true">
            {user.avatarInitials}
          </span>
          <span className="text-ink-700 truncate">{user.name}</span>
        </div>
      </div>
    </aside>
  );
}
