<template>
  <v-container fluid :style="{ height: 'auto', width: '100vw' }">

    <!-- Top -->
    <transition name="fade">
      <v-btn v-if="showScrollButton" fab dark color="primary" class="floating-btn" icon variant="tonal"
        @click="scrollToSection('section-home')">
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>
    </transition>

    <!-- Home Section -->
    <v-container id="section-home" class="d-flex justify-center align-center" :style="{ height: '100vh' }">
      <div>
        <h1>munch</h1>

        <!-- Plan voor wat je kan eten? -> kies ingredienten voor een weeklijst te maken bijv? -->
        <v-btn-large @click="scrollToSection('section-ingredients')">
          What can I eat?
          <template v-slot:append>
            <v-icon size="28px">mdi-silverware-clean</v-icon>
          </template>
        </v-btn-large>
        <!-- selecteer je ingredienten die je in huis hebt en laat zien wat je kan maken -->

      </div>
    </v-container>

    <!-- Select Ingredients -->
    <v-container id="section-ingredients" class="d-flex dynamic-container justify-center align-center">
      <div :style="{ height: '80vh', width: '95vw' }">
        <div class="d-flex justify-space-between">
          <h1>Ingredients</h1>
          <v-btn @click="scrollToSection('section-menu')">let's cook!</v-btn>
        </div>
        <v-divider></v-divider>

        <v-card class="my-5 pa-5">
          <v-text-field v-model="filter" label="Search here"></v-text-field>
          <div v-for="(ingredients, foodType) in groupedFilteredIngredients" :key="foodType">
            <h2 class="mt-6">{{ foodType }}</h2>
            <v-divider class="mb-5"></v-divider>
            <v-btn class="ma-2" v-for="ingredient in ingredients" :key="ingredient.id" @click="onSelect(ingredient)"
              :variant="selected.includes(ingredient) ? 'tonal' : 'outlined'">
              {{ ingredient.name }}
            </v-btn>
          </div>
        </v-card>

      </div>
    </v-container>

    <!-- Available Menus -->
    <v-container id="section-menu" class="d-flex justify-center align-center"
      :style="{ minHeight: '100vh', height: 'auto' }">
      <div :style="{ height: '80vh', width: '95vw' }">
        <div class="d-flex justify-space-between">
          <h1>menu</h1>
        </div>
        <v-divider></v-divider>

        <v-card class="my-5 pa-5">
        </v-card>
      </div>
    </v-container>
    
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      showScrollButton: false as boolean,

      // Move to component
      filter: '' as string,
      selected: [] as any[],
      ingredients: [
        {
          type: "vegetable",
          name: "carrot"
        },
        {
          type: "vegetable",
          name: "broccoli"
        },
        {
          type: "vegetable",
          name: "spinach"
        },
        {
          type: "vegetable",
          name: "potato"
        },
        {
          type: "vegetable",
          name: "tomato"
        },
        {
          type: "vegetable",
          name: "onion"
        },
        {
          type: "vegetable",
          name: "bell pepper"
        },
        {
          type: "vegetable",
          name: "garlic"
        },
        {
          type: "vegetable",
          name: "zucchini"
        },
        {
          type: "vegetable",
          name: "eggplant"
        },
        {
          type: "fruit",
          name: "apple"
        },
        {
          type: "fruit",
          name: "banana"
        },
        {
          type: "fruit",
          name: "orange"
        },
        {
          type: "fruit",
          name: "strawberry"
        },
        {
          type: "fruit",
          name: "grape"
        },
        {
          type: "fruit",
          name: "lemon"
        },
        {
          type: "fruit",
          name: "pineapple"
        },
        {
          type: "fruit",
          name: "blueberry"
        },
        {
          type: "fruit",
          name: "mango"
        },
        {
          type: "fruit",
          name: "peach"
        },
        {
          type: "meat",
          name: "chicken breast"
        },
        {
          type: "meat",
          name: "beef steak"
        },
        {
          type: "meat",
          name: "pork chop"
        },
        {
          type: "meat",
          name: "lamb"
        },
        {
          type: "meat",
          name: "bacon"
        },
        {
          type: "meat",
          name: "turkey"
        },
        {
          type: "meat",
          name: "sausage"
        },
        {
          type: "meat",
          name: "ham"
        },
        {
          type: "meat",
          name: "duck"
        },
        {
          type: "seafood",
          name: "salmon"
        },
        {
          type: "seafood",
          name: "shrimp"
        },
        {
          type: "seafood",
          name: "tuna"
        },
        {
          type: "seafood",
          name: "crab"
        },
        {
          type: "seafood",
          name: "lobster"
        },
        {
          type: "seafood",
          name: "mussels"
        },
        {
          type: "seafood",
          name: "oysters"
        },
        {
          type: "seafood",
          name: "scallops"
        },
        {
          type: "seafood",
          name: "cod"
        },
        {
          type: "dairy",
          name: "milk"
        },
        {
          type: "dairy",
          name: "cheddar cheese"
        },
        {
          type: "dairy",
          name: "butter"
        },
        {
          type: "dairy",
          name: "yogurt"
        },
        {
          type: "dairy",
          name: "cream"
        },
        {
          type: "dairy",
          name: "parmesan cheese"
        },
        {
          type: "dairy",
          name: "mozzarella"
        },
        {
          type: "dairy",
          name: "sour cream"
        },
        {
          type: "dairy",
          name: "ice cream"
        },
        {
          type: "grain",
          name: "rice"
        },
        {
          type: "grain",
          name: "pasta"
        },
        {
          type: "grain",
          name: "bread"
        },
        {
          type: "grain",
          name: "quinoa"
        },
        {
          type: "grain",
          name: "oats"
        },
        {
          type: "grain",
          name: "barley"
        },
        {
          type: "grain",
          name: "cornmeal"
        },
        {
          type: "grain",
          name: "bulgur"
        },
        {
          type: "grain",
          name: "couscous"
        },
        {
          type: "spice",
          name: "salt"
        },
        {
          type: "spice",
          name: "black pepper"
        },
        {
          type: "spice",
          name: "cinnamon"
        },
        {
          type: "spice",
          name: "cumin"
        },
        {
          type: "spice",
          name: "turmeric"
        },
        {
          type: "spice",
          name: "paprika"
        },
        {
          type: "spice",
          name: "nutmeg"
        },
        {
          type: "spice",
          name: "oregano"
        },
        {
          type: "spice",
          name: "thyme"
        },
        {
          type: "spice",
          name: "ginger"
        },
        {
          type: "spice",
          name: "basil"
        },
        {
          type: "condiment",
          name: "ketchup"
        },
        {
          type: "condiment",
          name: "mustard"
        },
        {
          type: "condiment",
          name: "mayonnaise"
        },
        {
          type: "condiment",
          name: "vinegar"
        },
        {
          type: "condiment",
          name: "hot sauce"
        },
        {
          type: "condiment",
          name: "honey"
        },
        {
          type: "condiment",
          name: "barbecue sauce"
        },
        {
          type: "condiment",
          name: "pesto"
        },
        {
          type: "condiment",
          name: "soy sauce"
        },
        {
          type: "nut",
          name: "almond"
        },
        {
          type: "nut",
          name: "peanut"
        },
        {
          type: "nut",
          name: "walnut"
        },
        {
          type: "nut",
          name: "cashew"
        },
        {
          type: "nut",
          name: "pecan"
        },
        {
          type: "nut",
          name: "hazelnut"
        },
        {
          type: "nut",
          name: "pistachio"
        },
        {
          type: "nut",
          name: "macadamia"
        },
        {
          type: "beverage",
          name: "water"
        },
        {
          type: "beverage",
          name: "coffee"
        },
        {
          type: "beverage",
          name: "tea"
        },
        {
          type: "beverage",
          name: "orange juice"
        },
        {
          type: "beverage",
          name: "wine"
        },
        {
          type: "beverage",
          name: "beer"
        },
        {
          type: "beverage",
          name: "soda"
        },
        {
          type: "beverage",
          name: "milkshake"
        },
        {
          type: "beverage",
          name: "smoothie"
        },
        {
          type: "herb",
          name: "cilantro"
        },
        {
          type: "herb",
          name: "parsley"
        },
        {
          type: "herb",
          name: "mint"
        },
        {
          type: "herb",
          name: "rosemary"
        },
        {
          type: "herb",
          name: "dill"
        },
        {
          type: "herb",
          name: "sage"
        },
        {
          type: "herb",
          name: "chives"
        },
        {
          type: "herb",
          name: "tarragon"
        },
        {
          type: "herb",
          name: "oregano"
        }
      ] as any[]
    }
  },

  // Move to component
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
    scrollToSection(id: string) {
      const section = document.querySelector(`#${id}`) as HTMLElement;
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },

    handleScroll() {
      const section = document.querySelector(`#section-home`) as HTMLElement;
      const scrollPosition = window.scrollY + window.innerHeight;
      if (section) {
        this.showScrollButton = scrollPosition * 0.75 > section.clientHeight;
      }
    },

    // Move to component
    onSelect(ingredient: any) {
      const index = this.selected.indexOf(ingredient);
      if (index === -1) {
        this.selected.push(ingredient);
      } else {
        this.selected.splice(index, 1);
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
});
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dynamic-container {
  height: auto;
  min-height: 100vh;
  overflow-y: auto;
}
</style>
