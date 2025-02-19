<template>
  <v-container>
    <SectionHeader title="Meals" icon="mdi-silverware-variant" prev-section="section-ingredients" />

    <v-card class="mb-5 pa-3" id="content">

      <div class="d-flex" id="header">
        <v-text-field append-inner-icon="mdi-magnify" v-model="filter" placeholder='Search here...'></v-text-field>
        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
          <v-icon>
            mdi-cog
          </v-icon>
        </v-btn>
      </div>

      <h4>Found a total of {{ recipes.length }} Recipes for your ingredients! </h4>

      <v-divider class="mt-2 mx-0"></v-divider>

      <v-container class="overflow-y-auto px-2 py-3" id="content">
        <v-card v-for="(meal, key) in filteredRecipes" :key="key" class="mb-5 pa-3 border"
          :class="recipe === meal ? 'bg-secondary' : ''" @click="selectRecipe(meal)">
          <h3>
            {{ meal.name }}
          </h3>
          <v-chip v-for="(ingredient, index) in meal.ingredients" :key="index"
            :class="{ 'text-primary': isIngredientSelected(ingredient) }" class="mt-1">
            {{ ingredient }}
          </v-chip>
        </v-card>
      </v-container>

    </v-card>
    <v-btn block :disabled="recipe == undefined" @click="setupMeal">let's cook!</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { scrollTo } from '@/utils/navigation';

import SectionHeader from '@/components/layout/Header.vue';

export default defineComponent({
  name: 'MealSection',
  data() {
    return {
      filter: '' as string,
      recipe: undefined as any,
      meals: [] as any[],
    }
  },

  components: {
    SectionHeader
  },

  computed: {
    ingredients() {
      return this.getSelectedIngredients() ? this.getSelectedIngredients() : [];
    },
    recipes() {
      const uniqueIngredientNames = Array.from(new Set(this.ingredients.map((ingredient: any) => ingredient.name.toLowerCase())));

      return this.meals.filter((recipe: any) => {
        const recipeIngredients = recipe.ingredients.map((ingredient: any) => ingredient.toLowerCase());
        return recipeIngredients.some((ingredient: any) => uniqueIngredientNames.includes(ingredient));
      });
    },
    filteredRecipes() {
      const filterLower = this.filter.toLowerCase();
      return this.recipes.filter((recipe: any) =>
        recipe.name.toLowerCase().includes(filterLower)
      ).sort();
    },
  },

  mounted() {
    this.fetchRecipes();
  },

  methods: {
    ...mapActions('meals', ['updateSelectedMeal']),
    ...mapGetters('meals', ['getSelectedIngredients']),
    scrollTo,
    setupMeal() {
      scrollTo('section-recipe');
      this.updateSelectedMeal(this.recipe);
    },
    isIngredientSelected(ingredient: string): boolean {
      return this.ingredients.some((item: any) => item.name === ingredient.toLowerCase());
    },
    selectRecipe(meal: any) {
      if (this.recipe === meal) {
        this.recipe = undefined;
      } else {
        this.recipe = meal;
      }
    },
    async fetchRecipes() {
      try {
        const response = await fetch('/recipes/recipes-en.json');
        const data = await response.json();
        console.log(this.response);
        this.meals = data;
      } catch (error) {
        console.error('Failed to load ingredients:', error);
      }
    }
  }
});
</script>

<style scoped>
#content {
  max-height: 75vh;
  min-height: 75vh;
}
</style>