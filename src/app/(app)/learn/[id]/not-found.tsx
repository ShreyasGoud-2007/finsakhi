import Link from "next/link";

export default function LessonNotFound() {
  return (
    <div className="card p-8 text-center max-w-md mx-auto">
      <h1 className="font-display text-2xl font-bold">That topic isn&apos;t here</h1>
      <p className="text-ink-700 mt-2">It may have been renamed. Browse all topics instead.</p>
      <Link href="/learn" className="btn-primary mt-5">Go to Learn</Link>
    </div>
  );
}
