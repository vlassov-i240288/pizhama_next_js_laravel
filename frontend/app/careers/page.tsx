import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Briefcase, MapPin, Clock, Users, Zap, Heart, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Карьера",
  description: "Присоединяйтесь к команде PIZHAMA. Открытые вакансии для разработчиков, дизайнеров и менеджеров проектов.",
  keywords: ["вакансии", "работа", "карьера", "разработчик", "дизайнер"],
  alternates: {
    canonical: `${siteConfig.url}/careers`,
  },
}

const benefits = [
  { icon: Zap, title: "Интересные проекты", desc: "Enterprise клиенты, AI/ML, современный стек" },
  { icon: Users, title: "Сильная команда", desc: "Работай с профессионалами, учись каждый день" },
  { icon: Clock, title: "Гибкий график", desc: "Удаленка или офис, главное — результат" },
  { icon: Heart, title: "Забота о команде", desc: "ДМС, оплата обучения, team building" },
  { icon: Coffee, title: "Комфортный офис", desc: "Современный офис в Актобе" },
  { icon: Briefcase, title: "Карьерный рост", desc: "Прозрачная система грейдов и повышений" },
]

const openPositions = [
  {
    title: "Senior Frontend Developer",
    type: "Полная занятость",
    location: "Удаленно / Актобе",
    salary: "от $3,500",
    requirements: ["React/Next.js", "TypeScript", "3+ года опыта"],
  },
  {
    title: "Senior Backend Developer",
    type: "Полная занятость",
    location: "Удаленно / Актобе",
    salary: "от $3,500",
    requirements: ["Node.js/Python", "PostgreSQL", "3+ года опыта"],
  },
  {
    title: "AI/ML Engineer",
    type: "Полная занятость",
    location: "Удаленно",
    salary: "от $4,000",
    requirements: ["Python", "LLM/NLP", "2+ года опыта"],
  },
  {
    title: "UI/UX Designer",
    type: "Полная занятость",
    location: "Удаленно / Актобе",
    salary: "от $2,500",
    requirements: ["Figma", "Web/Mobile", "2+ года опыта"],
  },
  {
    title: "Project Manager",
    type: "Полная занятость",
    location: "Актобе",
    salary: "от $2,000",
    requirements: ["Agile/Scrum", "Техническая грамотность", "2+ года опыта"],
  },
]

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">Карьера</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Создавай будущее вместе с нами
          </h1>
          <p className="text-lg text-muted-foreground">
            Мы ищем талантливых людей, которые хотят работать над интересными 
            проектами и расти профессионально
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Почему PIZHAMA</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="glass rounded-xl p-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Открытые вакансии</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="glass rounded-xl p-6 hover:bg-card/60 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </span>
                      <span className="text-primary font-medium">{position.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req) => (
                        <span
                          key={req}
                          className="text-xs px-3 py-1 rounded-full bg-secondary"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button className="gap-2 lg:flex-shrink-0" asChild>
                    <a href={`mailto:${siteConfig.links.email}?subject=Отклик на вакансию: ${position.title}`}>
                      Откликнуться
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Position CTA */}
        <div className="glass-strong rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Не нашли подходящую вакансию?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Отправьте нам свое резюме — мы всегда рады талантливым специалистам 
            и готовы обсудить возможности сотрудничества
          </p>
          <Button size="lg" className="gap-2" asChild>
            <a href={`mailto:${siteConfig.links.email}?subject=Резюме`}>
              Отправить резюме
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
