"use client";

export function SuggestedQuestion({
  text, onSelect,
}: { text: string; onSelect: (text: string) => void }) {
  return (
    <button
      onClick={() => onSelect(text)}
      className="rounded-xl border-2 border-brand-100 bg-white px-4 py-3 text-left
                 font-medium text-ink-900 hover:border-brand-300 hover:bg-brand-50 transition-colors"
    >
      {text}
    </button>
  );
}
