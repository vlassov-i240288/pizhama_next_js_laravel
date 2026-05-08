"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
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
  

  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const postLead = async () => {
    try {
      await fetch(`${API_URL}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, budget, description, name, company, phone }),
      })
    } catch (err) {
      console.error('lead save failed', err)
    }
  }

  const buildMessage = () => {
    const serviceLabel = serviceOptions.find((s) => s.value === service)?.label ?? service
    const budgetLabel = budgetOptions.find((b) => b.value === budget)?.label ?? budget
    return `Здравствуйте!\n\nЯ хотел бы обсудить проект.\n\nУслуга: ${serviceLabel}\nБюджет: ${budgetLabel}\nКратко: ${description}\n\nКонтакт:\n${name}\nКомпания: ${company}\nТелефон: ${phone}\n\nГотов(ы) обсудить детали. Спасибо!`
  }
  const validate = () => {
    const e: Record<string, string> = {}
    if (!service) e.service = 'Выберите услугу'
    if (!budget) e.budget = 'Выберите бюджет'
    if (!description || description.trim().length < 10) e.description = 'Опишите проект (мин. 10 символов)'
    if (!name) e.name = 'Введите имя'
    if (!phone || phone.trim().length < 6) e.phone = 'Введите корректный телефон'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  

  const sendAndRedirect = async (provider: 'whatsapp' | 'telegram') => {
    // validate fields before sending
    const valid = validate()
    if (!valid) return
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
      const tgBase = siteConfig.links.telegram || 'https://t.me'
      // Open chat with username if provided, same behavior as WhatsApp
      url = `${tgBase}?text=${encodeURIComponent(messageRaw)}`
    }

    setTimeout(() => {
        // For both providers use direct navigation to the messenger share URL
        // Direct navigation for both providers (same UX as WhatsApp)
        window.location.href = url
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
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Свяжитесь с нами</h3>
        <p className="text-sm text-muted-foreground">Расскажите о проекте и оставьте контакты</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="service">Тип услуги</Label>
          <Select required value={service} onValueChange={(v) => { setService(v); setErrors(prev => { const p = {...prev}; delete p.service; return p }) }}>
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
          {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
        </div>

        <div>
          <Label htmlFor="budget">Бюджет</Label>
          <Select required value={budget} onValueChange={(v) => { setBudget(v); setErrors(prev => { const p = {...prev}; delete p.budget; return p }) }}>
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
          {errors.budget && <p className="text-sm text-destructive mt-1">{errors.budget}</p>}
        </div>

        <div>
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors(prev => { const p = {...prev}; delete p.name; return p }) }}
            placeholder="Ваше имя"
            className="mt-2 bg-background/50"
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors(prev => { const p = {...prev}; delete p.phone; return p }) }}
            placeholder="+7 (___) ___-__-__"
            className="mt-2 bg-background/50"
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="description">Описание проекта</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors(prev => { const p = {...prev}; delete p.description; return p }) }}
            placeholder="Опишите ваш проект, задачи и ожидания..."
            className="mt-2 bg-background/50 min-h-[120px]"
          />
          {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          type="button"
          className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          disabled={isSubmitting}
          onClick={() => sendAndRedirect('whatsapp')}
          aria-label="Отправить в WhatsApp"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .01 4.773.01 10.668c0 1.88.493 3.63 1.402 5.17L0 24l8.54-2.252A11.94 11.94 0 0012 22c6.627 0 11.99-4.773 11.99-10.668 0-2.89-1.2-5.57-3.47-7.852zM12 20.5c-1.31 0-2.6-.28-3.77-.82l-.27-.13-5.06 1.33 1.36-4.93-.17-.28A8.02 8.02 0 013.99 10.67C3.99 6.24 7.93 2.5 12 2.5c2.1 0 4.05.78 5.53 2.07A8.4 8.4 0 0120.49 10.67C20.49 15.1 16.55 19.5 12 19.5z" />
                <path d="M17.2 14.1c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.34.22-.64.07-.3-.15-1.28-.47-2.44-1.49-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.28.3-.47.1-.2 0-.38-.05-.53-.05-.15-.67-1.63-.92-2.22-.24-.58-.48-.5-.66-.51-.17-.01-.38-.01-.58-.01s-.53.07-.8.34c-.27.27-1.03 1.01-1.03 2.46 0 1.44 1.05 2.83 1.2 3.03.15.2 2.07 3.35 5.02 4.69 2.95 1.34 2.95.9 3.48.84.53-.06 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.18-.58-.33z" fill="#fff" />
              </svg>
              <span>Отправить в WhatsApp</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          disabled={isSubmitting}
          onClick={() => sendAndRedirect('telegram')}
          aria-label="Отправить в Telegram"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M21.72 2.19a1.5 1.5 0 00-1.53-.18L2.88 9.07a1 1 0 00.06 1.84l3.38 1.18 1.36 4.28c.27.86 1.14 1.3 1.9.99l3.09-1.32 2.95 2.31c.9.71 2.22.24 2.5-1.02l2.33-10.88a1.5 1.5 0 00-.18-1.5 1.5 1.5 0 00-1.07-.48zM9.2 13.34L6.71 11.6l9.76-5.2-7.27 6.94z" />
              </svg>
              <span>Отправить в Telegram</span>
            </>
          )}
        </Button>
      </div>
    </motion.form>
  )
}
