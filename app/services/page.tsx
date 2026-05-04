import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Globe, Database, Brain, MessageSquare, Cpu, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services, siteConfig } from "@/lib/site-config"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Услуги",
  description: "Полный спектр digital-услуг: разработка сайтов, CRM/ERP систем, внедрение AI решений и автоматизация бизнес-процессов",
  keywords: ["разработка сайтов", "CRM системы", "ERP системы", "AI решения", "автоматизация бизнеса", "веб-разработка"],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
}

const iconMap = {
  Globe,
  Database,
  Brain,
  MessageSquare,
}

const additionalServices = [
  {
    icon: Cpu,
    title: "Автоматизация бизнес-процессов",
    description: "Оптимизация и автоматизация рабочих процессов с помощью современных технологий",
    href: "/services/automation",
  },
  {
    icon: Workflow,
    title: "Интеграции и API",
    description: "Интеграция систем, разработка API и микросервисной архитектуры",
    href: "/services/integrations",
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">Услуги</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Создаем технологии для роста вашего бизнеса
          </h1>
          <p className="text-lg text-muted-foreground">
            От разработки сайтов до внедрения искусственного интеллекта — 
            полный спектр услуг для цифровой трансформации
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group block glass hover:bg-card/60 rounded-2xl p-8 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Технологии:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {additionalServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex items-start gap-4 glass rounded-xl p-6 hover:bg-card/60 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <service.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Process Section */}
        <div className="glass-strong rounded-2xl p-8 lg:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Как мы работаем</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Анализ", desc: "Изучаем бизнес, цели и требования" },
              { step: "02", title: "Проектирование", desc: "Создаем архитектуру и прототипы" },
              { step: "03", title: "Разработка", desc: "Iterative development с демо каждые 2 недели" },
              { step: "04", title: "Запуск", desc: "Тестирование, деплой и поддержка" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-3">{item.step}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
