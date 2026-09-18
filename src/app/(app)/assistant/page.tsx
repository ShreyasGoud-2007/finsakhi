"use client";

import { Suspense } from "react";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { LoadingState } from "@/components/ui/States";

export default function AssistantPage() {
  return (
    <Suspense fallback={<LoadingState message="Opening FinSakhi AI..." />}>
      <AssistantChat />
    </Suspense>
  );
}
