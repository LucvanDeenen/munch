/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#1A1423',
          accent: '#A49694',
          primary: '#5DD39E',
          hover: '#3A8965',
          secondary: '#348AA7',
          secondaryHover: '#2D738A',
          error: '#CF6679',
          success: '#3A8965',
          warning: '#BCE784',
        }
      }
    },
  },

  aliases: {
    VBtnLarge: components.VBtn,
    VBtnSecondary: components.VBtn,
    VBtnTertiary: components.VBtn,
  },

  defaults: {
    VBtn: {
      style: 'margin-bottom: 0.5rem;',
      color: 'primary',
      variant: 'outlined',
    },
    VBtnLarge: {
      style: 'margin-bottom: 0.5rem;',
      color: 'primary',
      size: 'x-large',
      variant: 'outlined',
    },
    VBtnSecondary: {
      color: 'secondary',
      variant: 'flat',
    },
    VBtnTertiary: {
      rounded: true,
      variant: 'plain',
    },
  },
})
