"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Info, Mic, MicOff, Send, ShieldCheck, Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { SuggestedQuestion } from "./SuggestedQuestion";
import { sendMessage } from "@/lib/services/aiService";
import { useStore } from "@/lib/store";
import type { ChatMessage as Msg } from "@/lib/types";

export function AssistantChat() {
  const params = useSearchParams();
  const { financialContext, prefs, user, t } = useStore();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const ask = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || thinking) return;

      const userMsg: Msg = {
        id: crypto.randomUUID(), role: "user",
        content: trimmed, createdAt: new Date().toISOString(),
      };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setThinking(true);

      try {
        const reply = await sendMessage(trimmed, financialContext, prefs.language);
        setMessages((m) => [...m, {
          id: crypto.randomUUID(), role: "assistant",
          content: reply, createdAt: new Date().toISOString(),
        }]);
      } catch {
        setMessages((m) => [...m, {
          id: crypto.randomUUID(), role: "assistant", error: true,
          content: t("assistant.defaultError"),
          createdAt: new Date().toISOString(),
        }]);
      } finally {
        setThinking(false);
      }
    },
    [financialContext, prefs.language, thinking, t],
  );

  useEffect(() => {
    setMessages((current) => {
      const welcome: Msg = {
        id: "welcome", role: "assistant", content: t("assistant.welcome"),
        createdAt: new Date().toISOString(),
      };
      if (!current.length || (current.length === 1 && current[0].id === "welcome")) return [welcome];
      return current;
    });
  }, [t]);

  // A lesson page can deep-link a question in.
  const prefilled = params.get("q");
  useEffect(() => {
    if (prefilled) setInput(prefilled);
  }, [prefilled]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  function toggleVoice() {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) {
      setVoiceNote(t("assistant.voiceUnavailable"));
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = prefs.language === "te" ? "te-IN" : prefs.language === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
    recognition.onerror = () => {
      setVoiceNote(t("assistant.voiceFailed"));
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setVoiceNote(null);
    setListening(true);
    recognition.start();
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-13rem)] lg:min-h-[calc(100vh-8rem)]">
      <header className="flex items-start gap-3 rounded-3xl border border-brand-100 bg-white p-4 shadow-card sm:p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lift">
          <Sparkles size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{t("assistant.aiHelper")}</p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900">{t("assistant.title")}</h1>
          <p className="text-ink-700">{t("assistant.subtitle")}</p>
        </div>
      </header>

      <p className="mt-4 flex items-start gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm leading-relaxed text-ink-700">
        <Info size={17} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
        <span>
          {t("assistant.helper")}
        </span>
      </p>

      <ul className="flex-1 space-y-4 py-6" aria-live="polite" aria-label={t("assistant.conversation")}>
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {thinking && (
          <li className="flex gap-3 items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white"
                  aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <span className="rounded-2xl rounded-tl-md bg-white border border-ink-300/25 px-4 py-3
                             font-medium text-ink-700">
              {t("assistant.thinking")}
              <span className="inline-flex gap-1 ml-1.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:300ms]" />
              </span>
            </span>
          </li>
        )}
        <div ref={endRef} />
      </ul>

      {messages.length <= 1 && (
        <section aria-label={t("assistant.suggestedQuestions")} className="mb-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">{t("assistant.tryAsking")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6, 7].map((id) => {
              const text = t(`assistant.suggestion${id}` as any);
              return <SuggestedQuestion key={text} text={text} onSelect={ask} />;
            })}
          </div>
        </section>
      )}

      {voiceNote && (
        <p role="status" className="mb-3 rounded-xl bg-gold-soft border border-gold/30 px-4 py-3 font-medium">
          {voiceNote}
        </p>
      )}

      <div className="sticky bottom-20 lg:bottom-4 bg-cream pt-2">
        <form
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
          className="flex items-end gap-2 rounded-2xl border border-brand-100 bg-white p-2 shadow-card"
        >
          <label htmlFor="chat-input" className="sr-only">{t("assistant.askAnything")}</label>
          <input
            id="chat-input" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t("assistant.placeholder").replace("{name}", user.name)}
            className="field flex-1 !py-3.5 border-0 bg-transparent focus:border-0"
            autoComplete="off"
          />
          <button type="button" onClick={toggleVoice}
                  aria-pressed={listening}
                  aria-label={listening ? t("assistant.stopVoice") : t("assistant.voiceToggle")}
                  className={`btn !px-3.5 ${listening
                    ? "bg-expense text-white" : "bg-white border-2 border-ink-300/40 text-ink-700"}`}>
            {listening ? <MicOff size={21} /> : <Mic size={21} />}
          </button>
          <button type="submit" disabled={!input.trim() || thinking}
                  aria-label={t("assistant.sendQuestion")} className="btn-primary !px-4">
            <Send size={21} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink-500">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
          {t("assistant.privacyNote")}
        </p>
      </div>
    </div>
  );
}
