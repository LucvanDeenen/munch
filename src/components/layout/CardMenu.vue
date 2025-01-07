<template>
    <v-expand-transition>
        <div id="menu" v-if="selected.length > 0" class="mb-4" :style="{ width: '100%', overflowX: 'auto' }">
            <v-chip class="ma-1" @click:close="onSelect(ingredient)" closable v-for="(ingredient, key) in selected"
                :key="key">
                {{ ingredient.name }}
            </v-chip>
        </div>
    </v-expand-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        selected: {
            type: Array<any>,
            required: true
        }
    },
    emits: ['select'],
    methods: {
        onSelect(ingredient: any) {
            this.$emit('select', ingredient);
        }
    }
});
</script>