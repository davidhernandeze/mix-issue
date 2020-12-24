<template>
    <div class="flex text-sm">
        <sidebar :active.sync="isSidebarExpanded"/>
        <div class="flex-1 bg-gray-200">
            <topbar @expand:sidebar="isSidebarExpanded = !isSidebarExpanded"/>
            <div class="p-4 text-gray-800 min-h-screen container">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default {
    components: {Sidebar, Topbar },
    data() {
        return {
            isSidebarExpanded: false
        }
    },
    methods: {
        expandSidebar() {
            this.isSidebarHover = true
            setTimeout(() => {
                if (this.isSidebarHover) {
                    this.showSidebarText = true
                }
            }, 100);
        },
        contractSidebar() {
            this.isSidebarHover = false
            this.showSidebarText = false
        }
    }
}
</script>
