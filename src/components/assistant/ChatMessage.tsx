"use client";

import { Sparkles } from "lucide-react";
import type { ChatMessage as Msg } from "@/lib/types";

/**
 * Renders the assistant's light markup: "## heading", "- bullet",
 * and **bold** for amounts. Enough structure to stay readable, no parser needed.
 */
function RichText({ text }: { text: string }) {
  const blocks = text.split("\n").filter((l) => l.trim().length > 0);
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (!bullets.length) return;
    out.push(
      <ul key={key} className="space-y-1.5 my-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
            <span><Inline text={b} /></span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  blocks.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      bullets.push(trimmed.slice(2));
      return;
    }
    flush(`ul-${i}`);
    if (trimmed.startsWith("## ")) {
      out.push(
        <h3 key={i} className="font-display text-lg font-bold mt-3 first:mt-0">
          {trimmed.slice(3)}
        </h3>,
      );
    } else {
      out.push(<p key={i} className="my-2 first:mt-0"><Inline text={trimmed} /></p>);
    }
  });
  flush("ul-end");
  return <>{out}</>;
}

function Inline({ text }: { text: string }) {
  // **bold** is used for amounts, so highlight those numbers.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-bold text-brand-700 tabular-nums">{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function ChatMessage({ message }: { message: Msg }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <li className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-md bg-brand-600
                        px-4 py-3 text-white text-[1.02rem] leading-relaxed">
          <span className="sr-only">You said: </span>
          {message.content}
        </div>
      </li>
    );
  }

  return (
    <li className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"
            aria-hidden="true">
        <Sparkles size={18} />
      </span>
      <div className={`max-w-[85%] sm:max-w-readable rounded-2xl rounded-tl-md px-4 py-3
                       text-[1.02rem] leading-relaxed
                       ${message.error
                         ? "bg-expense-soft border-2 border-expense/30"
                         : "bg-white border border-ink-300/25"}`}>
        <span className="sr-only">FinSakhi said: </span>
        <RichText text={message.content} />
      </div>
    </li>
  );
}
