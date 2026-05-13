import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, User, Tag, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ slug: string }>
}

const blogPosts = [
  {
    id: "ai-chatbot-business-2024",
    title: "AI чат-боты для бизнеса: полное руководство на 2024 год",
    excerpt: "Разбираем, как внедрить AI чат-бота в бизнес, какие задачи он решает и как измерить ROI от внедрения.",
    category: "AI",
    author: "Алексей Иванов",
    authorRole: "AI Lead",
    date: "15 марта 2024",
    readTime: "12 мин",
    content: `
## Введение

AI чат-боты стали неотъемлемой частью современного бизнеса. В 2024 году технологии достигли уровня, когда чат-бот может полноценно заменить первую линию поддержки и значительно повысить конверсию в продажах.

## Какие задачи решают AI чат-боты

### 1. Клиентская поддержка
- Ответы на типовые вопросы 24/7
- Маршрутизация сложных запросов к операторам
- Сбор обратной связи

### 2. Продажи и лидогенерация
- Квалификация лидов
- Персонализированные рекомендации
- Сопровождение по воронке продаж

### 3. Внутренние процессы
- HR-бот для сотрудников
- IT-поддержка
- Онбординг новых сотрудников

## Технологии

Современные чат-боты строятся на базе LLM (Large Language Models):
- GPT-4 от OpenAI
- Claude от Anthropic
- Open-source модели (LLaMA, Mistral)

## Как измерить ROI

Ключевые метрики для оценки эффективности:
1. **Процент автоматизации** — доля обращений, обработанных без участия человека
2. **NPS** — удовлетворенность клиентов
3. **Среднее время ответа** — скорость реакции на запросы
4. **Конверсия** — влияние на продажи

## Выводы

AI чат-боты — это не просто тренд, а необходимый инструмент для конкурентоспособности в 2024 году. При правильном внедрении ROI может достигать 300% в первый год.
    `,
  },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.id === slug)
  
  if (!post) {
    return {
      title: "Статья не найдена",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, "статья", "блог"],
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.id === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Блог</Link>
          <span>/</span>
          <span className="text-foreground truncate">{post.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Все статьи
        </Link>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-muted-foreground">{post.authorRole}</div>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Поделиться:</span>
                {/* LinkedIn share removed */}
                <Button variant="outline" size="icon" asChild>
                  <a href="#" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="glass rounded-2xl overflow-hidden mb-12">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-9xl font-bold text-foreground/5">AI</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-6">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-12 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-8 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-muted-foreground ml-4">
                      {paragraph.replace('- ', '')}
                    </li>
                  )
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  return (
                    <li key={index} className="text-muted-foreground ml-4">
                      {paragraph.replace(/^\d\. /, '')}
                    </li>
                  )
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  )
                }
                return null
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-12 pt-8 border-t border-border">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {["AI", "чат-боты", "автоматизация", "бизнес"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-strong rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-xl font-bold mb-3">Хотите внедрить AI в ваш бизнес?</h3>
            <p className="text-muted-foreground mb-6">
              Обсудим, как AI может помочь именно вашей компании
            </p>
            <Button size="lg" asChild>
              <Link href="/contacts">
                Получить консультацию
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}
