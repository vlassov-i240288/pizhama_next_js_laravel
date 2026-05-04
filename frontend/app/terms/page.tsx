import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Пользовательское соглашение и условия использования сайта PIZHAMA",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Пользовательское соглашение</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              Дата последнего обновления: 1 января 2024 года
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground mb-4">
                Настоящее Пользовательское соглашение (далее — &quot;Соглашение&quot;) регулирует 
                отношения между {siteConfig.name} (далее — &quot;Компания&quot;) и пользователем 
                сайта (далее — &quot;Пользователь&quot;).
              </p>
              <p className="text-muted-foreground">
                Использование сайта означает полное и безоговорочное согласие 
                Пользователя с настоящим Соглашением.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Предмет соглашения</h2>
              <p className="text-muted-foreground mb-4">
                Компания предоставляет Пользователю доступ к информации о своих услугах, 
                включая, но не ограничиваясь:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Разработка веб-сайтов и приложений</li>
                <li>Разработка CRM/ERP систем</li>
                <li>Внедрение AI решений</li>
                <li>Консультационные услуги</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Права и обязанности сторон</h2>
              <h3 className="text-xl font-medium mb-3">3.1. Компания обязуется:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Предоставлять актуальную информацию о своих услугах</li>
                <li>Обеспечивать конфиденциальность персональных данных</li>
                <li>Рассматривать заявки Пользователей в разумные сроки</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3">3.2. Пользователь обязуется:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Предоставлять достоверную информацию при заполнении форм</li>
                <li>Не использовать сайт в незаконных целях</li>
                <li>Соблюдать авторские права на материалы сайта</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Интеллектуальная собственность</h2>
              <p className="text-muted-foreground mb-4">
                Все материалы, размещенные на сайте (тексты, изображения, логотипы, 
                программный код), являются интеллектуальной собственностью Компании 
                и защищены законодательством об авторском праве.
              </p>
              <p className="text-muted-foreground">
                Копирование, распространение или использование материалов сайта 
                без письменного согласия Компании запрещено.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Ограничение ответственности</h2>
              <p className="text-muted-foreground mb-4">
                Компания не несет ответственности за:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Временную недоступность сайта по техническим причинам</li>
                <li>Действия третьих лиц</li>
                <li>Убытки, связанные с использованием или невозможностью использования сайта</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Порядок разрешения споров</h2>
              <p className="text-muted-foreground mb-4">
                Все споры между Компанией и Пользователем разрешаются путем переговоров. 
                При невозможности достичь согласия споры разрешаются в соответствии 
                с законодательством Республики Казахстан.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Изменение соглашения</h2>
              <p className="text-muted-foreground mb-4">
                Компания вправе в одностороннем порядке изменять настоящее Соглашение. 
                Изменения вступают в силу с момента их публикации на сайте.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Контакты</h2>
              <p className="text-muted-foreground">
                По вопросам, связанным с настоящим Соглашением, 
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
