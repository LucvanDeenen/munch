<template>
  <v-container>

    <back-button></back-button>

    <v-section id="section-home">
      <home-section></home-section>
    </v-section>

    <v-section id="section-ingredients">
      <ingredient-section></ingredient-section>
    </v-section>

    <v-section id="section-menu">
      <meal-section></meal-section>
    </v-section>

    <v-section id="section-recipe">
      <recipe-section></recipe-section>
    </v-section>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HomeSection from '../components/HomeSection.vue';
import IngredientSection from '../components/IngredientSection.vue';
import MealSection from '../components/MealSection.vue';
import RecipeSection from '../components/RecipeSection.vue';
import BackButton from '../components/NavigationButton.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeSection,
    IngredientSection,
    MealSection,
    RecipeSection,
    BackButton
  }
});
</script>
