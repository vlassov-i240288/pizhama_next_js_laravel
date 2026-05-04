"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { caseStudies } from "@/lib/site-config"

const categories = ["Все", "Маркетплейс", "CRM/ERP", "AI решения", "SaaS"]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("Все")

  const filteredCases = activeCategory === "Все"
    ? caseStudies
    : caseStudies.filter((c) => c.category === activeCategory)

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCases.map((caseItem) => (
          <Link
            key={caseItem.id}
            href={`/portfolio/${caseItem.id}`}
            className="group glass rounded-2xl overflow-hidden hover:bg-card/60 transition-all duration-300"
          >
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-foreground/5">
                  {caseItem.title.charAt(0)}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur rounded-full">
                  {caseItem.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-background/80 backdrop-blur rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-2">
                {caseItem.client}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {caseItem.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6">
                {caseItem.description}
              </p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {caseItem.results.map((result) => (
                  <div key={result.metric}>
                    <div className="text-lg font-bold text-primary">
                      {result.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-4">
                {caseItem.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded bg-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Кейсы в этой категории скоро появятся
          </p>
        </div>
      )}
    </div>
  )
}
