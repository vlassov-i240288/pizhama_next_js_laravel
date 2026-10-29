import type { Landing, LandingGroup } from "./types"
import { crmLandings } from "./crm"
import { webLandings } from "./web"
import { chatbotLandings } from "./chatbots"

export type { Landing, LandingGroup }

export const landingGroups: LandingGroup[] = [
  {
    serviceId: "web-development",
    serviceTitle: "Разработка сайтов",
    eyebrow: "Разработка сайтов",
    sectionTitle: "Сайты для вашей ниши",
    sectionDescription:
      "Знаем, что продаёт в каждой нише: структуру, блоки и интеграции подбираем под ваш бизнес, а не под шаблон.",
    ctaLabel: "Обсудить сайт",
    modulesTitle: "Что будет на сайте",
    modulesDescription: "Набор разделов подбираем под задачи: можно стартовать с лендинга и расширяться до полноценного сайта.",
    integrationsTitle: "Интеграции",
    processTitle: "Как мы делаем сайт",
    process: [
      { step: "01", title: "Бриф и анализ", desc: "Изучаем бизнес, конкурентов и поисковые запросы вашей ниши" },
      { step: "02", title: "Прототип и дизайн", desc: "Собираем структуру и дизайн, согласуем до начала разработки" },
      { step: "03", title: "Разработка", desc: "Быстрый сайт на Next.js с адаптивом и админ-панелью" },
      { step: "04", title: "Запуск и SEO", desc: "Настраиваем аналитику, Вебмастер, Search Console и разметку" },
    ],
    contactTitle: "Обсудим ваш сайт",
    contactText:
      "Расскажите о бизнесе и задачах сайта, и мы предложим структуру, сроки и стоимость разработки.",
    otherTitle: "Сайты для других ниш",
    backLabel: "Все о разработке сайтов",
    landings: webLandings,
  },
  {
    serviceId: "crm-erp",
    serviceTitle: "CRM / ERP системы",
    eyebrow: "Разработка CRM",
    sectionTitle: "CRM для вашей отрасли",
    sectionDescription:
      "Готовые сценарии для типовых бизнесов: берём за основу проверенный набор модулей и дорабатываем под ваши процессы.",
    ctaLabel: "Обсудить CRM",
    modulesTitle: "Что будет в вашей CRM",
    modulesDescription: "Набор модулей подбираем под ваш бизнес: можно начать с одного и добавлять остальные по мере роста.",
    integrationsTitle: "Интеграции",
    processTitle: "Как мы внедряем CRM",
    process: [
      { step: "01", title: "Аудит процессов", desc: "Разбираем, как сейчас работает ваш бизнес и где теряются деньги" },
      { step: "02", title: "Прототип", desc: "Показываем интерфейс CRM до начала разработки и согласуем модули" },
      { step: "03", title: "Запуск по этапам", desc: "Сначала ключевой модуль, затем остальные: польза появляется сразу" },
      { step: "04", title: "Обучение и поддержка", desc: "Переносим данные, обучаем сотрудников и сопровождаем систему" },
    ],
    contactTitle: "Обсудим вашу CRM",
    contactText:
      "Расскажите, как сейчас устроена работа в вашей компании, и мы предложим набор модулей, сроки и стоимость внедрения.",
    otherTitle: "CRM для других отраслей",
    backLabel: "Все решения CRM / ERP",
    landings: crmLandings,
  },
  {
    serviceId: "ai-chatbots",
    serviceTitle: "AI чат-боты",
    eyebrow: "Чат-боты для бизнеса",
    sectionTitle: "Какой бот вам нужен",
    sectionDescription:
      "Подбираем канал и сценарии под ваших клиентов: от простого бота для записи до AI-консультанта по базе знаний.",
    ctaLabel: "Обсудить бота",
    modulesTitle: "Что умеет бот",
    modulesDescription: "Функции подбираем под ваши сценарии: начинаем с самых частых обращений и расширяем по мере роста.",
    integrationsTitle: "Каналы и интеграции",
    processTitle: "Как мы запускаем бота",
    process: [
      { step: "01", title: "Сценарии", desc: "Разбираем реальные обращения клиентов и выбираем, что автоматизировать" },
      { step: "02", title: "Прототип диалога", desc: "Показываем, как бот будет общаться, и согласуем тексты" },
      { step: "03", title: "Разработка и интеграции", desc: "Подключаем мессенджеры, CRM, оплату и расписание" },
      { step: "04", title: "Запуск и улучшение", desc: "Анализируем диалоги и дообучаем бота на реальных вопросах" },
    ],
    contactTitle: "Обсудим вашего бота",
    contactText:
      "Расскажите, какие вопросы чаще всего задают клиенты и где вы общаетесь с ними, и мы предложим сценарии, сроки и стоимость.",
    otherTitle: "Другие решения",
    backLabel: "Все о чат-ботах",
    landings: chatbotLandings,
  },
]

export function getLandingGroup(serviceId: string) {
  return landingGroups.find((group) => group.serviceId === serviceId)
}

export function getLanding(serviceId: string, landingId: string) {
  const group = getLandingGroup(serviceId)
  const landing = group?.landings.find((l) => l.id === landingId)
  return group && landing ? { group, landing } : undefined
}
