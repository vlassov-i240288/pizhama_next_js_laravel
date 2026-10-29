import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { AlertCircle, ArrowLeft, ArrowRight, Check, Plug, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ContactForm } from "@/components/sections/contact-form"
import { JsonLd, breadcrumbList } from "@/components/json-ld"
import { getLanding, landingGroups } from "@/lib/landings"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ slug: string; industry: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return landingGroups.flatMap((group) =>
    group.landings.map((landing) => ({
      slug: group.serviceId,
      industry: landing.id,
    })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, industry } = await params
  const found = getLanding(slug, industry)

  if (!found) {
    return {
      title: "Страница не найдена",
    }
  }

  const { landing } = found
  const path = `/services/${slug}/${landing.id}`

  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    keywords: landing.keywords,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
    openGraph: {
      title: `${landing.metaTitle} | ${siteConfig.name}`,
      description: landing.metaDescription,
      url: `${siteConfig.url}${path}`,
      images: [`/og?title=${encodeURIComponent(landing.title)}&label=${encodeURIComponent(found.group.eyebrow)}`],
    },
  }
}

export default async function LandingPage({ params }: Props) {
  const { slug, industry } = await params
  const found = getLanding(slug, industry)

  if (!found) {
    notFound()
  }

  const { group, landing } = found
  const parentPath = `/services/${group.serviceId}`
  const path = `${parentPath}/${landing.id}`
  const otherLandings = group.landings.filter((l) => l.id !== landing.id)

  return (
    <div className="pt-32 pb-24">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: landing.title,
            description: landing.metaDescription,
            serviceType: group.serviceTitle,
            url: `${siteConfig.url}${path}`,
            provider: { "@id": `${siteConfig.url}/#organization` },
            areaServed: "KZ",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: landing.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          breadcrumbList([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/services" },
            { name: group.serviceTitle, path: parentPath },
            { name: landing.title, path },
          ]),
        ]}
      />
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">Услуги</Link>
          <span>/</span>
          <Link href={parentPath} className="hover:text-foreground transition-colors">{group.serviceTitle}</Link>
          <span>/</span>
          <span className="text-foreground">{landing.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          href={parentPath}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {group.backLabel}
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <span className="text-primary font-medium mb-4 block">{group.eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            {landing.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {landing.intro}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="gap-2" asChild>
              <Link href="#contact">
                {group.ctaLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/calculator">
                Рассчитать стоимость
              </Link>
            </Button>
          </div>

          <h2 className="text-sm font-medium text-muted-foreground mb-3">Кому подходит</h2>
          <div className="flex flex-wrap gap-2">
            {landing.audience.map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-lg bg-secondary text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Pains */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Знакомые проблемы?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {landing.pains.map((pain) => (
              <div key={pain.title} className="glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{pain.title}</h3>
                    <p className="text-sm text-muted-foreground">{pain.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4">{group.modulesTitle}</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">{group.modulesDescription}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landing.modules.map((module) => (
              <div key={module.title} className="glass rounded-2xl p-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground">{module.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations & Outcomes */}
        <section className="grid lg:grid-cols-2 gap-6 mb-20">
          <div className="glass-strong rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Plug className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">{group.integrationsTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {landing.integrations.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Что изменится</h2>
            </div>
            <ul className="space-y-3">
              {landing.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="glass-strong rounded-2xl p-8 lg:p-12 mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">{group.processTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-3">{item.step}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {landing.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="glass rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Other landings in the group */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">{group.otherTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherLandings.map((item) => (
              <Link
                key={item.id}
                href={`${parentPath}/${item.id}`}
                className="group flex items-center justify-between glass rounded-xl p-5 hover:bg-card/60 transition-colors"
              >
                <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <div id="contact" className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start scroll-mt-32">
          <div>
            <h2 className="text-3xl font-bold mb-4">{group.contactTitle}</h2>
            <p className="text-muted-foreground mb-6">{group.contactText}</p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>Бесплатная консультация и разбор задачи</p>
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
