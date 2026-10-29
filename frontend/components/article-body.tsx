import Link from "next/link"
import type { ReactNode } from "react"

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
}

// Minimal markdown subset used by blog posts: ##/### headings, -/1. lists, **bold**, [text](href)
export function parseArticle(content: string): Block[] {
  const blocks: Block[] = []
  for (const raw of content.split("\n")) {
    const line = raw.trim()
    if (!line) continue
    const last = blocks[blocks.length - 1]
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) })
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) })
    else if (line.startsWith("- ")) {
      if (last?.type === "ul") last.items.push(line.slice(2))
      else blocks.push({ type: "ul", items: [line.slice(2)] })
    } else if (/^\d+\. /.test(line)) {
      const item = line.replace(/^\d+\. /, "")
      if (last?.type === "ol") last.items.push(item)
      else blocks.push({ type: "ol", items: [item] })
    } else blocks.push({ type: "p", text: line })
  }
  return blocks
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    if (match[1]) {
      parts.push(<strong key={match.index} className="text-foreground font-semibold">{match[1]}</strong>)
    } else {
      const href = match[3]
      parts.push(
        href.startsWith("/") ? (
          <Link key={match.index} href={href} className="text-primary underline underline-offset-4 hover:no-underline">
            {match[2]}
          </Link>
        ) : (
          <a key={match.index} href={href} target="_blank" rel="noopener" className="text-primary underline underline-offset-4 hover:no-underline">
            {match[2]}
          </a>
        ),
      )
    }
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

export function ArticleBody({ content }: { content: string }) {
  const blocks = parseArticle(content)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} id={slugifyHeading(block.text)} className="text-2xl font-bold mt-12 mb-4 scroll-mt-32">
                {block.text}
              </h2>
            )
          case "h3":
            return <h3 key={index} className="text-xl font-semibold mt-8 mb-3">{block.text}</h3>
          case "ul":
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 text-muted-foreground">
                {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
              </ul>
            )
          case "ol":
            return (
              <ol key={index} className="list-decimal pl-6 space-y-2 text-muted-foreground">
                {block.items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
              </ol>
            )
          default:
            return <p key={index} className="text-muted-foreground leading-relaxed">{renderInline(block.text)}</p>
        }
      })}
    </div>
  )
}

export function TableOfContents({ content }: { content: string }) {
  const headings = parseArticle(content).filter((b): b is { type: "h2"; text: string } => b.type === "h2")
  if (headings.length < 3) return null

  return (
    <nav className="glass rounded-2xl p-6 mb-12" aria-label="Содержание статьи">
      <div className="font-semibold mb-3">Содержание</div>
      <ol className="list-decimal pl-5 space-y-1.5 text-sm text-muted-foreground">
        {headings.map((h) => (
          <li key={h.text}>
            <a href={`#${slugifyHeading(h.text)}`} className="hover:text-foreground transition-colors">{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
