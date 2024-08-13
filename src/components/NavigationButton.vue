<template>
    <transition name="fade">
        <v-btn v-if="showScrollButton" color="white" icon variant="plain" size="small" @click="scrollTo(target)">
            <v-icon class="ma-0">mdi-arrow-up-bold</v-icon>
        </v-btn>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { scrollTo } from '@/utils/navigation';

export default defineComponent({
    name: 'NavigationButton',
    data() {
        return {
            showScrollButton: false as boolean
        }
    },

    props: {
        target: {
            type: String,
            required: true
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        scrollTo,
        handleScroll() {
            const section = document.querySelector(`#section-home`) as HTMLElement;
            const scrollPosition = window.scrollY + window.innerHeight;
            if (section) {
                this.showScrollButton = scrollPosition * 0.75 > section.clientHeight;
            }
        },
    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>