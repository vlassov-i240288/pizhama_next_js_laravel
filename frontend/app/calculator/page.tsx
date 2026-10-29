import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ProjectCalculator } from "@/components/sections/project-calculator"
import { JsonLd, breadcrumbList } from "@/components/json-ld"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Калькулятор стоимости сайта, CRM и чат-бота",
  description:
    "Рассчитайте стоимость разработки сайта, интернет-магазина, CRM, чат-бота или AI решения онлайн. Ориентировочная цена в тенге и сроки за минуту.",
  keywords: ["калькулятор стоимости сайта", "сколько стоит сайт", "стоимость разработки CRM", "цена чат-бота", "стоимость интернет-магазина"],
  alternates: {
    canonical: `${siteConfig.url}/calculator`,
  },
  openGraph: {
    title: `Калькулятор стоимости проекта | ${siteConfig.name}`,
    url: `${siteConfig.url}/calculator`,
    images: [`/og?title=${encodeURIComponent("Сколько стоит ваш проект? Расчёт за минуту")}&label=${encodeURIComponent("Калькулятор")}`],
  },
}

const priceFaq = [
  {
    question: "Насколько точен расчёт калькулятора?",
    answer:
      "Калькулятор даёт ориентир по бюджету и срокам для типового проекта. Точная стоимость зависит от объёма контента, дизайна и интеграций и фиксируется в коммерческом предложении после короткого брифа.",
  },
  {
    question: "Из чего складывается стоимость сайта?",
    answer:
      "Из количества страниц и уникальных блоков, сложности дизайна, функционала (каталог, корзина, личный кабинет, онлайн-запись) и интеграций с CRM, 1С, оплатой и мессенджерами.",
  },
  {
    question: "Можно ли оплачивать по этапам?",
    answer:
      "Да. Обычно работаем поэтапно: предоплата за старт, затем оплата по завершении согласованных этапов, например дизайна и разработки.",
  },
  {
    question: "Есть ли дополнительные расходы после запуска?",
    answer:
      "Хостинг и домен, а для чат-ботов и AI ещё оплата API сервисов. Все регулярные расходы называем заранее, до начала работ.",
  },
]

export default function CalculatorPage() {
  return (
    <div className="pt-32 pb-24">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: priceFaq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          breadcrumbList([
            { name: "Главная", path: "/" },
            { name: "Калькулятор стоимости", path: "/calculator" },
          ]),
        ]}
      />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-primary font-medium mb-4 block">Калькулятор</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Сколько стоит сайт, CRM или чат-бот
          </h1>
          <p className="text-lg text-muted-foreground">
            Выберите тип проекта, нужные функции и сложность, и калькулятор покажет ориентировочную
            стоимость в тенге и срок разработки. Точную цену зафиксируем в коммерческом предложении.
          </p>
        </div>
      </div>

      <ProjectCalculator />

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        <section className="max-w-4xl mb-16">
          <h2 className="text-3xl font-bold mb-8">Вопросы о стоимости</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {priceFaq.map((item, index) => (
              <AccordionItem key={index} value={`price-${index}`} className="glass rounded-xl px-6 border-0">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="glass-strong rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Нужна точная оценка?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Оставьте заявку, и в течение 24 часов мы пришлём коммерческое предложение со сроками и стоимостью.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/contacts">
              Получить предложение
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
