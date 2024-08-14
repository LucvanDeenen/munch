<template>
  <v-container>
    <SectionHeader title="Recipe" icon="mdi-pot-steam" prev-section="section-menu" />

    <v-card class="pa-5" id="content">
      <h3 class="mb-2">{{ meal.name }}</h3>
      <i>
        {{ meal.description }}
      </i>

      <h3 class="mt-5">Ingredients</h3>
      <ul class="ml-5">
        <li v-for="ingredient in meal.ingredients">{{ ingredient }}</li>
      </ul>

      <h3 class="mt-5">Step by step</h3>
      <ol class="ml-5">
        <li v-for="step in meal.steps">{{ step }}</li>
      </ol>
    </v-card> 
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import SectionHeader from '@/components/Header.vue';

export default defineComponent({
  name: 'MenuSection',
  components: {
    SectionHeader
  },

  computed: {
    meal() {
      return this.getSelectedMeal();
    },
  },

  methods: {
    ...mapGetters(['getSelectedMeal']),
  }
});
</script>

<style scoped>
#content {
  max-height: 89vh;
  min-height: 75vh;
}
</style>