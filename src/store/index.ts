import { createStore } from 'vuex'
import { RootState } from './types'

import theme from '@/store/modules/theme'
import meals from '@/store/modules/meals'
import navigation from '@/store/modules/navigation'

export default createStore<RootState>({
  modules: {
    theme,
    meals,
    navigation
  }
})