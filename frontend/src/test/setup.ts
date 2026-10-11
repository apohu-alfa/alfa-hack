import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(cleanup)

// jsdom has no pseudo-element layout; scrollbar checks use the element's computed styles.
const getComputedStyle = window.getComputedStyle.bind(window)
vi.spyOn(window, 'getComputedStyle').mockImplementation(element => getComputedStyle(element))

// jsdom does not implement browser layout APIs used by responsive components.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
)
