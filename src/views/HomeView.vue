<template>
  <v-container fluid :style="{ height: '200vh', width: '100vw' }">
    <!-- First Container -->
    <v-container ref="firstContainer" class="d-flex justify-center align-center" :style="{ height: '100vh' }">
      <div>
        <h1>MUNCH</h1>
        <v-btn-large large @click="scrollToSecondContainer">
          What do I eat?
          <template v-slot:append>
            <v-icon size="28px">mdi-silverware-clean</v-icon>
          </template>
        </v-btn-large>
      </div>
    </v-container>

    <!-- Second Container -->
    <v-container ref="secondContainer" class="second-container d-flex justify-center align-center" :style="{ height: '95vh' }">
      <div>
        <h1>MUNCH</h1>
        <v-btn-large>
          Go Back
          <template v-slot:append>
            <v-icon size="28px">mdi-arrow-up-bold</v-icon>
          </template>
        </v-btn-large>
      </div>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  methods: {
    scrollToSecondContainer() {
      const secondContainer = this.$refs.secondContainer as HTMLElement;
      if (secondContainer) {
        secondContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});
</script>
