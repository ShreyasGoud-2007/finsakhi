"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Sheet on mobile, centred dialog on desktop.
 * Handles Escape, backdrop click, focus move and body scroll lock.
 */
export function Modal({
  open, onClose, title, description, children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-ink-900/45"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white
                   rounded-t-3xl sm:rounded-3xl shadow-lift p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            {description && <p className="text-ink-700 mt-1">{description}</p>}
          </div>
          <button onClick={onClose} aria-label="Close" className="btn-ghost !px-2 !min-h-0 py-2">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
