import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { caseStudies, siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((caseItem) => ({
    slug: caseItem.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseItem = caseStudies.find((c) => c.id === slug)
  
  if (!caseItem) {
    return {
      title: "Кейс не найден",
    }
  }

  return {
    title: `${caseItem.title} — Кейс`,
    description: caseItem.description,
    keywords: [caseItem.title, caseItem.category, ...caseItem.technologies],
    alternates: {
      canonical: `${siteConfig.url}/portfolio/${slug}`,
    },
    openGraph: {
      title: `${caseItem.title} | ${siteConfig.name}`,
      description: caseItem.description,
      url: `${siteConfig.url}/portfolio/${slug}`,
    },
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const caseItem = caseStudies.find((c) => c.id === slug)

  if (!caseItem) {
    notFound()
  }

  const currentIndex = caseStudies.findIndex((c) => c.id === slug)
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length]
  const prevCase = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length]

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-foreground transition-colors">Портфолио</Link>
          <span>/</span>
          <span className="text-foreground">{caseItem.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Все кейсы
        </Link>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div>
            <span className="text-primary font-medium mb-4 block">
              {caseItem.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {caseItem.title}
            </h1>
            <p className="text-muted-foreground mb-2">
              Клиент: <span className="text-foreground">{caseItem.client}</span>
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {caseItem.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/contacts">
                  Обсудить похожий проект
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-9xl font-bold text-foreground/5">
                {caseItem.title.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="glass-strong rounded-2xl p-8 lg:p-12 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Результаты проекта</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {caseItem.results.map((result) => (
              <div key={result.metric} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {result.value}
                </div>
                <div className="font-medium mb-1">{result.metric}</div>
                <div className="text-sm text-muted-foreground">{result.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Challenge */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Задача</h3>
            <p className="text-sm text-muted-foreground">
              Клиент обратился с задачей создания масштабируемого решения, 
              которое позволит автоматизировать ключевые бизнес-процессы 
              и повысить эффективность работы команды.
            </p>
          </div>

          {/* Solution */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Решение</h3>
            <p className="text-sm text-muted-foreground">
              Мы разработали комплексное решение с использованием современного 
              технологического стека, обеспечивающее высокую производительность 
              и удобство использования.
            </p>
          </div>

          {/* Technologies */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Технологии</h3>
            <div className="flex flex-wrap gap-2">
              {caseItem.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Ключевые особенности</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Адаптивный дизайн для всех устройств",
              "Высокая производительность и SEO-оптимизация",
              "Интеграция с внешними сервисами",
              "Система аналитики и отчетности",
              "Масштабируемая архитектура",
              "Безопасность на уровне enterprise",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 glass rounded-lg p-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
          <Link
            href={`/portfolio/${prevCase.id}`}
            className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-card/60 transition-colors flex-1"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground mb-1">Предыдущий</div>
              <div className="font-medium">{prevCase.title}</div>
            </div>
          </Link>
          <Link
            href={`/portfolio/${nextCase.id}`}
            className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-card/60 transition-colors flex-1 sm:flex-row-reverse sm:text-right"
          >
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground mb-1">Следующий</div>
              <div className="font-medium">{nextCase.title}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
