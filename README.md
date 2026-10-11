# Альфа / Хакатон

Минимальный стартер на React 19.3, TypeScript 7 и Vite 8 с `@alfalab/core-components@50.35.1`.
Полный UI-пакет установлен; используемые компоненты доступны через `@/components/ui`.
Исходный [репозиторий alfa-laboratory](https://github.com/alfa-laboratory/core-components) архивирован.
Актуальный исходный код находится в [core-ds/core-components](https://github.com/core-ds/core-components).

## Запуск

Нужен Node.js 24 и pnpm 12. Версии зависимостей зафиксированы в `pnpm-lock.yaml`.

```sh
pnpm install
pnpm dev
```

Откройте адрес из терминала, обычно `http://localhost:5173`.

| Команда             | Назначение                             |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Локальная разработка с HMR             |
| `pnpm build`        | Проверка TypeScript и сборка в `frontend/dist/` |
| `pnpm preview`      | Просмотр собранного приложения         |
| `pnpm types`        | Проверка типов                         |
| `pnpm lint`         | Проверка Oxlint                        |
| `pnpm test`         | Тесты интерфейса в Vitest и jsdom      |
| `pnpm format`       | Форматирование Oxfmt                   |
| `pnpm lint:fix`     | Исправление замечаний Oxlint           |
| `pnpm format:check` | Проверка форматирования                |
| `pnpm test:watch`   | Тесты в режиме наблюдения              |

## Что уже есть

Демо-форма с полями, выбором направления, чекбоксом и браузерной валидацией.
Предпросмотр в модальном окне, уведомление, вкладки и состояния загрузки.
Адаптивная страница, CSS-переменные, шрифтовой стек `--font-family-system` и тема `site` из библиотеки. Корпоративные файлы Styrene UI не входят в npm-пакет; страница использует системный шрифт, как базовые компоненты Core.
Данные хранятся в React state и исчезают после перезагрузки. Сервер, авторизация и API не подключены.

## Структура

Корень содержит pnpm workspace и общий lockfile. Весь фронтенд находится в `frontend/`.
Команды выше запускаются из корня; внутри `frontend/` доступны те же команды.

```text
alfa-hack/
  package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml
  frontend/
    package.json
    .oxfmtrc.json
    .oxlintrc.json
    index.html
    tsconfig.json
    vite.config.ts
    vitest.config.ts
    src/
      pages/
        App/
          App.tsx         # Стартовая страница и примеры UI
          App.module.css  # Стили страницы
          App.test.tsx    # Проверки формы, выбора, модалки и загрузки
        index.ts          # Публичные экспорты страниц
      components/
        ui/index.ts       # Реэкспорты компонентов Alfa Core
      test/setup.ts       # Недостающие браузерные API для jsdom
      main.tsx            # React root, переменные и тема
      index.css           # Глобальные стили и шрифт Alfa Core
```

Начните с `frontend/src/pages/App/App.tsx`. Страницы размещайте в `frontend/src/pages/`, экспортируйте через `pages/index.ts` и импортируйте через `@/pages`. Переиспользуемые компоненты размещайте в PascalCase-папках под `frontend/src/components/` и экспортируйте по умолчанию.
Импортируйте UI из `@/components/ui`. Добавляйте нужные реэкспорты в `frontend/src/components/ui/index.ts`, сохраняя пути `/modern`, чтобы Vite получал ES-модули.
Barrel содержит только реэкспорты; обертки над компонентами не требуются.

```tsx
import { Button, Input } from '@/components/ui'

<Button view="accent" size={48}>Продолжить</Button>
<Input label="Имя" name="name" block />
```

## Компоненты для следующих экранов

Все пути ниже начинаются с `@alfalab/core-components/`; добавляйте `/modern`.
Сверяйте пропсы с [официальным Storybook](https://core-ds.github.io/core-components/) и декларациями установленного пакета.

| Задача         | Компоненты и пути                                                              |
| -------------- | ------------------------------------------------------------------------------ |
| Действия       | `Button` → `button`, `IconButton` → `icon-button`                              |
| Формы          | `Input` → `input`, `Textarea` → `textarea`, `Select` → `select`                |
| Выбор          | `Checkbox` → `checkbox`, `Radio` → `radio`, `Switch` → `switch`                |
| Даты и суммы   | `CalendarInput` → `calendar-input`, `AmountInput` → `amount-input`             |
| Навигация      | `Tabs`, `Tab` → `tabs`, `Steps` → `steps`                                      |
| Окна           | `Modal` → `modal`, `Drawer` → `drawer`, `BottomSheet` → `bottom-sheet`         |
| Обратная связь | `Notification` → `notification`, `Plate` → `plate`, `Tooltip` → `tooltip`      |
| Загрузка       | `Skeleton` → `skeleton`, `Spinner` → `spinner`, `ProgressBar` → `progress-bar` |
| Контент        | `Typography` → `typography`, `Tag` → `tag`, `Table` → `table`                  |
| Файлы          | `Attach` → `attach`, `Dropzone` → `dropzone`                                   |

## Ограничения и соглашения

TypeScript работает в строгом режиме, без `skipLibCheck`. Конфиги Oxlint и Oxfmt взяты из `green-api-test`; добавлены исключения для сборки, покрытия и защищенного `AGENTS.md`. Отступы 2 пробела, одинарные кавычки, без точек с запятой и завершающих запятых.
Тесты называйте `*.test.tsx` рядом с компонентом. jsdom проверяет взаимодействия без CSS; визуальную проверку выполняйте в браузере. Не коммитьте секреты; переменные `VITE_*` доступны браузеру.
`pnpm-workspace.yaml` разрешает установочный скрипт esbuild и разрешает lightningcss и отключает необязательный скрипт core-js.

У транзитивных `react-popper` и `react-virtual` остаются предупреждения о peer dependencies на React 19.
Не отключайте проверку peer dependencies и не подменяйте React на 18. Проверяйте новые компоненты библиотеки перед использованием.
Поскольку установлен весь UI-пакет, установка включает зависимости компонентов, которых нет на демо-странице.
