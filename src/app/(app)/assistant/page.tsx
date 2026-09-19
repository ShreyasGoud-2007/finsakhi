"use client";

import { Suspense } from "react";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { LoadingState } from "@/components/ui/States";
import { useStore } from "@/lib/store";

export default function AssistantPage() {
  const { t } = useStore();
  return (
    <Suspense fallback={<LoadingState message={t("assistant.opening")} />}>
      <AssistantChat />
    </Suspense>
  );
}
