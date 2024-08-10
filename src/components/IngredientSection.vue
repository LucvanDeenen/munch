<template>
  <v-container>
    <h1>
      Ingredients
      <v-icon class="mb-1 ml-4">
        mdi-shaker-outline
      </v-icon>
    </h1>

    <v-card class="my-5 pa-3">
      <div class="d-flex" id="header">
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="filter" placeholder="e.g. ''tomato''"></v-text-field>
        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
          <v-icon>
            mdi-view-headline
          </v-icon>
        </v-btn>
      </div>

      <v-divider class="mx-0"></v-divider>

      <v-container class="overflow-y-auto px-2 py-6" id="content">
        <div v-for="(ingredients, foodType) in groupedFilteredIngredients" :key="foodType" class="pb-2">
          <div class="d-flex justify-space-between">
            <h2>
              {{ foodType }}
            </h2>
            <v-icon class="expandable" @click=""> mdi-chevron-down </v-icon>
          </div>
          <v-divider class="mb-3"></v-divider>

          <v-expand-transition>
            <div v-show="true">
              <v-btn class="mr-1" v-for="ingredient in ingredients" :key="ingredient.id" @click="onSelect(ingredient)"
                :variant="selected.includes(ingredient) ? 'tonal' : 'outlined'">
                {{ ingredient.name }}
              </v-btn>
            </div>
          </v-expand-transition>
        </div>
      </v-container>
    </v-card>

    <v-btn block @click="scrollTo('section-menu')">let's cook!</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollTo } from '../utils/navigation';

export default defineComponent({
  name: 'IngredientSection',
  props: {
    selectedIngredients: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filter: '' as string,
      selected: [] as any[],
      ingredients: [] as any[]
    };
  },

  mounted() {
    this.fetchIngredients();
  },

  computed: {
    filteredIngredients() {
      const filterLower = this.filter.toLowerCase();
      return this.ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(filterLower) ||
        ingredient.type.toLowerCase().includes(filterLower)
      );
    },
    groupedFilteredIngredients() {
      return this.filteredIngredients.reduce((acc, ingredient) => {
        if (!acc[ingredient.type]) {
          acc[ingredient.type] = [];
        }
        acc[ingredient.type].push(ingredient);
        return acc;
      }, {});
    }
  },

  methods: {
    scrollTo,
    onSelect(ingredient: any) {
      const index = this.selected.indexOf(ingredient);
      if (index === -1) {
        this.selected.push(ingredient);
      } else {
        this.selected.splice(index, 1);
      }
    },

    // MOVE THIS TO A UTIL CLASS
    async fetchIngredients() {
      try {
        const response = await fetch('/ingredients/ingredients-en.json');
        const data = await response.json();
        this.ingredients = data;
      } catch (error) {
        console.error('Failed to load ingredients:', error);
      }
    }
  }
});
</script>

<style>
#content {
  max-height: 50vh;
}
</style>