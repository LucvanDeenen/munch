<template>
    <v-container class="d-flex justify-space-between">
        <h1 class="mt-1 ml-1">
            {{ title }}
            <v-icon class="mb-2 ml-1">
                {{ icon }}
            </v-icon>

            <v-btn v-if="nextSection" icon variant="plain" size="small" class="ml-1"
                @click="goToNextSection">
                <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
        </h1>


        <navigation-button class="mt-1" :target="prevSection != null ? prevSection : 'home'"/>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import NavigationButton from '@/components/layout/NavigationButton.vue';
import { scrollTo } from '@/utils/navigation';

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
        },
        nextSection: {
            type: String,
            required: false
        }
    },

    methods: {
        ...mapActions('navigation', ['unlockSection']),
        async goToNextSection() {
            if (!this.nextSection) {
                return;
            }
            await this.unlockSection(this.nextSection);
            await this.$nextTick();
            scrollTo(this.nextSection);
        }
    }
});
</script>