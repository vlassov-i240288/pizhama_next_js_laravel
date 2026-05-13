"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { siteConfig, navigation } from "@/lib/site-config"

export function Footer() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  return (
    <footer className="border-t border-border bg-card/30">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="glass rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-balance">
                Получайте инсайты о технологиях и бизнесе
              </h3>
              <p className="text-muted-foreground">
                Подпишитесь на рассылку — делимся опытом разработки и внедрения IT-решений
              </p>
            </div>
            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const emailValue = (e.currentTarget.elements as any)["newsletter-email"].value as string
                const emailRe = /^\S+@\S+\.\S+$/
                if (!emailValue || !emailRe.test(emailValue)) {
                  setError("Введите корректный email")
                  setSuccess("")
                  return
                }
                setError("")
                setSuccess("Спасибо! Вы подписаны.")
                setEmail("")
              }}
            >
              <Input
                name="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Ваш email"
                className="flex-1 bg-background/50"
                aria-invalid={!!error}
              />
              <Button type="submit" className="gap-2 cursor-pointer">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Подписаться</span>
              </Button>
            </form>
            <div className="mt-2">
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : success ? (
                <p className="text-sm text-success">{success}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 flex items-center gap-3">
              <img src="/logo_pizhama.svg" alt={siteConfig.name} className="h-8 w-auto" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {siteConfig.description}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.links.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.links.phone}
              </a>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.links.email}
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>
                  {siteConfig.address.country}, {siteConfig.address.city}
                  {siteConfig.address.street ? `, ${siteConfig.address.street}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-3">
              {navigation.footer.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-3">
              {navigation.footer.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Messengers */}
          <div>
            <h4 className="font-semibold mb-4">Связаться</h4>
            <div className="space-y-3">
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Telegram
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                WhatsApp
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              {navigation.footer.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
