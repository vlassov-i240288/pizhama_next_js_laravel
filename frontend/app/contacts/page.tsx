import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/contact-form"

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с PIZHAMA для обсуждения вашего проекта. Бесплатная консультация, ответ в течение 24 часов.",
  keywords: ["контакты", "связаться", "заказать разработку", "консультация"],
  alternates: {
    canonical: `${siteConfig.url}/contacts`,
  },
}

const contactMethods = [
  {
    icon: Phone,
    title: "Телефон",
    value: siteConfig.links.phone,
    href: `tel:${siteConfig.links.phone}`,
    description: "Пн-Пт с 9:00 до 18:00",
  },
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
    description: "Ответим в течение 24 часов",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "",
    href: siteConfig.links.telegram,
    description: "Быстрая связь",
  },
  {
    icon: Send,
    title: "WhatsApp",
    value: "",
    href: siteConfig.links.whatsapp,
    description: "Для срочных вопросов",
  },
]

export default function ContactsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">Контакты</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Давайте обсудим ваш проект
          </h1>
          <p className="text-lg text-muted-foreground">
            Выберите удобный способ связи или оставьте заявку — 
            мы свяжемся с вами в течение 2 минут
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 glass rounded-xl p-5 hover:bg-card/60 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <method.icon className="h-5 w-5" />
                </div>
                <div>
                  <div
                    className={
                      method.title === "Telegram" || method.title === "WhatsApp"
                        ? "text-base text-white mb-1 font-semibold"
                        : "text-sm text-muted-foreground mb-1"
                    }
                  >
                    {method.title}
                  </div>
                  {method.value ? (
                    <div className="font-semibold mb-1">{method.value}</div>
                  ) : null}
                  <div className="text-xs text-muted-foreground">{method.description}</div>
                </div>
              </a>
            ))}

            {/* Address */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Офис</div>
                  <div className="font-semibold mb-1">
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {siteConfig.address.street}
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Время работы</div>
                  <div className="font-semibold mb-1">Пн-Пт: 9:00 - 18:00</div>
                  <div className="text-sm text-muted-foreground">
                    GMT+5 (Актобе)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-[21/9]">
              <iframe
                src={
                  `https://www.google.com/maps?q=${encodeURIComponent(
                    siteConfig.address.city + (siteConfig.address.street ? ' ' + siteConfig.address.street : '')
                  )}&output=embed`
                }
                className="w-full h-full border-0"
                loading="lazy"
                title="map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
