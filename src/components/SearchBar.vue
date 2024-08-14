<!-- SearchBar.vue -->
<template>
    <div id="header" class="d-flex" :class="selected !== undefined && selected.length === 0 ? 'mb-2' : 'mb-1'">
        <v-text-field append-inner-icon="mdi-magnify" v-model="filter" placeholder="Search here..."
            :hint="handleToolTip()" @keydown.enter="selectFilteredIngredient" @keydown.tab="updateFilterIndex" />

        <v-btn class="ml-2" variant="tonal" style="height: 40px; min-width: 40px; width: 40px;" disabled>
            <v-icon>mdi-cog</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            filter: '' as string,
            filterIndex: 0 as number,
        }
    },
    props: {
        filter: {
            type: String,
            required: true
        },
        selected: {
            type: Array<any>,
            required: true
        },
        uniqueIngredientFilter: {
            type: Array<any>,
            required: true
        },
        filterIndex: {
            type: Number,
            required: true
        },
    },
    emits: ['update:filter', 'select-ingredient', 'update-filter-index'],
    methods: {
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
            this.$emit('select-ingredient');
        },

        updateFilterIndex(event: Event) {
            this.$emit('update-filter-index', event);
        }
    }
});
</script>