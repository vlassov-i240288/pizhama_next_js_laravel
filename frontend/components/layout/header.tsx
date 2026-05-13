"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navigation, siteConfig } from "@/lib/site-config"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-strong py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo_pizhama.svg" alt={siteConfig.name} className="h-8 w-auto" />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  )}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="glass-strong rounded-xl p-2 min-w-[220px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <Link href="/contacts">
                Обсудить проект
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navigation.main.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Button className="w-full gap-2" asChild>
                    <Link href="/contacts">
                      Обсудить проект
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
