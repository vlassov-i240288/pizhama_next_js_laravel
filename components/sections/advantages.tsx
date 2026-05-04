"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Shield, Clock, Users, Award, Headphones } from "lucide-react"

const advantages = [
  {
    icon: Sparkles,
    title: "Современные технологии",
    description: "Next.js, React, TypeScript, AI/ML — используем передовой стек для создания быстрых и масштабируемых решений",
  },
  {
    icon: Shield,
    title: "Enterprise качество",
    description: "Строгий код-ревью, тестирование, CI/CD — гарантируем надежность и безопасность на уровне крупных корпораций",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description: "Agile-подход и прозрачная коммуникация — вы всегда знаете статус проекта и получаете результат вовремя",
  },
  {
    icon: Users,
    title: "Сильная команда",
    description: "Senior разработчики с опытом в enterprise проектах. Каждый специалист — эксперт в своей области",
  },
  {
    icon: Award,
    title: "Доказанная экспертиза",
    description: "150+ проектов, 50+ enterprise клиентов, 8 лет на рынке — результаты говорят сами за себя",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "SLA-поддержка с гарантированным временем реакции. Мы рядом, когда вам нужна помощь",
  },
]

const checkmarks = [
  "Бесплатная консультация и оценка проекта",
  "Фиксированная стоимость или Time & Material",
  "Поэтапная оплата с привязкой к результатам",
  "NDA и полная передача прав на код",
  "Гарантия 12 месяцев на все работы",
]

export function AdvantagesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium mb-4 block"
          >
            Почему мы
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
          >
            Преимущества работы с PIZHAMA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Мы не просто разрабатываем — мы становимся вашим технологическим партнером
          </motion.p>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:bg-card/60 transition-colors"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                <advantage.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground text-sm">{advantage.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Checkmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 lg:p-12"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {checkmarks.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
