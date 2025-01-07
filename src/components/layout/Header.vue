<template>
    <v-container class="d-flex justify-space-between">
        <h1 class="mt-1 ml-1">
            {{ title }}
            <v-icon class="mb-2 ml-1">
                {{ icon }}
            </v-icon>
        </h1>


        <navigation-button class="mt-1" :target="prevSection != null ? prevSection : 'home'"/>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationButton from '@/components/layout/NavigationButton.vue';

export default defineComponent({
    name: 'SectionHeader',
    components: {
        NavigationButton
    },

    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        prevSection: {
            type: String,
            required: false
        }
    },
});
</script>