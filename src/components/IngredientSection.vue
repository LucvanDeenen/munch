<template>
  <v-container>
    <h1>
      Ingredients
      <v-icon class="mb-3">
        mdi-chef-hat
      </v-icon>
    </h1>

    <v-card class="my-5 pa-3">
      <div class="d-flex">
        <v-text-field prepend-inner-icon="mdi-magnify" v-model="filter" placeholder="e.g. ''tomato''"></v-text-field>
        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
          <v-icon>
            mdi-view-headline
          </v-icon>
        </v-btn>
      </div>

      <v-divider class="mx-0"></v-divider>
      <v-container class="overflow-y-auto pa-4 options">
        <div v-for="(ingredients, foodType) in groupedFilteredIngredients" :key="foodType" class="pb-2">
          <div class="d-flex justify-space-between">
            <h2>
              {{ foodType }}
            </h2>
            <v-icon class="expandable" @click="collapse"> mdi-chevron-down </v-icon>
          </div>

          <v-divider class="mb-3"></v-divider>

          <v-expand-transition>
            <div v-show="collapse">
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
  data() {
    return {
      filter: '' as string,
      selected: [] as any[],
      ingredients: [
        {
          "type": "vegetable",
          "name": "carrot"
        },
        {
          "type": "vegetable",
          "name": "broccoli"
        },
        {
          "type": "vegetable",
          "name": "spinach"
        },
        {
          "type": "vegetable",
          "name": "potato"
        },
        {
          "type": "vegetable",
          "name": "tomato"
        },
        {
          "type": "vegetable",
          "name": "onion"
        },
        {
          "type": "vegetable",
          "name": "bell pepper"
        },
        {
          "type": "vegetable",
          "name": "garlic"
        },
        {
          "type": "vegetable",
          "name": "zucchini"
        },
        {
          "type": "vegetable",
          "name": "eggplant"
        },
        {
          "type": "fruit",
          "name": "apple"
        },
        {
          "type": "fruit",
          "name": "banana"
        },
        {
          "type": "fruit",
          "name": "orange"
        },
        {
          "type": "fruit",
          "name": "strawberry"
        },
        {
          "type": "fruit",
          "name": "grape"
        },
        {
          "type": "fruit",
          "name": "lemon"
        },
        {
          "type": "fruit",
          "name": "pineapple"
        },
        {
          "type": "fruit",
          "name": "blueberry"
        },
        {
          "type": "fruit",
          "name": "mango"
        },
        {
          "type": "fruit",
          "name": "peach"
        },
        {
          "type": "meat",
          "name": "chicken breast"
        },
        {
          "type": "meat",
          "name": "beef steak"
        },
        {
          "type": "meat",
          "name": "pork chop"
        },
        {
          "type": "meat",
          "name": "lamb"
        },
        {
          "type": "meat",
          "name": "bacon"
        },
        {
          "type": "meat",
          "name": "turkey"
        },
        {
          "type": "meat",
          "name": "sausage"
        },
        {
          "type": "meat",
          "name": "ham"
        },
        {
          "type": "meat",
          "name": "duck"
        },
        {
          "type": "seafood",
          "name": "salmon"
        },
        {
          "type": "seafood",
          "name": "shrimp"
        },
        {
          "type": "seafood",
          "name": "tuna"
        },
        {
          "type": "seafood",
          "name": "crab"
        },
        {
          "type": "seafood",
          "name": "lobster"
        },
        {
          "type": "seafood",
          "name": "mussels"
        },
        {
          "type": "seafood",
          "name": "oysters"
        },
        {
          "type": "seafood",
          "name": "scallops"
        },
        {
          "type": "seafood",
          "name": "cod"
        },
        {
          "type": "dairy",
          "name": "milk"
        },
        {
          "type": "dairy",
          "name": "cheddar cheese"
        },
        {
          "type": "dairy",
          "name": "butter"
        },
        {
          "type": "dairy",
          "name": "yogurt"
        },
        {
          "type": "dairy",
          "name": "cream"
        },
        {
          "type": "dairy",
          "name": "parmesan cheese"
        },
        {
          "type": "dairy",
          "name": "mozzarella"
        },
        {
          "type": "dairy",
          "name": "sour cream"
        },
        {
          "type": "dairy",
          "name": "ice cream"
        },
        {
          "type": "grain",
          "name": "rice"
        },
        {
          "type": "grain",
          "name": "pasta"
        },
        {
          "type": "grain",
          "name": "bread"
        },
        {
          "type": "grain",
          "name": "quinoa"
        },
        {
          "type": "grain",
          "name": "oats"
        },
        {
          "type": "grain",
          "name": "barley"
        },
        {
          "type": "grain",
          "name": "cornmeal"
        },
        {
          "type": "grain",
          "name": "bulgur"
        },
        {
          "type": "grain",
          "name": "couscous"
        },
        {
          "type": "spice",
          "name": "salt"
        },
        {
          "type": "spice",
          "name": "black pepper"
        },
        {
          "type": "spice",
          "name": "cinnamon"
        },
        {
          "type": "spice",
          "name": "cumin"
        },
        {
          "type": "spice",
          "name": "turmeric"
        },
        {
          "type": "spice",
          "name": "paprika"
        },
        {
          "type": "spice",
          "name": "nutmeg"
        },
        {
          "type": "spice",
          "name": "oregano"
        },
        {
          "type": "spice",
          "name": "thyme"
        },
        {
          "type": "spice",
          "name": "ginger"
        },
        {
          "type": "spice",
          "name": "basil"
        },
        {
          "type": "condiment",
          "name": "ketchup"
        },
        {
          "type": "condiment",
          "name": "mustard"
        },
        {
          "type": "condiment",
          "name": "soy sauce"
        },
        {
          "type": "condiment",
          "name": "mayonnaise"
        },
        {
          "type": "condiment",
          "name": "vinegar"
        },
        {
          "type": "condiment",
          "name": "hot sauce"
        },
        {
          "type": "condiment",
          "name": "honey"
        },
        {
          "type": "condiment",
          "name": "barbecue sauce"
        },
        {
          "type": "condiment",
          "name": "pesto"
        },
        {
          "type": "condiment",
          "name": "soy sauce"
        },
        {
          "type": "nut",
          "name": "almond"
        },
        {
          "type": "nut",
          "name": "peanut"
        },
        {
          "type": "nut",
          "name": "walnut"
        },
        {
          "type": "nut",
          "name": "cashew"
        },
        {
          "type": "nut",
          "name": "pecan"
        },
        {
          "type": "nut",
          "name": "hazelnut"
        },
        {
          "type": "nut",
          "name": "pistachio"
        },
        {
          "type": "nut",
          "name": "macadamia"
        },
        {
          "type": "beverage",
          "name": "water"
        },
        {
          "type": "beverage",
          "name": "coffee"
        },
        {
          "type": "beverage",
          "name": "tea"
        },
        {
          "type": "beverage",
          "name": "orange juice"
        },
        {
          "type": "beverage",
          "name": "wine"
        },
        {
          "type": "beverage",
          "name": "beer"
        },
        {
          "type": "beverage",
          "name": "soda"
        },
        {
          "type": "beverage",
          "name": "milkshake"
        },
        {
          "type": "beverage",
          "name": "smoothie"
        },
        {
          "type": "herb",
          "name": "cilantro"
        },
        {
          "type": "herb",
          "name": "parsley"
        },
        {
          "type": "herb",
          "name": "mint"
        },
        {
          "type": "herb",
          "name": "rosemary"
        },
        {
          "type": "herb",
          "name": "dill"
        },
        {
          "type": "herb",
          "name": "sage"
        },
        {
          "type": "herb",
          "name": "chives"
        },
        {
          "type": "herb",
          "name": "tarragon"
        },
        {
          "type": "herb",
          "name": "oregano"
        }
      ] as any[]
    };
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

    collapse() {

    }
  }
});
</script>

<style>
.options {
  max-height: 50vh;
}
</style>