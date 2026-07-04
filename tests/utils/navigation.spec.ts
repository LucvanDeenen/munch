import { describe, it, expect, vi } from 'vitest'
import { scrollTo } from '@/utils/navigation'

describe('scrollTo', () => {
  it('scrolls the matching element into view', () => {
    const section = document.createElement('div')
    section.id = 'section-home'
    section.scrollIntoView = vi.fn()
    document.body.appendChild(section)

    scrollTo('section-home')

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('does nothing when the element does not exist', () => {
    expect(() => scrollTo('missing-section')).not.toThrow()
  })
})
