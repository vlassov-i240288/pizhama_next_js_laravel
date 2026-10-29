import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const ogSize = { width: 1200, height: 630 }

// Built-in OG font has no Cyrillic, so Inter TTFs are bundled in assets/fonts
async function loadFonts() {
  const dir = join(process.cwd(), "assets", "fonts")
  const [regular, bold] = await Promise.all([
    readFile(join(dir, "Inter-400.ttf")),
    readFile(join(dir, "Inter-800.ttf")),
  ])
  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 800 as const, style: "normal" as const },
  ]
}

export async function renderOgImage({ title, label }: { title: string; label?: string }) {
  const fontSize = title.length > 60 ? 56 : title.length > 35 ? 68 : 84

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0f0f14 0%, #17172a 55%, #2a1f4a 100%)",
          color: "#ffffff",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em" }}>{siteConfig.name}</div>
        </div>
        {label && (
          <div style={{ display: "flex", marginTop: 64, fontSize: 30, color: "#a78bfa" }}>{label}</div>
        )}
        <div
          style={{
            display: "flex",
            marginTop: label ? 20 : 72,
            fontSize,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#9a9ab5",
          }}
        >
          <div>Сайты · CRM / ERP · AI · Чат-боты</div>
          <div style={{ color: "#c4b5fd" }}>pizhama.kz</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  )
}
