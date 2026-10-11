import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('Hackathon starter', () => {
  it('blocks submission of an empty form', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Посмотреть результат' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('previews entered data and completes the demo', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('textbox', { name: 'Название проекта' }), 'Альфа помощник')
    await user.type(screen.getByRole('textbox', { name: 'Email команды' }), 'team@example.com')
    await user.type(
      screen.getByRole('textbox', { name: 'Коротко об идее' }),
      'Помогаем малому бизнесу'
    )
    await user.click(screen.getByText('Финтех'))
    await user.click(await screen.findByRole('option', { name: 'Аналитика' }))
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Посмотреть результат' }))
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: 'Альфа помощник' })).toBeTruthy()
    expect(within(dialog).getByText('team@example.com')).toBeTruthy()
    expect(within(dialog).getByText('Помогаем малому бизнесу')).toBeTruthy()
    expect(within(dialog).getByText('Аналитика')).toBeTruthy()
    await user.click(within(dialog).getByRole('button', { name: 'Завершить демо' }))
    expect(await screen.findByRole('alert')).toBeTruthy()
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })

  it('switches tabs and loading state, and closes a modal with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: 'UI-компоненты' }))
    await user.click(screen.getByRole('checkbox', { name: 'Показать загрузку' }))
    expect(
      screen.getByRole('button', { name: 'Пример кнопки загрузки' }).hasAttribute('disabled')
    ).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Модальное окно' }))
    expect(await screen.findByRole('dialog')).toBeTruthy()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  })
})
