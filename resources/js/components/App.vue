<template>
    <div>
        <router-view />
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        setup() {
            const visible = ref(true)
            return {
                visible
            }
        }
    }
</script>
