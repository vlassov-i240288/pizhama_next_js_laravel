import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Globe, Database, Brain, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services, caseStudies, siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/contact-form"

const iconMap = {
  Globe,
  Database,
  Brain,
  MessageSquare,
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.id === slug)
  
  if (!service) {
    return {
      title: "Услуга не найдена",
    }
  }

  return {
    title: service.title,
    description: service.description,
    keywords: [service.title, ...service.features],
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
      url: `${siteConfig.url}/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.id === slug)

  if (!service) {
    notFound()
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap]
  const relatedCases = caseStudies.filter((c) => 
    c.technologies.some((t) => service.technologies.includes(t))
  ).slice(0, 2)

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Услуги</Link>
          <span>/</span>
          <span className="text-foreground">{service.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Все услуги
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6">
              <Icon className="h-8 w-8" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              {service.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/contacts">
                  Обсудить проект
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio">
                  Смотреть кейсы
                </Link>
              </Button>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Технологии
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">Что включено</h2>
            <div className="space-y-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Похожие проекты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/portfolio/${caseItem.id}`}
                  className="group glass rounded-2xl overflow-hidden hover:bg-card/60 transition-colors"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur rounded-full">
                        {caseItem.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Обсудить проект</h2>
            <p className="text-muted-foreground mb-6">
              Расскажите о вашем проекте — мы подготовим индивидуальное предложение 
              с оценкой сроков и стоимости.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>Бесплатная консультация</p>
              <p>Ответ в течение 24 часов</p>
              <p>NDA по запросу</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
