"use client";
import { useEffect } from "react";

export function ABTestTracker({ variant }: { variant: string }) {
  useEffect(() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", "ab_test_view", {
        variant: variant,
      });
    }
  }, [variant]);

  return null;
}
