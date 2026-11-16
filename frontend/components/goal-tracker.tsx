"use client"

import { useEffect } from "react"
import { goalForHref, rememberAttribution, trackGoal } from "@/lib/analytics"

// Tracks clicks on messenger, phone and email links anywhere on the site
export function GoalTracker() {
  useEffect(() => {
    rememberAttribution()
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]")
      if (!link) return
      const goal = goalForHref(link.getAttribute("href") ?? "")
      if (goal) trackGoal(goal, { path: window.location.pathname })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
