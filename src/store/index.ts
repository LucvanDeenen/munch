import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedIngredients: [] as any[],
  },
  mutations: {
    setSelectedIngredients(state, ingredients) {
      state.selectedIngredients = ingredients;
    },
  },
  actions: {
    updateSelectedIngredients({ commit }, ingredients) {
      commit('setSelectedIngredients', ingredients);
    },
  },
  getters: {
    getSelectedIngredients: (state) => state.selectedIngredients,
  },
  modules: {
  }
})
