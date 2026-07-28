import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "André Bordignon — Programador freelance",
    short_name: "André Bordignon",
    description:
      "Programador freelance com 9 anos de experiência em React, Next.js e React Native. Sites, SaaS e aplicativos sob medida.",
    start_url: "/",
    lang: "pt-BR",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#f97316",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
