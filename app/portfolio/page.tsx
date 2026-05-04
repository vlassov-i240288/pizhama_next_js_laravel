import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { PortfolioGrid } from "@/components/sections/portfolio-grid"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Портфолио — Наши кейсы",
  description: "Портфолио проектов PIZHAMA: маркетплейсы, CRM системы, AI решения. Реальные результаты для реального бизнеса.",
  keywords: ["портфолио", "кейсы", "проекты", "разработка сайтов примеры"],
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
}

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">Портфолио</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Проекты, которыми мы гордимся
          </h1>
          <p className="text-lg text-muted-foreground">
            Каждый кейс — это история успеха наших клиентов. 
            Смотрите результаты и технологии, которые мы использовали.
          </p>
        </div>

        {/* Portfolio Grid with Filters */}
        <PortfolioGrid />
      </div>

      <CTASection />
    </div>
  )
}
