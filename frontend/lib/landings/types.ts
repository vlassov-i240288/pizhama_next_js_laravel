export type Landing = {
  id: string
  name: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  audience: string[]
  pains: { title: string; text: string }[]
  modules: { title: string; text: string }[]
  integrations: string[]
  outcomes: string[]
  faq: { question: string; answer: string }[]
  keywords: string[]
}

export type LandingGroup = {
  // Parent service slug: pages live at /services/<serviceId>/<landing.id>
  serviceId: string
  serviceTitle: string
  eyebrow: string
  sectionTitle: string
  sectionDescription: string
  ctaLabel: string
  modulesTitle: string
  modulesDescription: string
  integrationsTitle: string
  processTitle: string
  process: { step: string; title: string; desc: string }[]
  contactTitle: string
  contactText: string
  otherTitle: string
  backLabel: string
  landings: Landing[]
}
