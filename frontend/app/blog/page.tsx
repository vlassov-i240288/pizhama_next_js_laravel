import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { CTASection } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Блог — Статьи о разработке и технологиях",
  description: "Экспертные статьи о веб-разработке, AI, автоматизации бизнеса. Делимся опытом и инсайтами из реальных проектов.",
  keywords: ["блог", "статьи", "веб-разработка", "AI", "технологии"],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
}

const blogPosts = [
  {
    id: "ai-chatbot-business-2024",
    title: "AI чат-боты для бизнеса: полное руководство на 2024 год",
    excerpt: "Разбираем, как внедрить AI чат-бота в бизнес, какие задачи он решает и как измерить ROI от внедрения.",
    category: "AI",
    author: "Алексей Иванов",
    date: "15 марта 2024",
    readTime: "12 мин",
    featured: true,
  },
  {
    id: "nextjs-15-features",
    title: "Next.js 15: новые возможности для enterprise разработки",
    excerpt: "Обзор ключевых обновлений Next.js 15 и как они помогают создавать более быстрые и масштабируемые приложения.",
    category: "Разработка",
    author: "Дмитрий Петров",
    date: "10 марта 2024",
    readTime: "8 мин",
    featured: false,
  },
  {
    id: "crm-implementation-guide",
    title: "Внедрение CRM: как избежать типичных ошибок",
    excerpt: "Практическое руководство по внедрению CRM системы. Разбираем кейсы успешных и неудачных внедрений.",
    category: "CRM",
    author: "Мария Соколова",
    date: "5 марта 2024",
    readTime: "15 мин",
    featured: false,
  },
  {
    id: "ai-automation-sales",
    title: "Автоматизация продаж с помощью AI: практический опыт",
    excerpt: "Как мы внедрили AI в воронку продаж и увеличили конверсию на 45%. Пошаговый разбор проекта.",
    category: "AI",
    author: "Алексей Иванов",
    date: "28 февраля 2024",
    readTime: "10 мин",
    featured: false,
  },
  {
    id: "marketplace-development",
    title: "Разработка маркетплейса: архитектура и технологии",
    excerpt: "Технический разбор архитектуры современного маркетплейса. От выбора стека до масштабирования.",
    category: "Разработка",
    author: "Дмитрий Петров",
    date: "20 февраля 2024",
    readTime: "18 мин",
    featured: false,
  },
  {
    id: "seo-nextjs",
    title: "SEO для Next.js приложений: полное руководство",
    excerpt: "Как настроить SEO в Next.js для максимальной видимости в поисковых системах. Технические и контентные аспекты.",
    category: "SEO",
    author: "Елена Козлова",
    date: "15 февраля 2024",
    readTime: "14 мин",
    featured: false,
  },
]

const categories = ["Все", "AI", "Разработка", "CRM", "SEO"]

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured)
  const regularPosts = blogPosts.filter((p) => !p.featured)

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">Блог</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Инсайты о технологиях и бизнесе
          </h1>
          <p className="text-lg text-muted-foreground">
            Делимся опытом из реальных проектов, разбираем технологии 
            и тренды в разработке
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Все" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.id}`}
            className="group block glass rounded-2xl overflow-hidden mb-12 hover:bg-card/60 transition-colors"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-9xl font-bold text-foreground/5">AI</span>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                    <span className="mx-2">•</span>
                    {featuredPost.date}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group glass rounded-2xl overflow-hidden hover:bg-card/60 transition-colors"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground/5">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="px-2 py-1 rounded-full bg-secondary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {post.author}
                  <span className="mx-1">•</span>
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Загрузить еще
          </Button>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
