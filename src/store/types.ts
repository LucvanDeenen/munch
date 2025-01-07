export interface RootState {
  theme: ThemeState,
  meals: MealState
}

export interface ThemeState {
  current: string
}

export interface MealState {
  selectedIngredients: any[];
  selectedMeal: any;
}
