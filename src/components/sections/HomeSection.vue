<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <div>
      <h1 class="my-0" style="font-size: 56px;">
        mu<span class="text-primary">nch</span>
      </h1>
      <v-btn-large @click="goToIngredients">
        What can I eat?
        <template v-slot:append>
          <v-icon size="28px">mdi-silverware-clean</v-icon>
        </template>
      </v-btn-large>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { scrollTo } from '@/utils/navigation';

export default defineComponent({
  name: 'HomeSection',
  methods: {
    scrollTo,
    ...mapActions('navigation', ['unlockSection']),
    async goToIngredients() {
      await this.unlockSection('section-ingredients');
      await this.$nextTick();
      this.scrollTo('section-ingredients');
    }
  }
});
</script>