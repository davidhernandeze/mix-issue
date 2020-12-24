<template>
    <div class="flex justify-between items-center px-4 py-3 h-12 border-b border-gray-400">
        <div class="text-gray-800">
            <icon class="cursor-pointer" icon="bars" @click="$emit('expand:sidebar')"/>
        </div>
        <div class="relative">
            <button @click="isOpen = !isOpen"
                    class="relative block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                <img class="h-full w-full object-cover"
                     src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                     alt="Your avatar">
            </button>
            <button v-if="isOpen" @click="isOpen = false" tabindex="-1"
                    class="fixed inset-0 h-full w-full bg-black opacity-50 z-40 cursor-default"/>
            <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                <a href="#" class="block px-4 py-2 my-0 text-gray-800 hover:bg-indigo-500 hover:text-white">Account settings</a>
                <a href="#" class="block px-4 py-2 my-0 text-gray-800 hover:bg-indigo-500 hover:text-white">Support</a>
                <a href="#" class="block px-4 py-2 my-0 text-gray-800 hover:bg-indigo-500 hover:text-white"
                   @click="logout()">Sign out</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    props: ['showText'],
    created() {
        const handleEscape = (e) => {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.isOpen = false
            }
        }
        document.addEventListener('keydown', handleEscape)
    },
    methods: {
        logout() {
            axios.post('logout')
                .then(() => {
                    window.location.replace('login');
                }).catch(error => {
                location.reload();
            });
        }
    }
}
</script>
