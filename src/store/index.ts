import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedIngredients: [] as any[],
    selectedMeal: {} as any
  },
  mutations: {
    setSelectedIngredients(state, ingredients) {
      state.selectedIngredients = ingredients;
    },
    setSelectedMeal(state, meal) {
      state.selectedMeal = meal;
    },
  },
  actions: {
    updateSelectedIngredients({ commit }, ingredients) {
      commit('setSelectedIngredients', ingredients);
    },
    updateSelectedMeal({ commit }, meal) {
      commit('setSelectedMeal', meal);
    },
  },
  getters: {
    getSelectedIngredients: (state) => state.selectedIngredients,
    getSelectedMeal: (state) => state.selectedMeal,
  },
  modules: {
  }
})
