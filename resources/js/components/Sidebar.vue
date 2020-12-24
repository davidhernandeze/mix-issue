<template>
    <div>
        <div class="hidden sm:block w-16"></div>
        <div class="fixed z-20" :class="!isExpanded ? ['hidden', 'sm:block'] : ''">
            <div class="bg-gray-800 h-screen text-white overflow-x-hidden"
                 :class="[isExpanded ? 'w-64' : 'w-16']"
                 @mouseenter="onEnter"
                 @mouseleave="onLeave">
                <div class="py-1 flex items-center bg-indigo-600 h-12 cursor-pointer w-64">
                    <div class="mx-auto w-16 flex justify-center">
                        <div class="h-8 w-8 rounded-circle bg-white"/>
                    </div>
                    <span class="flex-grow uppercase font-bold whitespace-no-wrap"
                          @click="$router.push({ name: 'dashboard' })">Licit Action</span>
                    <Icon class="ml-auto text-gray-500 hover:text-white mr-4" icon="times" @click="close"/>
                </div>
                <ul class="mt-2 text-gray-500 text-black text-lg">
                    <router-link
                        to="/laboratorios"
                        tag="li"
                        class="py-3 cursor-pointer hover:bg-gray-700 hover:text-white flex items-center w-64"
                    >
                        <div class="w-16 flex justify-center">
                            <Icon icon="flask" size="lg"/>
                        </div>
                        <span class="flex-grow whitespace-no-wrap">Laboratorios</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['active'],
    data () {
        return {
            isExpanded: false,
            transitionRunning: null,
            disableMouseEvents: false
        }
    },
    methods: {
        onEnter () {
            if (this.disableMouseEvents) return
            this.disableMouseEventsMeanwhile(100)
            this.isExpanded = true
            this.transitionRunning = 'expand'
        },
        onLeave () {
            if (this.disableMouseEvents) return
            this.disableMouseEventsMeanwhile(100)
            this.isExpanded = false
            this.transitionRunning = 'contract'
        },
        close () {
            this.disableMouseEventsMeanwhile(100)
            this.isExpanded = false
            this.$emit('update:active')
            this.transitionRunning = 'contract'

        },
        disableMouseEventsMeanwhile(milliseconds) {
            this.disableMouseEvents = true
            setTimeout(() => this.disableMouseEvents = false, milliseconds)
        }
    },
    watch: {
        active (isActive) {
            this.transitionRunning = 'expand'
            this.isExpanded = isActive
            if (isActive) this.disableMouseEvents = true
        }
    }
}
</script>
<style scoped>
.expand {
    animation-name: expand;
    animation-duration: 200ms;
}

@keyframes expand {
    from {
        width: 4rem;
    }
    to {
        width: 16rem;
    }
}

.contract {
    animation-name: contract;
    animation-duration: 200ms;
}

@keyframes contract {
    from {
        width: 16rem;
    }
    to {
        width: 4rem;
    }
}
</style>
