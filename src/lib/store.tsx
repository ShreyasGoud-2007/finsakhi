"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from "react";
import { DEMO_USER } from "./mock-data";
import * as goalService from "./services/goalService";
import * as txService from "./services/transactionService";
import { getCurrentUser } from "./services/authService";
import { getCategoryTotals, getSummary } from "./calculations";
import { t as translate, type TranslationKey } from "./i18n";
import type {
  FinancialContext, Language, SavingsGoal, Transaction, User,
} from "./types";

interface Prefs {
  language: Language;
  largeText: boolean;
  simpleView: boolean;
  notifications: { budget: boolean; savings: boolean; learning: boolean };
}

interface Store {
  user: User;
  transactions: Transaction[];
  goals: SavingsGoal[];
  prefs: Prefs;
  loading: boolean;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: Language) => void;
  setPrefs: (patch: Partial<Prefs>) => void;
  updateUser: (patch: Partial<User>) => void;
  addTransaction: (input: txService.TransactionInput) => Promise<void>;
  updateTransaction: (id: string, patch: Partial<txService.TransactionInput>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  createGoal: (input: goalService.GoalInput) => Promise<void>;
  addToGoal: (id: string, amount: number) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  financialContext: FinancialContext;
}

const StoreContext = createContext<Store | null>(null);

const DEFAULT_PREFS: Prefs = {
  language: "en",
  largeText: false,
  simpleView: false,
  notifications: { budget: true, savings: true, learning: false },
};

const STORAGE_KEY = "finsakhi.state.v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User>(DEMO_USER);
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);

  // Load persisted demo state, then hydrate from the service layer.
  useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        if (!cancelled) {
          setUser(DEMO_USER);
          setTransactions([]);
          setGoals([]);
        }
        return;
      }

      if (!cancelled) {
        setUser(currentUser);
      }

      const [tx, gl] = await Promise.all([
        txService.getTransactions(currentUser.id),
        goalService.getSavingsGoals(currentUser.id),
      ]);

      if (!cancelled) {
        setTransactions(tx);
        setGoals(gl);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);

      if (!cancelled) {
        setTransactions([]);
        setGoals([]);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  })();

  return () => {
    cancelled = true;
  };
}, []);
  useEffect(() => {
    if (loading) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY, JSON.stringify({ user, transactions, goals, prefs }),
      );
    } catch { /* storage may be unavailable; not critical */ }
  }, [user, transactions, goals, prefs, loading]);

  // Accessibility toggles act on <html> so every page picks them up.
  useEffect(() => {
    document.documentElement.classList.toggle("text-large", prefs.largeText);
    document.documentElement.classList.toggle("simple-view", prefs.simpleView);
    document.documentElement.lang = prefs.language;
    document.title = translate("metadata.title", prefs.language);
  }, [prefs.largeText, prefs.simpleView, prefs.language]);

  const setPrefs = useCallback((patch: Partial<Prefs>) => {
    setPrefsState((p) => ({ ...p, ...patch }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setPrefsState((p) => ({ ...p, language }));
    setUser((u) => ({ ...u, language }));
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((u) => ({ ...u, ...patch }));
  }, []);

  const addTransaction = useCallback(async (input: txService.TransactionInput) => {
    const created = await txService.addTransaction(user.id, input);
    setTransactions((list) => [created, ...list]);
  }, [user.id]);

  const updateTransaction = useCallback(
    async (id: string, patch: Partial<txService.TransactionInput>) => {
      await txService.updateTransaction(id, patch);
      setTransactions((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    await txService.deleteTransaction(id);
    setTransactions((list) => list.filter((t) => t.id !== id));
  }, []);

  const createGoal = useCallback(async (input: goalService.GoalInput) => {
    const created = await goalService.createSavingsGoal(user.id, input);
    setGoals((list) => [created, ...list]);
  }, [user.id]);

  const addToGoal = useCallback(async (id: string, amount: number) => {
    setGoals((list) =>
      list.map((g) => (g.id === id ? { ...g, savedAmount: g.savedAmount + amount } : g)));
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    await goalService.deleteSavingsGoal(id);
    setGoals((list) => list.filter((g) => g.id !== id));
  }, []);

  const financialContext = useMemo<FinancialContext>(() => {
    const summary = getSummary(transactions);
    const categories = Object.fromEntries(
      getCategoryTotals(transactions).map((c) => [c.name, c.amount]),
    );
    return {
      income: summary.income,
      expenses: summary.expenses,
      balance: summary.balance,
      categories,
      savingsGoals: goals.map((g) => ({
        name: g.name, target: g.targetAmount,
        saved: g.savedAmount, monthly: g.monthlyContribution,
      })),
    };
  }, [transactions, goals]);

  const t = useCallback(
    (key: TranslationKey) => translate(key, prefs.language),
    [prefs.language],
  );

  const value: Store = {
    user, transactions, goals, prefs, loading, t,
    setLanguage, setPrefs, updateUser,
    addTransaction, updateTransaction, deleteTransaction,
    createGoal, addToGoal, deleteGoal, financialContext,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
