import { ActionTree, GetterTree, Module, MutationTree } from 'vuex/types/index.js'
import { RootState, NavigationState } from '../types'

export const SECTION_ORDER = ['section-home', 'section-ingredients', 'section-menu', 'section-recipe']

const mutations: MutationTree<NavigationState> = {
  SET_UNLOCKED_SECTION(state: NavigationState, sectionId: string) {
    state.unlockedSection = sectionId
  }
}

const actions: ActionTree<NavigationState, RootState> = {
  unlockSection({ commit, state }, sectionId: string) {
    if (SECTION_ORDER.indexOf(sectionId) > SECTION_ORDER.indexOf(state.unlockedSection)) {
      commit('SET_UNLOCKED_SECTION', sectionId)
    }
  }
}

const getters: GetterTree<NavigationState, RootState> = {
  isSectionUnlocked: (state: NavigationState) => (sectionId: string): boolean =>
    SECTION_ORDER.indexOf(sectionId) <= SECTION_ORDER.indexOf(state.unlockedSection)
}

const navigationModule: Module<NavigationState, RootState> = {
  namespaced: true,
  state: (): NavigationState => ({
    unlockedSection: SECTION_ORDER[0]
  }),
  mutations,
  actions,
  getters
}

export default navigationModule
