<template>
  <v-container>

    <v-section id="section-home">
      <home-section></home-section>
    </v-section>

    <v-section v-if="isIngredientsUnlocked" id="section-ingredients">
      <ingredient-section></ingredient-section>
    </v-section>

    <v-section v-if="isMealsUnlocked" id="section-menu">
      <meal-section></meal-section>
    </v-section>

    <v-section v-if="isRecipeUnlocked" id="section-recipe">
      <recipe-section></recipe-section>
    </v-section>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import HomeSection from '@/components/sections/HomeSection.vue';
import IngredientSection from '@/components/sections/IngredientSection.vue';
import MealSection from '@/components/sections/MealSection.vue';
import RecipeSection from '@/components/sections/RecipeSection.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeSection,
    IngredientSection,
    MealSection,
    RecipeSection
  },
  computed: {
    isIngredientsUnlocked(): boolean {
      return this.isSectionUnlocked('section-ingredients');
    },
    isMealsUnlocked(): boolean {
      return this.isSectionUnlocked('section-menu');
    },
    isRecipeUnlocked(): boolean {
      return this.isSectionUnlocked('section-recipe');
    }
  },
  methods: {
    ...mapGetters('navigation', ['isSectionUnlocked'])
  }
});
</script>