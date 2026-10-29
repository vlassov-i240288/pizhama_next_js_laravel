import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Tag, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd, breadcrumbList } from "@/components/json-ld"
import { siteConfig } from "@/lib/site-config"
import { blogPosts, coverUrl } from "@/lib/blog-posts"
import { ArticleBody, TableOfContents } from "@/components/article-body"

type Props = {
  params: Promise<{ slug: string }>
}

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
    keywords: post.tags,
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${slug}`,
      images: [coverUrl(post)],
      publishedTime: post.publishedAt,
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

  const postUrl = `${siteConfig.url}/blog/${post.id}`
  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 4)

  return (
    <div className="pt-32 pb-24">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            inLanguage: "ru-RU",
            mainEntityOfPage: postUrl,
            author: { "@id": `${siteConfig.url}/#organization` },
            publisher: { "@id": `${siteConfig.url}/#organization` },
            keywords: post.tags.join(", "),
          },
          breadcrumbList([
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog" },
            { name: post.title, path: `/blog/${post.id}` },
          ]),
        ]}
      />
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
              <time dateTime={post.publishedAt}>{post.date}</time>
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
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Поделиться в Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="glass rounded-2xl overflow-hidden mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl(post)}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto"
            />
          </div>

          <TableOfContents content={post.content} />

          {/* Content */}
          <div className="max-w-none text-lg">
            <ArticleBody content={post.content} />
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-12 pt-8 border-t border-border">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
            <h3 className="text-xl font-bold mb-3">{post.cta.title}</h3>
            <p className="text-muted-foreground mb-6">{post.cta.text}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={post.cta.href}>{post.cta.label}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacts">Получить консультацию</Link>
              </Button>
            </div>
          </div>

          {/* More posts */}
          {otherPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-6">Читайте также</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherPosts.map((other) => (
                  <Link
                    key={other.id}
                    href={`/blog/${other.id}`}
                    className="glass rounded-xl p-5 hover:bg-card/60 transition-colors"
                  >
                    <div className="text-xs text-muted-foreground mb-2">{other.category} · {other.readTime}</div>
                    <div className="font-semibold">{other.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
