"use client";

import { LayoutGroup } from "motion/react";
import { useBrowserNativeTransitions } from "@/hooks/use-browser-native-transitions";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  useBrowserNativeTransitions();
  return <LayoutGroup>{children}</LayoutGroup>;
}
