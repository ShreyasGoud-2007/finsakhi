"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Info, Mic, MicOff, Send, ShieldCheck, Sparkles } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { SuggestedQuestion } from "./SuggestedQuestion";
import { sendMessage } from "@/lib/services/aiService";
import { useStore } from "@/lib/store";
import type { ChatMessage as Msg } from "@/lib/types";

const SUGGESTIONS = [
  "I earn ₹15,000. How can I save?",
  "What is an emergency fund?",
  "How can I reduce my expenses?",
  "What is a fixed deposit?",
  "What is a mutual fund?",
  "What is insurance?",
  "I want to save ₹20,000. Help me plan.",
];

const WELCOME: Msg = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm FinSakhi AI.\nI can help you understand your income and expenses, plan your savings, and explain money topics in simple words.\nWhat would you like to know?",
  createdAt: new Date().toISOString(),
};

export function AssistantChat() {
  const params = useSearchParams();
  const { financialContext, prefs, user } = useStore();
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
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
          content: "Something went wrong. Please try asking again.",
          createdAt: new Date().toISOString(),
        }]);
      } finally {
        setThinking(false);
      }
    },
    [financialContext, prefs.language, thinking],
  );

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
      setVoiceNote("Voice input isn't available in this browser. You can still type your question.");
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
      setVoiceNote("Could not hear anything. Please try again or type your question.");
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
      <header className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <Sparkles size={24} aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">FinSakhi AI</h1>
          <p className="text-ink-700">Your simple financial learning companion.</p>
        </div>
      </header>

      <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-sm">
        <Info size={17} className="shrink-0 mt-0.5 text-brand-700" aria-hidden="true" />
        <span>
          FinSakhi is using your financial overview to personalise this conversation.
          Your details are not shown in the chat.
        </span>
      </p>

      <ul className="flex-1 space-y-4 py-6" aria-live="polite" aria-label="Conversation">
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {thinking && (
          <li className="flex gap-3 items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white"
                  aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <span className="rounded-2xl rounded-tl-md bg-white border border-ink-300/25 px-4 py-3
                             font-medium text-ink-700">
              FinSakhi is thinking
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
        <section aria-label="Suggested questions" className="mb-4">
          <p className="label">Try asking</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <SuggestedQuestion key={s} text={s} onSelect={ask} />
            ))}
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
          className="flex items-end gap-2"
        >
          <label htmlFor="chat-input" className="sr-only">Ask FinSakhi anything</label>
          <input
            id="chat-input" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask FinSakhi anything, ${user.name}...`}
            className="field flex-1 !py-3.5"
            autoComplete="off"
          />
          <button type="button" onClick={toggleVoice}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop voice input" : "Speak your question"}
                  className={`btn !px-3.5 ${listening
                    ? "bg-expense text-white" : "bg-white border-2 border-ink-300/40 text-ink-700"}`}>
            {listening ? <MicOff size={21} /> : <Mic size={21} />}
          </button>
          <button type="submit" disabled={!input.trim() || thinking}
                  aria-label="Send question" className="btn-primary !px-4">
            <Send size={21} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-3 flex items-start gap-2 text-xs text-ink-500 leading-relaxed">
          <ShieldCheck size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
          FinSakhi provides educational and budgeting guidance. It does not provide guaranteed
          financial returns or replace professional financial advice.
        </p>
      </div>
    </div>
  );
}
