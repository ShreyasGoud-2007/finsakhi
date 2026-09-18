import { AlertCircle, Loader2, type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon, title, message, action,
}: { icon: LucideIcon; title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="card p-8 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
        <Icon size={28} aria-hidden="true" />
      </span>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="text-ink-700 mt-1.5 mx-auto max-w-readable">{message}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function LoadingState({ message = "Loading your financial overview..." }: { message?: string }) {
  return (
    <div className="flex items-center gap-3 text-ink-700 p-8 justify-center" role="status">
      <Loader2 size={22} className="animate-spin text-brand-600" aria-hidden="true" />
      <span className="font-medium">{message}</span>
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong. Please try again.", onRetry,
}: { message?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-expense/30 bg-expense-soft p-5 flex flex-wrap items-center gap-4"
         role="alert">
      <AlertCircle size={22} className="text-expense shrink-0" aria-hidden="true" />
      <p className="font-medium text-ink-900 flex-1 min-w-[12rem]">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-secondary">Try again</button>}
    </div>
  );
}
