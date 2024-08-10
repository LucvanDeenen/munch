<template>
  <v-container>
    <h1>
      Meals
      <v-icon>
        mdi-silverware-variant
      </v-icon>
    </h1>

    <v-card class="my-5 pa-3">
      <div class="d-flex" id="header">
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="filter" placeholder="e.g. ''spaghetti''"></v-text-field>
        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
          <v-icon>
            mdi-view-headline
          </v-icon>
        </v-btn>
      </div>

      <h4>Found a total of {{ filteredRecipes.length }} Recipes! </h4>

      <v-divider class="mt-2 mx-0"></v-divider>

      <v-container class="overflow-y-auto px-2 py-3" id="content">
        <div v-for="(meal, key) in filteredRecipes" :key="key" class="mb-5">
          <h3>
            {{ meal.name }}
          </h3>
          <p>
            {{ meal.ingredients }}
          </p>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MealSection',
  props: {
    selectedIngredients: {
      type: Array,
      required: true
    }
  },
  
  data() {
    return {
      filter: '' as string,
      meals: [] as any[]
    }
  },

  computed: {
    filteredRecipes() {
      const filterLower = this.filter.toLowerCase();
      return this.meals.filter(recipe =>
        recipe.name.toLowerCase().includes(filterLower)
      );
    },
  },

  mounted() {
    this.fetchRecipes();
  },

  methods: {
    async fetchRecipes() {
      try {
        const response = await fetch('/recipes/recipes-en.json');
        const data = await response.json();
        this.meals = data;
      } catch (error) {
        console.error('Failed to load ingredients:', error);
      }
    }
  }
});
</script>