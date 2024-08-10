<template>
  <v-container>

    <back-button></back-button>

    <v-section id="section-home">
      <home-section></home-section>
    </v-section>

    <v-divider class="mx-12"></v-divider>

    <v-section id="section-ingredients">
      <ingredient-section></ingredient-section>
    </v-section>

    <v-divider class="mx-12"></v-divider>

    <v-section id="section-menu">
      <menu-section></menu-section>
    </v-section>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HomeSection from '../components/HomeSection.vue';
import IngredientSection from '../components/IngredientSection.vue';
import MenuSection from '../components/MenuSection.vue';
import BackButton from '../components/NavigationButton.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeSection,
    IngredientSection,
    MenuSection,
    BackButton
  }
});
</script>
