import Link from "next/link";
import { useStore } from "@/lib/store";
import BlurText from "@/components/ui/BlurText";

export default function LessonNotFound() {
  const { t } = useStore();
  return (
    <div className="card p-8 text-center max-w-md mx-auto">
      <h1 className="font-display text-2xl font-bold">
        <BlurText key={`lesson-not-found-${t("lesson.notFoundTitle")}`} text={t("lesson.notFoundTitle")} as="span" className="font-inherit" delay={70} stepDuration={0.3} />
      </h1>
      <p className="text-ink-700 mt-2">{t("lesson.notFoundMessage")}</p>
      <Link href="/learn" className="btn-primary mt-5">{t("action.goToLearn")}</Link>
    </div>
  );
}
