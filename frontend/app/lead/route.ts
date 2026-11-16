import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"
import nodemailer from "nodemailer"

// Leads are handled by Next.js itself: nginx sends /api/* to Laravel, so this route lives at /lead.
// The owner gets an email through the server's local sendmail (postfix); every lead is also saved to data/leads.jsonl.
// Mail is DKIM-signed for pizhama.kz (selector "site") when LEAD_DKIM_PRIVATE_KEY (base64 PEM) is set, so it passes DMARC.

const FIELDS = ["service", "budget", "description", "name", "company", "phone", "source"] as const
type Lead = Partial<Record<(typeof FIELDS)[number], string>> & { created_at: string; ip: string }

const LEADS_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "data")
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl")

const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000
const recentByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  hits.push(now)
  recentByIp.set(ip, hits)
  return hits.length > RATE_LIMIT
}

function buildText(lead: Lead) {
  const field = (key: keyof Lead) => lead[key] || "—"
  return [
    "Новая заявка с сайта pizhama.kz",
    "",
    `Имя: ${field("name")}`,
    `Телефон: ${field("phone")}`,
    `Компания: ${field("company")}`,
    `Услуга: ${field("service")}`,
    `Бюджет: ${field("budget")}`,
    "",
    `Описание: ${field("description")}`,
    "",
    `Источник: ${field("source")}`,
    `Дата: ${lead.created_at}`,
  ].join("\n")
}

const dkimKey = process.env.LEAD_DKIM_PRIVATE_KEY
const transporter = nodemailer.createTransport({
  sendmail: true,
  path: "/usr/sbin/sendmail",
  newline: "unix",
  dkim: dkimKey
    ? { domainName: "pizhama.kz", keySelector: "site", privateKey: Buffer.from(dkimKey, "base64").toString() }
    : undefined,
})

function sendMail(to: string, from: string, subject: string, text: string) {
  return transporter.sendMail({ from: { name: "PIZHAMA сайт", address: from }, to, subject, text })
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return Response.json({ status: "too_many_requests" }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ status: "invalid_json" }, { status: 400 })
  }

  const lead: Lead = { created_at: new Date().toLocaleString("ru-RU", { timeZone: "Asia/Aqtobe" }), ip }
  for (const key of FIELDS) {
    const value = body[key]
    if (typeof value === "string" && value.trim()) lead[key] = value.trim().slice(0, key === "description" ? 3000 : 500)
  }
  if (!lead.phone && !lead.name) {
    return Response.json({ status: "empty" }, { status: 422 })
  }

  try {
    await mkdir(LEADS_DIR, { recursive: true })
    await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n")
  } catch (error) {
    console.error("lead: failed to save", error)
  }

  const to = process.env.LEAD_NOTIFY_EMAIL
  if (to) {
    try {
      const from = process.env.LEAD_FROM_EMAIL ?? "leads@pizhama.kz"
      await sendMail(to, from, `Заявка: ${lead.name ?? lead.phone}`, buildText(lead))
    } catch (error) {
      console.error("lead: failed to send email", error)
    }
  } else {
    console.warn("lead: LEAD_NOTIFY_EMAIL is not set, email skipped")
  }

  return Response.json({ status: "ok" }, { status: 201 })
}
