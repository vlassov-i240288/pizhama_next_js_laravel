"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Bot, Zap, TrendingUp, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Bot,
    title: "AI Чат-боты",
    description: "Интеллектуальные боты на базе GPT для автоматизации поддержки и продаж",
  },
  {
    icon: Zap,
    title: "Автоматизация процессов",
    description: "AI-агенты для автоматизации рутинных задач и принятия решений",
  },
  {
    icon: TrendingUp,
    title: "Предиктивная аналитика",
    description: "Прогнозирование продаж, спроса и поведения клиентов",
  },
  {
    icon: Shield,
    title: "AI в безопасности",
    description: "Обнаружение аномалий и предотвращение мошенничества",
  },
  {
    icon: Clock,
    title: "Обработка документов",
    description: "Автоматический анализ и извлечение данных из документов",
  },
  {
    icon: Users,
    title: "Персонализация",
    description: "AI-рекомендации и персональный опыт для каждого клиента",
  },
]

export function AISolutionsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium mb-4 block"
            >
              AI решения
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            >
              Внедряем искусственный интеллект в ваш бизнес
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Используем GPT-4, Claude и другие LLM для создания умных решений, 
              которые автоматизируют процессы, снижают затраты и увеличивают продажи.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <div>
                <div className="text-3xl font-bold gradient-text">78%</div>
                <div className="text-sm text-muted-foreground">Автоматизация обращений</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">3x</div>
                <div className="text-sm text-muted-foreground">Рост конверсии</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">-60%</div>
                <div className="text-sm text-muted-foreground">Операционные затраты</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="gap-2" asChild>
                <Link href="/services/ai-solutions">
                  Узнать больше
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacts">
                  Получить консультацию
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-xl p-5 hover:bg-card/60 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
