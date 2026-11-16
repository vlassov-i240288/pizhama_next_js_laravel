// Validates ad copy against Google Ads / Yandex Direct limits and writes the import files.
// Usage: node build.mjs
import { writeFileSync } from "node:fs"
import { aktobeCampaigns, aktobeNegativeKeywords, campaigns, negativeKeywords, SITE } from "./campaigns.mjs"

const GOOGLE_SUFFIX = "utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}"
const YANDEX_SUFFIX = "utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}&utm_term={keyword}"

// Each set becomes its own group of import files; fileSuffix keeps the Kazakhstan-wide files unchanged
const sets = [
  { title: "Казахстан", campaigns, negatives: negativeKeywords, fileSuffix: "" },
  { title: "Актобе", campaigns: aktobeCampaigns, negatives: aktobeNegativeKeywords, fileSuffix: "-aktobe" },
]

function validate(list) {
  const errors = []
  const check = (label, value, max) => {
    if (value.length > max) errors.push(`${label}: ${value.length}/${max} "${value}"`)
  }
  for (const campaign of list) {
    let sitelinkTitles = 0
    for (const link of campaign.yandexSitelinks) {
      check(`[${campaign.id}] sitelink title`, link.title, 30)
      check(`[${campaign.id}] sitelink desc`, link.desc, 60)
      sitelinkTitles += link.title.length
    }
    if (sitelinkTitles > 66) errors.push(`[${campaign.id}] sitelink titles total ${sitelinkTitles}/66`)
    for (const callout of campaign.yandexCallouts) check(`[${campaign.id}] callout`, callout, 25)

    for (const group of campaign.groups) {
      const g = group.google
      const y = group.yandex
      const tag = `[${group.id}]`
      if (g.headlines.length < 3 || g.headlines.length > 15) errors.push(`${tag} google needs 3-15 headlines`)
      if (g.descriptions.length < 2 || g.descriptions.length > 4) errors.push(`${tag} google needs 2-4 descriptions`)
      g.headlines.forEach((h) => check(`${tag} google headline`, h, 30))
      g.descriptions.forEach((d) => check(`${tag} google description`, d, 90))
      check(`${tag} google path1`, g.path1, 15)
      check(`${tag} google path2`, g.path2, 15)
      check(`${tag} yandex title1`, y.title1, 56)
      check(`${tag} yandex title2`, y.title2, 30)
      check(`${tag} yandex text`, y.text, 81)
      check(`${tag} yandex display path`, y.displayPath, 20)
      for (const text of [y.title1, y.title2, y.text]) {
        for (const word of text.split(/\s+/)) check(`${tag} yandex word`, word, 22)
      }
      for (const keyword of group.keywords) {
        if (keyword.split(/\s+/).length > 7) errors.push(`${tag} keyword over 7 words: "${keyword}"`)
      }
    }
  }
  return errors
}

const errors = sets.flatMap((set) => validate(set.campaigns))
if (errors.length > 0) {
  console.error(`Found ${errors.length} problem(s):\n` + errors.join("\n"))
  process.exit(1)
}

const csvCell = (value, sep) => {
  const text = String(value ?? "")
  return text.includes(sep) || text.includes('"') || text.includes("\n") ? `"${text.replace(/"/g, '""')}"` : text
}
const writeCsv = (file, header, rows, sep) => {
  const lines = [header, ...rows].map((row) => row.map((cell) => csvCell(cell, sep)).join(sep))
  // BOM so Excel and Google Ads Editor detect UTF-8 Cyrillic correctly
  writeFileSync(file, "﻿" + lines.join("\r\n") + "\r\n")
}

// Google Ads Editor: one file with campaign, ad group, keyword, negative and responsive search ad rows
const headlineCols = Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`)
const descriptionCols = Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`)
const googleHeader = [
  "Campaign", "Campaign Type", "Networks", "Budget", "Budget type", "Bid Strategy Type", "Languages",
  "Final URL suffix", "Ad Group", "Keyword", "Criterion Type", "Ad type", "Final URL", "Path 1", "Path 2",
  ...headlineCols, ...descriptionCols,
]
const googleRow = (fields) => googleHeader.map((col) => fields[col] ?? "")

function writeGoogle({ campaigns: list, negatives, fileSuffix }) {
  const rows = []
  for (const campaign of list) {
    rows.push(googleRow({
      Campaign: campaign.name, "Campaign Type": "Search", Networks: "Google search", Budget: campaign.dailyBudget,
      "Budget type": "Daily", "Bid Strategy Type": "Maximize clicks", Languages: "ru", "Final URL suffix": GOOGLE_SUFFIX,
    }))
    for (const keyword of negatives) {
      rows.push(googleRow({ Campaign: campaign.name, Keyword: keyword, "Criterion Type": "Campaign Negative Phrase" }))
    }
    for (const group of campaign.groups) {
      const g = group.google
      rows.push(googleRow({ Campaign: campaign.name, "Ad Group": group.name }))
      for (const keyword of group.keywords) {
        rows.push(googleRow({ Campaign: campaign.name, "Ad Group": group.name, Keyword: keyword, "Criterion Type": "Phrase" }))
      }
      const ad = {
        Campaign: campaign.name, "Ad Group": group.name, "Ad type": "Responsive search ad",
        "Final URL": SITE + group.path, "Path 1": g.path1, "Path 2": g.path2,
      }
      g.headlines.forEach((h, i) => { ad[headlineCols[i]] = h })
      g.descriptions.forEach((d, i) => { ad[descriptionCols[i]] = d })
      rows.push(googleRow(ad))
    }
  }
  writeCsv(`google-ads-editor${fileSuffix}.csv`, googleHeader, rows, ",")
}

// Yandex Direct: ads and keywords as separate tables (semicolon-separated for Excel) plus a sheet for manual setup
function writeYandex({ title, campaigns: list, negatives, fileSuffix }) {
  const ads = []
  const keywords = []
  for (const campaign of list) {
    for (const group of campaign.groups) {
      const y = group.yandex
      ads.push([campaign.name, group.name, y.title1, y.title2, y.text, `${SITE}${group.path}?${YANDEX_SUFFIX}`, y.displayPath])
      for (const keyword of group.keywords) keywords.push([campaign.name, group.name, keyword])
    }
  }
  writeCsv(`yandex-ads${fileSuffix}.csv`, ["Кампания", "Группа", "Заголовок 1", "Заголовок 2", "Текст", "Ссылка", "Отображаемая ссылка"], ads, ";")
  writeCsv(`yandex-keywords${fileSuffix}.csv`, ["Кампания", "Группа", "Ключевая фраза"], keywords, ";")

  const md = [`# Яндекс Директ: тексты для кампаний (${title})`, "", "Файл сгенерирован скриптом `build.mjs`, правьте `campaigns.mjs`.", ""]
  md.push("## Минус-слова (на все кампании)", "", "Вставьте списком в поле «Минус-фразы» кампании:", "", "```", ...negatives, "```", "")
  for (const campaign of list) {
    md.push(`## ${campaign.name}`, "", `Дневной бюджет на старт: ${campaign.dailyBudget} ₸`, "", "**Быстрые ссылки:**", "")
    for (const link of campaign.yandexSitelinks) md.push(`- ${link.title} — ${link.desc} — ${SITE}${link.path}`)
    md.push("", `**Уточнения:** ${campaign.yandexCallouts.join(" · ")}`, "")
    for (const group of campaign.groups) {
      const y = group.yandex
      md.push(`### ${group.name}`, "",
        `- Заголовок 1: ${y.title1}`, `- Заголовок 2: ${y.title2}`, `- Текст: ${y.text}`,
        `- Ссылка: ${SITE}${group.path}?${YANDEX_SUFFIX}`, `- Отображаемая ссылка: ${y.displayPath}`, "",
        "Ключевые фразы:", "", "```", ...group.keywords, "```", "")
    }
  }
  writeFileSync(`yandex-direct${fileSuffix}.md`, md.join("\n"))
}

for (const set of sets) {
  writeGoogle(set)
  writeYandex(set)
  const groupCount = set.campaigns.reduce((sum, c) => sum + c.groups.length, 0)
  const keywordCount = set.campaigns.reduce((sum, c) => sum + c.groups.reduce((s, g) => s + g.keywords.length, 0), 0)
  console.log(`OK ${set.title}: ${set.campaigns.length} campaigns, ${groupCount} ad groups, ${keywordCount} keywords`)
}
