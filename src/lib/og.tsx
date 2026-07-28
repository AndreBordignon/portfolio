import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Card social na identidade do site, gerado no build.
 * Substitui o JPEG de 6,8 MB e 3133×2885 que era servido como se fosse
 * 1200×630 — e que o LinkedIn recusava por tamanho.
 */
export function ogImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Brasa: o mesmo gradiente que abre o site */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 70% at 78% 110%, rgba(249,115,22,0.34), transparent 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#f97316",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#8b867f",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ede9e4",
              fontSize: title.length > 60 ? 62 : 78,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 960,
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(237,233,228,0.14)",
            paddingTop: 28,
          }}
        >
          <span style={{ color: "#ede9e4", fontSize: 26 }}>André Bordignon</span>
          <span style={{ color: "#8b867f", fontSize: 22 }}>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
