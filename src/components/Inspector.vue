<template>
    <v-container id="content" class="overflow-y-auto px-2 py-5">
        <div v-for="(ingredients, foodType) in groupedFilteredIngredients" :key="foodType" class="pb-2">
            <div class="d-flex justify-space-between" @click="onCollapse(foodType.toString())">
                <h2>{{ foodType }}</h2>
                <v-icon class="transition-transform" :class="{ 'rotate': collapse.includes(foodType.toString()) }">
                    mdi-chevron-down
                </v-icon>
            </div>

            <v-divider class="mb-3"></v-divider>

            <v-expand-transition>
                <div v-show="!collapse.includes(foodType.toString())">
                    <v-btn class="mr-1" v-for="ingredient in ingredients" :key="ingredient.id"
                        @click="onSelect(ingredient)" :variant="selected.includes(ingredient) ? 'tonal' : 'outlined'">
                        {{ ingredient.name }}
                    </v-btn>
                </div>
            </v-expand-transition>
        </div>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        groupedFilteredIngredients: {
            type: Object,
            required: true
        },
        collapse: {
            type: Array<any>,
            required: true
        },
        selected: {
            type: Array<any>,
            required: true
        }
    },
    emits: ['select', 'collapse'],
    methods: {
        onSelect(ingredient: any) {
            this.$emit('select', ingredient);
        },

        onCollapse(type: string) {
            this.$emit('collapse', type);
        }
    }
});
</script>