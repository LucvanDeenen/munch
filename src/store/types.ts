export interface RootState {
  theme: ThemeState,
  meals: MealState,
  navigation: NavigationState
}

export interface ThemeState {
  current: string
}

export interface NavigationState {
  unlockedSection: string
}

export interface MealState {
  selectedIngredients: any[];
  selectedMeal: any;
}
