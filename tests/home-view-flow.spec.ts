import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

import HomeView from '@/views/HomeView.vue'
import { RootState } from '@/store/types'
import theme from '@/store/modules/theme'
import meals from '@/store/modules/meals'
import navigation from '@/store/modules/navigation'

const ingredientsFixture = [{ type: 'vegetable', name: 'tomato' }]
const recipesFixture = [
  { name: 'Tomato Soup', description: 'x', steps: [], ingredients: ['Tomato'] },
  { name: 'Plain Toast', description: 'x', steps: [], ingredients: ['Bread'] },
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn((url: string) => {
    const body = url.includes('ingredients') ? ingredientsFixture : recipesFixture
    return Promise.resolve({ json: () => Promise.resolve(body) } as Response)
  }))
  Element.prototype.scrollIntoView = vi.fn()
})

function mountApp() {
  const store = createStore<RootState>({ modules: { theme, meals, navigation } })
  const vuetify = createVuetify({ components: { ...components, ...labsComponents }, aliases: { VBtnLarge: components.VBtn, VSection: components.VContainer } })
  return mount(HomeView, { global: { plugins: [store, vuetify] } })
}

describe('HomeView step-gated navigation', () => {
  it('only shows meals/recipe sections after the user presses next', async () => {
    const wrapper = mountApp()
    await flushPromises()

    expect(wrapper.find('#section-ingredients').exists()).toBe(false)
    expect(wrapper.find('#section-menu').exists()).toBe(false)
    expect(wrapper.find('#section-recipe').exists()).toBe(false)

    await wrapper.find('button').trigger('click') // "What can I eat?"
    await flushPromises()
    expect(wrapper.find('#section-ingredients').exists()).toBe(true)
    expect(wrapper.find('#section-menu').exists()).toBe(false)

    const checkMealsBtn = wrapper.findAll('button').find(b => b.text().includes('Check meals'))
    expect(checkMealsBtn).toBeTruthy()
    await checkMealsBtn!.trigger('click')
    await flushPromises()
    expect(wrapper.find('#section-menu').exists()).toBe(true)
    expect(wrapper.find('#section-recipe').exists()).toBe(false)
    expect(wrapper.text()).toContain('Showing all 2 recipes')

    const cookBtn = wrapper.findAll('button').find(b => b.text().includes("let's cook"))
    expect(cookBtn!.attributes('disabled')).toBeDefined()

    const recipeCard = wrapper.findAll('.v-card').find(c => c.text().includes('Tomato Soup'))
    await recipeCard!.trigger('click')
    await flushPromises()
    expect(cookBtn!.attributes('disabled')).toBeUndefined()

    await cookBtn!.trigger('click')
    await flushPromises()
    expect(wrapper.find('#section-recipe').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tomato Soup')
  })

  it('lets a chapter\'s next-link jump forward without the bottom CTA', async () => {
    const wrapper = mountApp()
    await flushPromises()
    await wrapper.find('button').trigger('click')
    await flushPromises()

    const nextLinks = wrapper.findAll('button.v-btn--icon')
    expect(nextLinks.length).toBeGreaterThan(0)
    await nextLinks[0].trigger('click')
    await flushPromises()
    expect(wrapper.find('#section-menu').exists()).toBe(true)
  })
})
