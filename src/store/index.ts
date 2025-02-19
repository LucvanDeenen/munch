import { createStore } from 'vuex'
import { RootState } from './types'

import theme from '@/store/modules/theme'
import meals from '@/store/modules/meals'

export default createStore<RootState>({
  modules: {
    theme,
    meals
  }
})