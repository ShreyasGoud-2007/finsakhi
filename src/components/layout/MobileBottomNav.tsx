"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { NAV_ITEMS } from "./nav-items";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useStore();

  return (
    <nav
      aria-label="Main"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink-300/30
                 bg-white/98 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold
                  ${active ? "text-brand-600" : "text-ink-500"}`}
              >
                <span className={`flex h-8 w-12 items-center justify-center rounded-full
                  ${active ? "bg-brand-50" : ""}`}>
                  <item.icon size={22} aria-hidden="true" />
                </span>
                <span className="leading-none text-center px-0.5">{t(item.labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
