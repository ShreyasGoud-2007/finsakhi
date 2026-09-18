"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export function MobileTopBar() {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3
                       border-b border-ink-300/25 bg-white px-4 py-3">
      <Link href="/dashboard" aria-label="FinSakhi home"><Logo size={32} /></Link>
      <div className="flex items-center gap-1">
        <LanguageSelector compact />
        <Link href="/settings" aria-label="Settings" className="btn-ghost !px-2">
          <Settings size={22} />
        </Link>
      </div>
    </header>
  );
}
