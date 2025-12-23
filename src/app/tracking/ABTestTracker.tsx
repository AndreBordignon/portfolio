// components/ABTestTracker.tsx
"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function ABTestTracker({ variant }: { variant: string }) {
  useEffect(() => {
    // Envia evento pro Vercel Analytics
    track("ab_test_view", { variant });
  }, [variant]);

  return null;
}
