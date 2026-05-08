import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Users, Target, Award, Rocket, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { stats, siteConfig } from "@/lib/site-config"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "О компании",
  description: "PIZHAMA — экспертное digital-агентство. 8 лет опыта, 150+ проектов, команда senior-специалистов. Разработка сайтов, CRM систем и AI решений.",
  keywords: ["о компании", "digital агентство", "команда разработчиков", "веб-студия Казахстан"],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
}

const values = [
  {
    icon: Target,
    title: "Результат важнее процесса",
    description: "Фокусируемся на бизнес-целях клиента, а не на количестве написанного кода",
  },
  {
    icon: Zap,
    title: "Скорость без компромиссов",
    description: "Быстрая разработка с сохранением качества благодаря отлаженным процессам",
  },
  {
    icon: Heart,
    title: "Партнерство, не подряд",
    description: "Становимся частью команды клиента, разделяем ответственность за результат",
  },
  {
    icon: Rocket,
    title: "Инновации в основе",
    description: "Первыми внедряем новые технологии, чтобы дать клиентам конкурентное преимущество",
  },
]

const team = [
  { role: "Frontend разработчики", count: "8" },
  { role: "Backend разработчики", count: "6" },
  { role: "AI/ML инженеры", count: "4" },
  { role: "UI/UX дизайнеры", count: "3" },
  { role: "Project менеджеры", count: "3" },
  { role: "QA инженеры", count: "2" },
]

const timeline = [
  { year: "2016", event: "Основание компании", desc: "Начали с разработки лендингов и корпоративных сайтов" },
  { year: "2018", event: "Первые enterprise проекты", desc: "Запустили направление CRM/ERP разработки" },
  { year: "2020", event: "Масштабирование", desc: "Команда выросла до 15 человек, открыли офис в Актобе" },
  { year: "2023", event: "AI направление", desc: "Запустили практику AI решений и чат-ботов" },
  { year: "2024", event: "Международный рост", desc: "Вышли на рынки СНГ и Европы, 50+ enterprise клиентов" },
]

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="max-w-4xl mb-20">
          <span className="text-primary font-medium mb-4 block">О компании</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Технологический партнер для амбициозного бизнеса
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            PIZHAMA — это команда из 25+ специалистов, которая создает цифровые продукты 
            для компаний, готовых расти. Мы не просто пишем код — мы решаем бизнес-задачи 
            с помощью технологий.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/contacts">
                Начать проект
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/careers">
                Присоединиться к команде
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Наши ценности</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass rounded-xl p-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Composition */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Команда экспертов</h2>
            <p className="text-muted-foreground mb-6">
              Средний опыт в команде — 6 лет. Каждый специалист проходит 
              строгий отбор и постоянно развивается. Мы инвестируем в обучение 
              и сертификации.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">25+ специалистов в штате</span>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">Средний опыт 6 лет</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {team.map((item) => (
              <div key={item.role} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold gradient-text">{item.count}</div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">История развития</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <div className="glass rounded-xl p-6 inline-block text-left">
                      <div className="text-primary font-bold text-lg mb-1">{item.year}</div>
                      <div className="font-semibold mb-1">{item.event}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-strong rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Технологическая экспертиза</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Наша команда имеет официальные сертификации от ведущих технологических компаний
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            {["AWS Certified", "Google Cloud", "Meta Business", "OpenAI", "Vercel"].map((cert) => (
              <span key={cert} className="text-lg font-semibold">{cert}</span>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
