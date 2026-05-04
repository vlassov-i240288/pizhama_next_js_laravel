"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

const projectTypes = [
  { id: "landing", name: "Лендинг", basePrice: 3000 },
  { id: "corporate", name: "Корпоративный сайт", basePrice: 8000 },
  { id: "ecommerce", name: "Интернет-магазин", basePrice: 15000 },
  { id: "marketplace", name: "Маркетплейс", basePrice: 50000 },
  { id: "crm", name: "CRM / ERP система", basePrice: 30000 },
  { id: "ai", name: "AI решение", basePrice: 20000 },
]

const features = [
  { id: "design", name: "Уникальный дизайн", multiplier: 1.3 },
  { id: "animations", name: "Анимации и интерактив", multiplier: 1.15 },
  { id: "integrations", name: "Интеграции (CRM, API)", multiplier: 1.25 },
  { id: "multilang", name: "Мультиязычность", multiplier: 1.2 },
  { id: "ai-features", name: "AI функции", multiplier: 1.4 },
]

export function ProjectCalculator() {
  const [projectType, setProjectType] = useState("landing")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [complexity, setComplexity] = useState([50])

  const basePrice = projectTypes.find((t) => t.id === projectType)?.basePrice || 3000
  
  const featuresMultiplier = selectedFeatures.reduce((acc, featureId) => {
    const feature = features.find((f) => f.id === featureId)
    return acc * (feature?.multiplier || 1)
  }, 1)

  const complexityMultiplier = 0.5 + (complexity[0] / 100)
  
  const estimatedPrice = Math.round(basePrice * featuresMultiplier * complexityMultiplier)
  const estimatedTime = Math.round((estimatedPrice / 5000) * 2) // weeks

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    )
  }

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-4"
            >
              <Calculator className="h-4 w-4 text-primary" />
              Калькулятор стоимости
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Рассчитайте стоимость проекта
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Получите предварительную оценку стоимости и сроков
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left - Options */}
              <div className="space-y-8">
                {/* Project Type */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Тип проекта
                  </Label>
                  <RadioGroup
                    value={projectType}
                    onValueChange={setProjectType}
                    className="grid grid-cols-2 gap-3"
                  >
                    {projectTypes.map((type) => (
                      <div key={type.id}>
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.id}
                          className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background/50 cursor-pointer transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                        >
                          <span className="text-sm">{type.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Дополнительные опции
                  </Label>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                          selectedFeatures.includes(feature.id)
                            ? "border-primary bg-primary/10"
                            : "border-border bg-background/50"
                        }`}
                      >
                        <span className="text-sm">{feature.name}</span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedFeatures.includes(feature.id)
                              ? "bg-primary"
                              : "border border-border"
                          }`}
                        >
                          {selectedFeatures.includes(feature.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Сложность проекта: {complexity[0]}%
                  </Label>
                  <Slider
                    value={complexity}
                    onValueChange={setComplexity}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Простой</span>
                    <span>Сложный</span>
                  </div>
                </div>
              </div>

              {/* Right - Result */}
              <div className="lg:pl-8 lg:border-l border-border">
                <div className="glass rounded-xl p-6 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    Ориентировочная стоимость
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-1">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    от {estimatedTime} недель
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Бесплатная консультация</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Детальное ТЗ включено</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Гарантия 12 месяцев</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Поэтапная оплата</span>
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg" asChild>
                  <Link href="/contacts">
                    Обсудить проект
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  * Точная стоимость определяется после анализа требований
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
