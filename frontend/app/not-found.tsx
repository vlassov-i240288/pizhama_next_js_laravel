import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-9xl font-bold gradient-text mb-6">404</div>
          <h1 className="text-3xl font-bold mb-4">Страница не найдена</h1>
          <p className="text-muted-foreground mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
                На главную
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/contacts">
                <ArrowLeft className="h-5 w-5" />
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
