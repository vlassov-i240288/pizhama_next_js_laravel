import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { CasesSection } from "@/components/sections/cases"
import { AISolutionsSection } from "@/components/sections/ai-solutions"
import { AdvantagesSection } from "@/components/sections/advantages"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"
import { getStatus } from '@/lib/api'

export default async function HomePage() {
  const status = await getStatus()
  if (status) console.log('backend status:', status)
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CasesSection />
      <AISolutionsSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
