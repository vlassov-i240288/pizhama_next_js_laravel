type Goal = "lead_form" | "whatsapp_click" | "telegram_click" | "phone_click" | "email_click"

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

// Sends a conversion to Yandex Metrika and Google Analytics when they are loaded
export function trackGoal(goal: Goal, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)
  if (metrikaId && window.ym) window.ym(metrikaId, "reachGoal", goal, params)
  if (window.gtag) window.gtag("event", goal, params)
}

export function goalForHref(href: string): Goal | null {
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp_click"
  if (href.includes("t.me/")) return "telegram_click"
  if (href.startsWith("tel:")) return "phone_click"
  if (href.startsWith("mailto:")) return "email_click"
  return null
}
