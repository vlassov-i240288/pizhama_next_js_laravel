import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности и обработки персональных данных PIZHAMA",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Дата последнего обновления: 1 января 2024 года
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground mb-4">
                Настоящая Политика конфиденциальности определяет порядок обработки 
                и защиты персональных данных пользователей сайта {siteConfig.name} 
                (далее — &quot;Сайт&quot;).
              </p>
              <p className="text-muted-foreground">
                Использование Сайта означает согласие пользователя с настоящей 
                Политикой конфиденциальности.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Собираемые данные</h2>
              <p className="text-muted-foreground mb-4">
                Мы можем собирать следующие персональные данные:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Имя и фамилия</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Название компании</li>
                <li>Информация о проекте (при заполнении форм)</li>
                <li>Техническая информация (IP-адрес, тип браузера, cookies)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Цели обработки данных</h2>
              <p className="text-muted-foreground mb-4">
                Персональные данные обрабатываются в следующих целях:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Обработка заявок и запросов пользователей</li>
                <li>Связь с пользователями по вопросам сотрудничества</li>
                <li>Отправка информационных материалов (при согласии)</li>
                <li>Улучшение качества услуг и работы Сайта</li>
                <li>Аналитика и статистика использования Сайта</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Защита данных</h2>
              <p className="text-muted-foreground mb-4">
                Мы принимаем необходимые организационные и технические меры для защиты 
                персональных данных от несанкционированного доступа, изменения, 
                раскрытия или уничтожения.
              </p>
              <p className="text-muted-foreground">
                Доступ к персональным данным имеют только уполномоченные сотрудники, 
                которые обязаны соблюдать конфиденциальность.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Сайт использует cookies для обеспечения корректной работы и 
                улучшения пользовательского опыта. Вы можете отключить cookies 
                в настройках браузера, однако это может повлиять на 
                функциональность Сайта.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Права пользователей</h2>
              <p className="text-muted-foreground mb-4">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Запросить информацию о хранимых персональных данных</li>
                <li>Потребовать исправления неточных данных</li>
                <li>Потребовать удаления персональных данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Контакты</h2>
              <p className="text-muted-foreground">
                По вопросам, связанным с обработкой персональных данных, 
                вы можете связаться с нами по адресу:{" "}
                <a href={`mailto:${siteConfig.links.email}`} className="text-primary hover:underline">
                  {siteConfig.links.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
