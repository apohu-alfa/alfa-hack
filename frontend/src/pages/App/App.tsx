import {
  Button,
  Checkbox,
  Input,
  Modal,
  Notification,
  Select,
  Skeleton,
  Switch,
  Tab,
  Tabs,
  Textarea
} from '@/components/ui'
import { useState } from 'react'

import styles from './App.module.css'

const tracks = [
  { key: 'fintech', content: 'Финтех' },
  { key: 'analytics', content: 'Аналитика' },
  { key: 'services', content: 'Цифровые сервисы' }
]

const App = () => {
  const [tab, setTab] = useState<string | number>('project')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [track, setTrack] = useState('fintech')
  const [agreed, setAgreed] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const previewName = name.trim() || 'Ваш будущий проект'
  const previewEmail = email || 'Не указан'
  const previewTrack = tracks.find(({ key }) => key === track)?.content
  const previewDescription = description || 'Описание пока не добавлено'

  return (
    <div className={styles.appShell}>
      <a className={styles.skipLink} href="#main">
        К содержимому
      </a>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="#main" aria-label="Альфа, стартовый проект">
          <span className={styles.brandMark} aria-hidden="true">
            А
          </span>
          <span>Альфа / Хакатон</span>
        </a>
        <Button
          size={48}
          view="outlined"
          href="https://core-ds.github.io/core-components/"
          target="_blank"
          rel="noreferrer"
        >
          Документация UI
        </Button>
      </header>

      <main id="main" className={styles.mainContent}>
        <section className={styles.intro} aria-labelledby="intro-title">
          <p className={styles.eyebrow}>REACT 19 · TYPESCRIPT · CORE COMPONENTS</p>
          <h1 id="intro-title">От идеи к прототипу.</h1>
          <p className={styles.introDescription}>
            Готовая основа для хакатона. Начните с формы, используйте компоненты Альфы и добавляйте
            свой продукт.
          </p>
        </section>

        <div className={styles.workspace}>
          <section className={styles.panel} aria-label="Примеры компонентов">
            <Tabs selectedId={tab} onChange={(_, { selectedId }) => setTab(selectedId)}>
              <Tab id="project" title="Демо-форма">
                <form
                  className={`${styles.panelContent} ${styles.form}`}
                  onSubmit={event => {
                    event.preventDefault()
                    setPreviewOpen(true)
                  }}
                >
                  <div>
                    <h2>Ваш проект</h2>
                    <p className={styles.muted}>
                      Демо работает только в браузере. Данные никуда не отправляются.
                    </p>
                  </div>
                  <Input
                    id="project-name"
                    name="projectName"
                    label="Название проекта"
                    labelView="outer"
                    placeholder="Например, помощник для бизнеса"
                    block
                    required
                    pattern=".*\S.*"
                    maxLength={100}
                    value={name}
                    onChange={(_, { value }) => setName(value)}
                  />
                  <Input
                    id="email"
                    name="email"
                    label="Email команды"
                    labelView="outer"
                    type="email"
                    autoComplete="email"
                    placeholder="team@example.com"
                    block
                    required
                    value={email}
                    onChange={(_, { value }) => setEmail(value)}
                  />
                  <Select
                    id="track"
                    name="track"
                    label="Направление"
                    labelView="outer"
                    options={tracks}
                    selected={track}
                    block
                    onChange={({ selected }) => setTrack(selected?.key ?? 'fintech')}
                  />
                  <Textarea
                    id="description"
                    name="description"
                    aria-label="Коротко об идее"
                    autosize={false}
                    allowOverflow={false}
                    label="Коротко об идее"
                    labelView="outer"
                    placeholder="Какую проблему вы решаете?"
                    block
                    resize="vertical"
                    nativeScrollbar
                    maxLength={500}
                    showCounter
                    value={description}
                    onChange={(_, { value }) => setDescription(value)}
                  />
                  <Checkbox
                    name="demoConsent"
                    label="Понимаю, что это демонстрационная форма"
                    checked={agreed}
                    required
                    onChange={(_, { checked }) => setAgreed(checked)}
                  />
                  <Button type="submit" view="accent" size={48} block>
                    Посмотреть результат
                  </Button>
                </form>
              </Tab>
              <Tab id="components" title="UI-компоненты">
                <div className={`${styles.panelContent} ${styles.componentList}`}>
                  <div>
                    <h2>Базовые состояния</h2>
                    <p className={styles.muted}>Примеры прямых импортов из библиотеки.</p>
                  </div>
                  <div className={styles.buttonRow}>
                    <Button size={48} view="accent" onClick={() => setNotificationVisible(true)}>
                      Уведомление
                    </Button>
                    <Button size={48} view="outlined" onClick={() => setPreviewOpen(true)}>
                      Модальное окно
                    </Button>
                    <Button size={48} disabled>
                      Недоступно
                    </Button>
                  </div>
                  <Switch
                    label="Показать загрузку"
                    checked={loading}
                    onChange={(_, { checked }) => setLoading(checked)}
                  />
                  <div aria-busy={loading}>
                    <Skeleton visible={loading}>
                      <p className={styles.sampleContent}>
                        Здесь будет содержимое вашего продукта.
                      </p>
                    </Skeleton>
                  </div>
                  <Button size={48} loading={loading} disabled={loading}>
                    Пример кнопки загрузки
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </section>

          <aside className={styles.starterNotes} aria-labelledby="notes-title">
            <p className={styles.eyebrow}>БЫСТРЫЙ СТАРТ</p>
            <h2 id="notes-title">Можно начинать.</h2>
            <ul>
              <li>React 19 и строгий TypeScript</li>
              <li>Vite с быстрым обновлением страницы</li>
              <li>Компоненты и тема Alfa Core</li>
              <li>Oxlint, Oxfmt и тесты</li>
            </ul>
            <p className={styles.muted}>
              Редактируйте <code>frontend/src/pages/App/App.tsx</code>. Остальные компоненты
              доступны через отдельные импорты.
            </p>
            <pre>
              <code>{"import { Button } from\n  '@alfalab/core-components/button/modern';"}</code>
            </pre>
          </aside>
        </div>
      </main>

      <footer className={styles.siteFooter}>Стартовый проект команды · Демо без сервера</footer>

      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        hasCloser
        scrollLock
        wrapperProps={{ 'aria-labelledby': 'preview-title' }}
      >
        <Modal.Header title="Предпросмотр проекта" />
        <Modal.Content>
          <h2 id="preview-title">{previewName}</h2>
          <dl className={styles.projectSummary}>
            <dt>Email команды</dt>
            <dd>{previewEmail}</dd>
            <dt>Направление</dt>
            <dd>{previewTrack}</dd>
            <dt>Идея</dt>
            <dd>{previewDescription}</dd>
          </dl>
          <p className={styles.muted}>
            Это предпросмотр. После перезагрузки страницы данные исчезнут.
          </p>
        </Modal.Content>
        <Modal.Footer>
          <Button
            size={48}
            view="accent"
            block
            onClick={() => {
              setPreviewOpen(false)
              setNotificationVisible(true)
            }}
          >
            Завершить демо
          </Button>
        </Modal.Footer>
      </Modal>

      <Notification
        visible={notificationVisible}
        position="bottom"
        offset={24}
        onClose={() => setNotificationVisible(false)}
        onCloseTimeout={() => setNotificationVisible(false)}
      >
        Демо готово. Подключите API для сохранения проекта.
      </Notification>
    </div>
  )
}

export default App
