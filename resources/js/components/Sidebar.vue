<template>
    <div>
        <div class="hidden sm:block" style="width: 4rem"></div>
        <div class="fixed z-20" :class="!isExpanded ? ['hidden', 'sm:block'] : ''">
            <div class="bg-gray-800 h-screen text-white overflow-x-hidden"
                 :class="[isExpanded ? 'w-64' : 'w-16', transitionRunning]"
                 @mouseenter="onEnter"
                 @mouseleave="onLeave">
                <div class="p-4 py-1 flex items-center bg-indigo-600 h-12 cursor-pointer">
                    <div class="h-8 w-8 rounded-circle bg-white"/>
                    <span class="ml-4 uppercase font-bold relative whitespace-no-wrap"
                          @click="$router.push({ name: 'dashboard' })">Dental soft</span>
                    <icon class="ml-auto text-gray-500 hover:text-white" icon="times" @click="close"/>
                </div>
                <div class="bg-cover bg-center h-12 opacity-25" :style="{'background-image':'url(img/smile.jpg)'}"></div>
                <div class="pt-3 px-4 -mt-12 flex items-center relative z-1 opacity-100">
                    <div class="h-8 w-8 rounded-circle bg-white"/>
                    <span class="ml-4 text-lg text-bold relative whitespace-no-wrap truncate">Dr hetero</span>
                </div>
                <ul class="mt-2 text-gray-500 text-black">
                    <li class="py-3 cursor-pointer hover:bg-gray-700 hover:text-white flex items-center"
                        @click="$router.push({ name: 'appointments' })">
<!--                        <icon class="mx-5" icon="calendar-alt"/>-->
                        <span class="relative ml-4 whitespace-no-wrap">Citas</span>
                    </li>
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
            this.disableMouseEventsMeanwhile(200)
            this.isExpanded = true
            this.transitionRunning = 'expand'
        },
        onLeave () {
            if (this.disableMouseEvents) return
            this.disableMouseEventsMeanwhile(200)
            this.isExpanded = false
            this.transitionRunning = 'contract'
        },
        close () {
            this.disableMouseEventsMeanwhile(200)
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
