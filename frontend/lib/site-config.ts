export const siteConfig = {
  name: "PIZHAMA",
  description: "Экспертное digital-агентство по разработке сайтов, CRM/ERP систем и внедрению AI решений для бизнеса",
  url: "https://nexus.agency",
  ogImage: "https://nexus.agency/og.jpg",
  links: {
    telegram: "https://t.me/nexus_agency",
    whatsapp: "https://wa.me/77019204449",
    email: "hello@nexus.agency",
    phone: "+7 (701) 920-4449",
  },
  address: {
    city: "Алматы",
    country: "Казахстан",
    street: "ул. Достык, 200",
    zip: "050051",
  },
  social: {
    linkedin: "https://linkedin.com/company/nexus-agency",
    instagram: "https://instagram.com/nexus.agency",
    facebook: "https://facebook.com/nexus.agency",
  },
  keywords: [
    "разработка сайтов Казахстан",
    "разработка CRM систем",
    "внедрение ИИ в бизнес",
    "AI чат-бот для бизнеса",
    "автоматизация бизнеса",
    "разработка маркетплейсов",
    "enterprise web development",
    "разработка ERP систем",
    "веб-разработка Алматы",
    "digital agency Kazakhstan",
  ],
} as const

export const navigation = {
  main: [
    { name: "Главная", href: "/" },
    { name: "О компании", href: "/about" },
    {
      name: "Услуги",
      href: "/services",
      children: [
        { name: "Разработка сайтов", href: "/services/web-development" },
        { name: "CRM / ERP системы", href: "/services/crm-erp" },
        { name: "AI решения для бизнеса", href: "/services/ai-solutions" },
        { name: "AI чат-боты", href: "/services/ai-chatbots" },
      ],
    },
    { name: "Портфолио", href: "/portfolio" },
    { name: "Блог", href: "/blog" },
    { name: "Контакты", href: "/contacts" },
  ],
  footer: {
    services: [
      { name: "Разработка сайтов", href: "/services/web-development" },
      { name: "CRM / ERP системы", href: "/services/crm-erp" },
      { name: "AI решения", href: "/services/ai-solutions" },
      { name: "AI чат-боты", href: "/services/ai-chatbots" },
      { name: "Автоматизация", href: "/services/automation" },
    ],
    company: [
      { name: "О нас", href: "/about" },
      { name: "Карьера", href: "/careers" },
      { name: "FAQ", href: "/faq" },
      { name: "Блог", href: "/blog" },
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Пользовательское соглашение", href: "/terms" },
    ],
  },
} as const

export const services = [
  {
    id: "web-development",
    title: "Разработка сайтов",
    shortDescription: "Лендинги, корпоративные сайты, интернет-магазины, маркетплейсы, SaaS",
    description: "Создаем веб-продукты любой сложности: от лендингов до масштабных маркетплейсов. Используем современные технологии и лучшие практики разработки.",
    icon: "Globe",
    features: [
      "Лендинги и промо-сайты",
      "Корпоративные порталы",
      "Интернет-магазины",
      "Маркетплейсы",
      "SaaS платформы",
      "Веб-приложения",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "crm-erp",
    title: "CRM / ERP системы",
    shortDescription: "Разработка и внедрение систем управления бизнесом",
    description: "Проектируем и разрабатываем CRM и ERP системы, которые автоматизируют бизнес-процессы и повышают эффективность команды.",
    icon: "Database",
    features: [
      "Кастомная CRM разработка",
      "ERP системы",
      "B2B платформы",
      "Интеграции с 1С",
      "Автоматизация продаж",
      "Аналитика и отчетность",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    id: "ai-solutions",
    title: "AI решения для бизнеса",
    shortDescription: "Внедрение искусственного интеллекта в бизнес-процессы",
    description: "Интегрируем AI в продажи, поддержку, маркетинг и внутренние процессы. Помогаем бизнесу использовать силу искусственного интеллекта.",
    icon: "Brain",
    features: [
      "AI в продажах",
      "Автоматизация поддержки",
      "AI маркетинг",
      "Предиктивная аналитика",
      "Обработка документов",
      "Умный поиск",
    ],
    technologies: ["OpenAI", "LangChain", "Python", "TensorFlow", "Vector DB"],
  },
  {
    id: "ai-chatbots",
    title: "AI чат-боты",
    shortDescription: "Умные чат-боты для автоматизации коммуникаций",
    description: "Создаем интеллектуальных чат-ботов на базе GPT и других LLM для автоматизации клиентского сервиса и внутренних коммуникаций.",
    icon: "MessageSquare",
    features: [
      "GPT-powered боты",
      "Мультиканальность",
      "Интеграция с CRM",
      "Обучение на данных",
      "24/7 поддержка",
      "Аналитика диалогов",
    ],
    technologies: ["OpenAI GPT", "Anthropic Claude", "Telegram API", "WhatsApp API"],
  },
] as const

export const caseStudies = [
  {
    id: "marketplace-auto",
    title: "Маркетплейс автозапчастей",
    client: "AutoParts KZ",
    category: "Маркетплейс",
    description: "Разработка B2B маркетплейса автозапчастей с AI-поиском и интеграцией с поставщиками",
    image: "/cases/marketplace.jpg",
    results: [
      { metric: "GMV", value: "$2M+", description: "в месяц" },
      { metric: "Поставщики", value: "500+", description: "подключено" },
      { metric: "SKU", value: "1M+", description: "позиций" },
    ],
    technologies: ["Next.js", "PostgreSQL", "Elasticsearch", "AI Search"],
  },
  {
    id: "crm-fintech",
    title: "CRM для финтех компании",
    client: "FinanceHub",
    category: "CRM/ERP",
    description: "Кастомная CRM система для управления клиентами и автоматизации продаж в финтех секторе",
    image: "/cases/crm.jpg",
    results: [
      { metric: "Конверсия", value: "+45%", description: "рост" },
      { metric: "Время", value: "-60%", description: "обработки" },
      { metric: "ROI", value: "300%", description: "за год" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    id: "ai-support",
    title: "AI система поддержки",
    client: "TelecomPro",
    category: "AI решения",
    description: "Внедрение AI чат-бота и системы автоматизации поддержки для телеком оператора",
    image: "/cases/ai-support.jpg",
    results: [
      { metric: "Автоматизация", value: "78%", description: "обращений" },
      { metric: "NPS", value: "+35", description: "пунктов" },
      { metric: "Экономия", value: "$500K", description: "в год" },
    ],
    technologies: ["OpenAI GPT-4", "LangChain", "Python", "Kubernetes"],
  },
  {
    id: "saas-hr",
    title: "HR SaaS платформа",
    client: "HRTech Solutions",
    category: "SaaS",
    description: "Разработка SaaS платформы для автоматизации HR процессов с AI-рекрутингом",
    image: "/cases/saas.jpg",
    results: [
      { metric: "Клиенты", value: "200+", description: "компаний" },
      { metric: "MRR", value: "$150K", description: "выручка" },
      { metric: "Найм", value: "-40%", description: "время" },
    ],
    technologies: ["Next.js", "Supabase", "OpenAI", "Stripe"],
  },
] as const

export const testimonials = [
  {
    id: 1,
    name: "Александр Ким",
    position: "CEO",
    company: "AutoParts KZ",
    content: "PIZHAMA разработали для нас маркетплейс, который превзошел все ожидания. GMV вырос в 3 раза за первый год. Рекомендую как надежного технологического партнера.",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Мария Соколова",
    position: "COO",
    company: "FinanceHub",
    content: "CRM система от PIZHAMA полностью трансформировала наши продажи. Команда глубоко погрузилась в наши процессы и создала решение точно под наши нужды.",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Дмитрий Петров",
    position: "CTO",
    company: "TelecomPro",
    content: "AI-бот от PIZHAMA обрабатывает 78% обращений автоматически. Это не просто чат-бот, а полноценный виртуальный оператор с глубоким пониманием контекста.",
    avatar: "/avatars/avatar-3.jpg",
  },
] as const

export const stats = [
  { value: "150+", label: "Проектов реализовано" },
  { value: "50+", label: "Enterprise клиентов" },
  { value: "8 лет", label: "На рынке" },
  { value: "98%", label: "Клиентов довольны" },
] as const

export const faqItems = [
  {
    question: "Сколько стоит разработка сайта?",
    answer: "Стоимость зависит от сложности проекта. Лендинг от $3,000, корпоративный сайт от $8,000, интернет-магазин от $15,000, маркетплейс от $50,000. Для точной оценки оставьте заявку — мы подготовим детальное КП.",
  },
  {
    question: "Какие сроки разработки?",
    answer: "Лендинг: 2-4 недели. Корпоративный сайт: 4-8 недель. Интернет-магазин: 8-12 недель. CRM/ERP система: 3-6 месяцев. Маркетплейс: 4-8 месяцев. Точные сроки определяются после анализа требований.",
  },
  {
    question: "Работаете ли вы с зарубежными клиентами?",
    answer: "Да, мы работаем с клиентами из СНГ, Европы и США. Коммуникация на русском и английском языках. Принимаем оплату в разных валютах.",
  },
  {
    question: "Какие технологии используете?",
    answer: "Frontend: React, Next.js, TypeScript. Backend: Node.js, Python. Базы данных: PostgreSQL, MongoDB, Redis. AI: OpenAI, Anthropic, LangChain. Облако: AWS, Vercel, Kubernetes.",
  },
  {
    question: "Предоставляете ли поддержку после запуска?",
    answer: "Да, предоставляем SLA-поддержку с гарантированным временем реакции. Включает мониторинг, обновления безопасности, резервное копирование и техническую поддержку.",
  },
  {
    question: "Как происходит процесс разработки?",
    answer: "1. Брифинг и анализ требований. 2. Проектирование и прототипирование. 3. Дизайн. 4. Разработка итерациями (Agile/Scrum). 5. Тестирование. 6. Запуск и поддержка. Вы участвуете на каждом этапе.",
  },
] as const
