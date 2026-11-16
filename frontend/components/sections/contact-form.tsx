"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
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
  { value: "80k", label: "до 80 000 тг" },
  { value: "80k-200k", label: "от 80 000 до 200 000 тг" },
  { value: "200k-500k", label: "от 200 000 до 500 000 тг" },
  { value: "over-500k", label: "более 500 000 тг" },
]

const serviceOptions = [
  { value: "web-development", label: "Разработка сайта" },
  { value: "crm-erp", label: "CRM / ERP система" },
  { value: "ai-solutions", label: "AI решения" },
  { value: "ai-chatbot", label: "AI чат-бот" },
  { value: "other", label: "Другое" },
]

import { siteConfig } from '@/lib/site-config'
import { getAttribution, trackGoal } from '@/lib/analytics'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const postLead = async () => {
    try {
      const res = await fetch('/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: serviceOptions.find((s) => s.value === service)?.label ?? service,
          budget: budgetOptions.find((b) => b.value === budget)?.label ?? budget,
          description, name, company, phone,
          source: getAttribution(),
        }),
      })
      return res.ok
    } catch (err) {
      console.error('lead save failed', err)
      return false
    }
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(false)
    const ok = await postLead()
    setIsSubmitting(false)
    if (ok) {
      trackGoal('lead_form', { service })
      setIsSubmitted(true)
    } else {
      setSubmitError(true)
    }
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
          Мы свяжемся с вами в течение 2 минут.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      noValidate
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

      <Button type="submit" size="lg" className="w-full gap-2 mt-6 cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          'Отправить заявку'
        )}
      </Button>

      {submitError && (
        <p className="text-sm text-destructive mt-3 text-center" role="alert">
          Не удалось отправить заявку. Напишите нам в{' '}
          <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>
          {' '}или{' '}
          <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer" className="underline">Telegram</a>.
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Нажимая кнопку, вы соглашаетесь с{' '}
        <Link href="/privacy" className="underline hover:text-foreground">политикой конфиденциальности</Link>
      </p>
    </motion.form>
  )
}
