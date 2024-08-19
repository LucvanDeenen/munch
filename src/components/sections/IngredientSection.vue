<template>
  <v-container>
    <SectionHeader title="Ingredients" icon="mdi-shaker-outline" prev-section="section-home" />

    <v-card class="mb-5 pa-3" id="content">
      <div id="header" class="d-flex mb-2">
        <v-text-field append-inner-icon="mdi-magnify" v-model="filter" placeholder="Search here..."
          :hint="handleToolTip()" @keydown.enter="selectFilteredIngredient" @keydown.tab="updateFilterIndex" />

        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
          <v-icon>
            <!-- MENU OPTIONS -->
            <!-- 1. TOGGLE SPICES / DEFAULTS -->
            <!-- 2. TOGGLE DRINKS -->
            <!-- 3. TOGGLE FRUITS -->
            <!-- 4. TOGGLE COMPACT MODE (show selected in larger view) -->
            <!-- 5. TOGGLE TYPES (show selected in larger view) -->
            <!-- 6. AUTO-COLLAPSE (collapse all types) -->
            mdi-cog
          </v-icon>
        </v-btn>
      </div>


      <div id="menu" class="mb-4 d-flex" :style="{ width: '100%', maxHeight: '49px', height: '49px', overflow: 'auto' }">
        <v-chip class="ma-1" :style="{ minWidth: 'fit-content' }" @click:close="onSelect(ingredient)" closable v-for="(ingredient, key) in selected"
          :key="key">
          {{ ingredient.name }}
        </v-chip>
      </div>

      <v-divider></v-divider>


      <v-container id="content" class="overflow-y-auto px-2 py-5">
        <div v-for="(ingredients, foodType) in groupedFilteredIngredients" :key="foodType" class="pb-2">
          <div class="d-flex justify-space-between" @click="onCollapse(foodType.toString())">
            <h2>
              {{ foodType }}
            </h2>
            <v-icon class="transition-transform" :class="{ 'rotate': collapse.includes(foodType.toString()) }">
              mdi-chevron-down
            </v-icon>
          </div>

          <v-divider class="mb-3"></v-divider>

          <!-- REPLACE WITH PLAIN CSS -->
          <v-expand-transition>
            <div v-show="!collapse.includes(foodType.toString())">
              <v-btn class="mr-1" v-for="ingredient in ingredients" :key="ingredient.id" @click="onSelect(ingredient)"
                :variant="selected.includes(ingredient) ? 'tonal' : 'outlined'">
                {{ ingredient.name }}
              </v-btn>
            </div>
          </v-expand-transition>
        </div>
      </v-container>
    </v-card>

    <v-btn block @click="scrollTo('section-menu')">Check meals!</v-btn>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { scrollTo } from '@/utils/navigation';

import SectionHeader from '@/components/Header.vue';

export default defineComponent({
  name: 'IngredientSection',
  data() {
    return {
      filter: '' as string,
      filterIndex: 0 as number,
      selected: [] as any[],
      collapse: [] as string[],
      ingredients: [] as any[]
    };
  },

  components: {
    SectionHeader
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
    },
    uniqueIngredientNames() {
      const namesSet = new Set(this.ingredients.map(ingredient => ingredient.name));
      return Array.from(namesSet);
    },
    uniqueIngredientFilter() {
      this.filterIndex = 0;
      const filterLower = this.filter.toLowerCase();
      return this.uniqueIngredientNames.filter(ingredient =>
        ingredient.toLowerCase().includes(filterLower)
      );
    }
  },

  methods: {
    ...mapActions(['updateSelectedIngredients']),
    scrollTo,
    onSelect(ingredient: any): void {
      const index = this.selected.indexOf(ingredient);
      if (index === -1) {
        this.selected.push(ingredient);
      } else {
        this.selected.splice(index, 1);
      }
      this.updateSelectedIngredients(this.selected);
    },

    onCollapse(type: string) {
      const index = this.collapse.indexOf(type);
      if (index === -1) {
        this.collapse.push(type);
      } else {
        this.collapse.splice(index, 1);
      }
    },

    handleToolTip(): string {
      if (this.filter.length === 0) {
        return 'Tip: use tab to cycle through the options!';
      }

      if (this.uniqueIngredientFilter[this.filterIndex] === undefined) {
        return 'Oops no matching ingredients found!';
      }

      if (this.uniqueIngredientFilter.length === 1) {
        return `You must be looking for ${this.uniqueIngredientFilter[0]}!`;
      }

      return `Are you looking for ${this.uniqueIngredientFilter[this.filterIndex]}?`;
    },

    selectFilteredIngredient() {
      const firstIngredient = this.uniqueIngredientFilter[this.filterIndex];
      if (firstIngredient) {
        const ingredient = this.ingredients.find(i => i.name.toLowerCase() === firstIngredient.toLowerCase());
        if (ingredient && !this.selected.includes(ingredient)) {
          this.onSelect(ingredient);
        }
        this.filter = '';
      }
    },

    updateFilterIndex(event: Event) {
      event.preventDefault();
      if (this.uniqueIngredientFilter.length === this.filterIndex + 1) {
        this.filterIndex = 0;
      } else {
        this.filterIndex++
      }
    },

    // MOVE THIS TO A UTIL CLASS LATER
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

<style scoped>
#content {
  max-height: 75vh;
  min-height: 75vh;
}

.rotate {
  transform: rotate(180deg);
}

.transition-transform {
  transition: transform 0.3s ease;
}
</style>