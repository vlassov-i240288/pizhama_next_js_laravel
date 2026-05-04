import type { Metadata } from "next"
import Link from "next/link"
import { faqItems, siteConfig } from "@/lib/site-config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — Часто задаваемые вопросы",
  description: "Ответы на популярные вопросы о разработке сайтов, CRM систем, AI решений. Стоимость, сроки, процесс работы.",
  keywords: ["FAQ", "вопросы и ответы", "стоимость разработки", "сроки разработки"],
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
}

const additionalFaq = [
  {
    category: "Разработка сайтов",
    questions: [
      {
        question: "Какие типы сайтов вы разрабатываете?",
        answer: "Мы создаем любые типы веб-продуктов: лендинги, корпоративные сайты, интернет-магазины, маркетплейсы, SaaS-платформы, веб-приложения и PWA.",
      },
      {
        question: "Занимаетесь ли вы редизайном существующих сайтов?",
        answer: "Да, мы проводим аудит, редизайн и рефакторинг существующих проектов. Можем улучшить дизайн, производительность и SEO вашего текущего сайта.",
      },
    ],
  },
  {
    category: "CRM и ERP системы",
    questions: [
      {
        question: "Можете ли вы интегрировать CRM с 1С?",
        answer: "Да, мы имеем опыт интеграции с 1С:Предприятие, включая обмен данными в реальном времени, синхронизацию справочников и документов.",
      },
      {
        question: "Используете готовые CRM или разрабатываете с нуля?",
        answer: "Зависит от задачи. Для типовых процессов можем настроить Bitrix24 или amoCRM. Для уникальных требований разрабатываем кастомное решение.",
      },
    ],
  },
  {
    category: "AI решения",
    questions: [
      {
        question: "Какие AI-модели вы используете?",
        answer: "GPT-4, Claude, собственные fine-tuned модели на базе open-source LLM. Выбор зависит от задачи, требований к приватности и бюджета.",
      },
      {
        question: "Можно ли обучить AI на наших данных?",
        answer: "Да, мы создаем RAG-системы и fine-tune модели на ваших данных с соблюдением конфиденциальности. Данные могут храниться на ваших серверах.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-4 block">FAQ</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Часто задаваемые вопросы
          </h1>
          <p className="text-lg text-muted-foreground">
            Ответы на популярные вопросы о нашей работе, ценах и процессе разработки
          </p>
        </div>

        {/* Main FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Общие вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`main-${index}`}
                className="glass rounded-xl px-6 border-0"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional FAQ by Category */}
        {additionalFaq.map((category) => (
          <div key={category.category} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`${category.category}-${index}`}
                  className="glass rounded-xl px-6 border-0"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="glass-strong rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Свяжитесь с нами — мы с удовольствием ответим на любые вопросы 
            и поможем разобраться в деталях
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/contacts">
                Задать вопрос
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Написать в Telegram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
