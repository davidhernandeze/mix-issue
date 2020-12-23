<template>
    <Sidebar v-model:visible="visibleLeft">
        Content
    </Sidebar>
    <div class="p-grid">
        <div class="p-col-fixed">
            <div class="p-d-none p-d-md-inline-flex">
                <PanelMenu :model="menuItems"/>
            </div>
        </div>
        <div class="p-col">
            <div class="box p-p-3">
                <div class="p-d-flex p-jc-between">
                    <Button
                        @click="toggleSidebar"
                        icon="pi pi-angle-right"
                        class="p-button-rounded p-button-outlined p-d-md-none"
                    />
                    <div class="p-d-md-inline-flex"/>
                    <Button
                        @click="toggleSidebar"
                        icon="pi pi-bars"
                        class="p-button-rounded p-button-outlined"
                    />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { ref } from 'vue'
    import Sidebar from 'primevue/sidebar'
    import Button from 'primevue/button'
    import PanelMenu from 'primevue/panelmenu'
    export default {
        components: { Sidebar, Button, PanelMenu },
        setup() {
            const visibleLeft = ref(false)
            function toggleSidebar() {
                visibleLeft.value = !visibleLeft.value
            }
            const menuItems = [
                {
                    label: 'File',
                    icon:'pi pi-fw pi-file',
                    items: [
                        {
                            label: 'New',
                            icon:'pi pi-fw pi-plus',
                            items: [
                                {
                                    label: 'Bookmark',
                                    icon:'pi pi-fw pi-bookmark'
                                },
                                {
                                    label: 'Video',
                                    icon:'pi pi-fw pi-video'
                                }
                            ]
                        },
                        {
                            label: 'Delete',
                            icon:'pi pi-fw pi-trash'
                        },
                        {
                            label: 'Export',
                            icon:'pi pi-fw pi-external-link'
                        }
                    ]
                },
            ]
            return {
                visibleLeft,
                toggleSidebar,
                menuItems
            }
        }
    }
</script>
