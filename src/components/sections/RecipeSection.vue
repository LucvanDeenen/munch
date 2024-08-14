<template>
  <v-container>
    <SectionHeader title="Recipe" icon="mdi-pot-steam" prev-section="section-menu" />

  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import SectionHeader from '@/components/Header.vue';

export default defineComponent({
  name: 'MenuSection',

  components: {
    SectionHeader
  }
});
</script>