import { renderOgImage, ogSize } from "@/lib/og-image"
import { siteConfig } from "@/lib/site-config"

export const alt = `${siteConfig.name} — Digital-агентство`
export const size = ogSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    title: "Разработка сайтов, CRM и AI решений для бизнеса",
    label: "Digital-агентство · Казахстан",
  })
}
