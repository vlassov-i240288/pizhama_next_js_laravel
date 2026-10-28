import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const alt = `${siteConfig.name} — Digital-агентство`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Built-in OG font has no Cyrillic glyphs, so the image text is Latin only
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f0f14 0%, #1b1b2e 60%, #2a1f4a 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.04em" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 48, marginTop: 24, color: "#c4c4d4" }}>Digital Agency · Kazakhstan</div>
        <div style={{ fontSize: 36, marginTop: 48, color: "#8b8ba7" }}>Websites · CRM / ERP · AI solutions</div>
        <div style={{ fontSize: 32, marginTop: "auto", color: "#a78bfa" }}>pizhama.kz</div>
      </div>
    ),
    size,
  )
}
