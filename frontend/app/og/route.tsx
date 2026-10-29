import { renderOgImage } from "@/lib/og-image"

// Per-page social preview: /og?title=...&label=...
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get("title") ?? "Digital-агентство").slice(0, 120)
  const label = searchParams.get("label")?.slice(0, 60) || undefined

  const image = await renderOgImage({ title, label })
  image.headers.set("Cache-Control", "public, max-age=86400, s-maxage=31536000, immutable")
  return image
}
