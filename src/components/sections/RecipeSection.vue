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

      <h3 class="mt-5">Shopping</h3>
      <p>
        ...
      </p>

      <h3 class="mt-5">Planning</h3>
      <p>
        ...
      </p>

      <h3 class="mt-5">Guide</h3>
      <ul class="mx-5">
        <li v-for="step in meal.steps">{{ step }}</li>
      </ul>
      
      <v-btn block class="mt-5" @click="toggleGuide = true">cook-a-long</v-btn>

      <v-dialog v-model="toggleGuide">
        <v-card style="height: 50dvh; width: 90dvw;">

          <div style="height: 100%; overflow: hidden;">
            <div class="dialog-content" :style="{ top: `-${stepIndex * 40}px` }">
              <div class="pa-4" v-for="(text, key) in meal.steps" :key="key">
                <h3 :class="key != stepIndex ? 'nonactive-text' : 'text-primary'">Step {{ key + 1 }}</h3>
                <p class="steps" :class="key != stepIndex ? 'nonactive-text' : 'active-text'">
                  {{ text }}
                </p>
              </div>
            </div>
          </div>

          <div class="justify-space-between align-center d-flex my-1">
            <v-btn class="mx-2" text="<" variant="plain" icon :disabled="stepIndex !== 0 ? false : true"
              @click="prevStep"></v-btn>
            <v-btn class="mx-2" text=">" variant="plain" icon
              :disabled="stepIndex !== meal.steps.length - 1 ? false : true" @click="nextStep"></v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-card>

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import SectionHeader from '@/components/layout/Header.vue';

export default defineComponent({
  name: 'MenuSection',
  data() {
    return {
      toggleGuide: false,
      stepIndex: 0
    }
  },

  components: {
    SectionHeader
  },

  computed: {
    meal() {
      return this.getSelectedMeal() ? this.getSelectedMeal : [];
    },
    mealStep() {
      return this.meal.steps[this.stepIndex]
    }
  },

  methods: {
    ...mapGetters(['getSelectedMeal']),
    prevStep() {
      if (this.stepIndex === 0) {
        return;
      }

      this.stepIndex--;
    },
    nextStep() {
      if (this.stepIndex + 1 === this.meal.steps.length) {
        return;
      }

      this.stepIndex++;
    }
  }
});
</script>

<style scoped>
.dialog-content {
  position: relative;
  transition: top 0.5s ease;
}

.steps {
  transition: color 0.5s ease;
}

.nonactive-text {
  color: rgba(255, 255, 255, 0.394);
}

#content {
  max-height: 89vh;
  min-height: 75vh;
}
</style>