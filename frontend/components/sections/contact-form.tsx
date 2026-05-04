"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const budgetOptions = [
  { value: "under-10k", label: "До $10,000" },
  { value: "10k-30k", label: "$10,000 - $30,000" },
  { value: "30k-100k", label: "$30,000 - $100,000" },
  { value: "over-100k", label: "Более $100,000" },
]

const serviceOptions = [
  { value: "web-development", label: "Разработка сайта" },
  { value: "crm-erp", label: "CRM / ERP система" },
  { value: "ai-solutions", label: "AI решения" },
  { value: "ai-chatbot", label: "AI чат-бот" },
  { value: "other", label: "Другое" },
]

import { siteConfig } from '@/lib/site-config'
import { API_URL } from '@/lib/api'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [redirectProvider, setRedirectProvider] = useState<'whatsapp' | 'telegram' | null>(null)
  const [step, setStep] = useState(1)

  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const postLead = async () => {
    try {
      await fetch(`${API_URL}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, budget, description, name, company, email, phone }),
      })
    } catch (err) {
      console.error('lead save failed', err)
    }
  }

  const buildMessage = () => {
    const serviceLabel = serviceOptions.find((s) => s.value === service)?.label ?? service
    const budgetLabel = budgetOptions.find((b) => b.value === budget)?.label ?? budget
    return `Здравствуйте!\n\nЯ хотел бы обсудить проект.\n\nУслуга: ${serviceLabel}\nБюджет: ${budgetLabel}\nКратко: ${description}\n\nКонтакт:\n${name}\nКомпания: ${company}\nEmail: ${email}\nТелефон: ${phone}\n\nГотов(ы) обсудить детали. Спасибо!`
  }

  const sendAndRedirect = async (provider: 'whatsapp' | 'telegram') => {
    setIsSubmitting(true)
    await postLead()
    setRedirectProvider(provider)
    setIsRedirecting(true)
    setIsSubmitting(false)

    const messageRaw = buildMessage()

    let url = ''
    if (provider === 'whatsapp') {
      const waBase = siteConfig.links.whatsapp
      url = `${waBase}?text=${encodeURIComponent(messageRaw)}`
    } else {
      url = `https://t.me/share?text=${encodeURIComponent(messageRaw)}`
    }

    setTimeout(() => {
      if (provider === 'telegram') {
        // Try to open Telegram app via tg:// protocol, then fallback to web link
        try {
          const appUrl = `tg://msg?text=${encodeURIComponent(messageRaw)}`
          const iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          iframe.src = appUrl
          document.body.appendChild(iframe)
          // After short delay, fallback to web share (for desktop or if app didn't open)
          setTimeout(() => {
            window.location.href = url
          }, 800)
        } catch (e) {
          window.location.href = url
        }
      } else {
        window.location.href = url
      }
    }, 5000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 lg:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Заявка отправлена!</h3>
        <p className="text-muted-foreground">
          Мы свяжемся с вами в течение 24 часов для обсуждения вашего проекта.
        </p>
      </motion.div>
    )
  }

  if (isRedirecting) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 lg:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
        <h3 className="text-2xl font-bold mb-3">{redirectProvider === 'telegram' ? 'Сейчас вас перенаправят в Telegram чат' : 'Сейчас вас перенаправят в WhatsApp чат'}</h3>
        <p className="text-muted-foreground">{redirectProvider === 'telegram' ? 'Через пару секунд откроется Telegram — сообщение будет готово к отправке.' : 'Через пару секунд откроется WhatsApp — сообщение будет готово к отправке.'}</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => e.preventDefault()}
      className="glass rounded-2xl p-8 lg:p-12"
    >
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Расскажите о проекте</h3>
            <p className="text-sm text-muted-foreground">
              Шаг 1 из 2 — Информация о проекте
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="service">Тип услуги</Label>
              <Select required value={service} onValueChange={(v) => setService(v)}>
                  <SelectTrigger id="service" className="mt-2 bg-background/50">
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            <div>
              <Label htmlFor="budget">Бюджет</Label>
              <Select required value={budget} onValueChange={(v) => setBudget(v)}>
                <SelectTrigger id="budget" className="mt-2 bg-background/50">
                  <SelectValue placeholder="Выберите бюджет" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Описание проекта</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Опишите ваш проект, задачи и ожидания..."
                className="mt-2 bg-background/50 min-h-[120px]"
              />
            </div>
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={() => setStep(2)}
          >
            Далее
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Контактные данные</h3>
            <p className="text-sm text-muted-foreground">
              Шаг 2 из 2 — Как с вами связаться
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="mt-2 bg-background/50"
              />
            </div>

            <div>
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Название компании"
                className="mt-2 bg-background/50"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@company.com"
                className="mt-2 bg-background/50"
              />
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="mt-2 bg-background/50"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Назад
            </Button>

            <Button
              type="button"
              className="flex-1 gap-2"
              disabled={isSubmitting}
              onClick={() => sendAndRedirect('whatsapp')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Отправить в WhatsApp
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="flex-1 gap-2"
              disabled={isSubmitting}
              onClick={() => sendAndRedirect('telegram')}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Отправить в Telegram
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.form>
  )
}
