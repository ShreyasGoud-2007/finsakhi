"use client";

import {
  Bike, Bus, ClipboardList, Flame, GraduationCap, HeartPulse, Home, Landmark,
  Layers, Lock, Package, Percent, PiggyBank, ShieldCheck, ShoppingBag, Store,
  TrendingUp, Umbrella, UtensilsCrossed, Wallet, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Bike, Bus, ClipboardList, Flame, GraduationCap, HeartPulse, Home, Landmark,
  Layers, Lock, Package, Percent, PiggyBank, ShieldCheck, ShoppingBag, Store,
  TrendingUp, Umbrella, UtensilsCrossed, Wallet,
};

/** Resolves a lucide icon by name so data files can stay plain objects. */
export function CategoryIcon({
  name, size = 20, className,
}: { name: string; size?: number; className?: string }) {
  const Icon = ICONS[name] ?? Package;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
