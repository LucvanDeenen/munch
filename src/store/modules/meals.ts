import { Module, Commit } from 'vuex';
import { MealState } from '../types';

const state: MealState = {
  selectedIngredients: [],
  selectedMeal: {},
};

const mutations = {
  setSelectedIngredients(state: MealState, ingredients: any[]) {
    state.selectedIngredients = ingredients;
  },
  setSelectedMeal(state: MealState, meal: any) {
    state.selectedMeal = meal;
  },
};

const actions = {
  updateSelectedIngredients({ commit }: { commit: Commit }, ingredients: any[]) {
    commit('setSelectedIngredients', ingredients);
  },
  updateSelectedMeal({ commit }: { commit: Commit }, meal: any) {
    commit('setSelectedMeal', meal);
  },
};

const getters = {
  getSelectedIngredients: (state: MealState) => state.selectedIngredients,
  getSelectedMeal: (state: MealState) => state.selectedMeal,
};

const mealStore: Module<MealState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default mealStore;
