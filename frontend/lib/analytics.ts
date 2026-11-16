type Goal = "lead_form" | "whatsapp_click" | "telegram_click" | "phone_click" | "email_click"

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export const YANDEX_METRIKA_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? 114270889)

// Sends a conversion to Yandex Metrika and Google Analytics when they are loaded
export function trackGoal(goal: Goal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  if (YANDEX_METRIKA_ID && window.ym) window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params)
  if (window.gtag) window.gtag("event", goal, params)
}

export function goalForHref(href: string): Goal | null {
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp_click"
  if (href.includes("t.me/")) return "telegram_click"
  if (href.startsWith("tel:")) return "phone_click"
  if (href.startsWith("mailto:")) return "email_click"
  return null
}

const ATTRIBUTION_KEY = "lead_source"
const ATTRIBUTION_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "yclid"]

// Remembers where the visitor came from (ad click, search, referral) for the lead notification
export function rememberAttribution() {
  try {
    const query = new URLSearchParams(window.location.search)
    const parts = ATTRIBUTION_PARAMS.filter((key) => query.get(key)).map((key) => `${key}=${query.get(key)}`)
    if (parts.length > 0) {
      sessionStorage.setItem(ATTRIBUTION_KEY, `${parts.join("&")} | ${window.location.pathname}`)
    } else if (!sessionStorage.getItem(ATTRIBUTION_KEY)) {
      const referrer = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "direct"
      sessionStorage.setItem(ATTRIBUTION_KEY, `${referrer} | ${window.location.pathname}`)
    }
  } catch {
    // storage can be blocked; attribution is optional
  }
}

export function getAttribution(): string {
  try {
    return sessionStorage.getItem(ATTRIBUTION_KEY) ?? ""
  } catch {
    return ""
  }
}
