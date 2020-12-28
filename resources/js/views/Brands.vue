<template>
    <Spinner :active="loading"/>
    <div class="card p-4">
        <h1 class="uppercase my-4 text-2xl">Administrar marcas</h1>
        <Toolbar class="p-mb-4">
            <template #left>
                <Button
                    label="Nuevo"
                    icon="pi pi-plus"
                    class="p-button-success p-mr-2"
                    @click="openNew"
                />
            </template>
        </Toolbar>

        <DataTable
            ref="dt"
            :value="brands"
            :lazy="true"
            :loading="tableLoading"
            :paginator="true"
            @page="onPageChange($event)"
            :rows="10"
            :totalRecords="totalRecords"
            @sort="onSortChange($event)"
            dataKey="id"
            class="p-datatable-responsive-demo"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="Mostrando {currentPage} de {totalPages} páginas ({totalRecords} registros en total)"
        >
            <template #header>
                <div class="table-header flex justify-end items-center">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="search" placeholder="Buscar..." />
                    </span>
                </div>
            </template>

            <Column field="name" header="Nombre" :sortable="true"/>
            <Column field="description" header="Description"/>
            <Column>
                <template #body="slotProps">
                    <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-success p-mr-2"
                        @click="edit(slotProps.data)"
                    />
                    <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="confirmDeleteProduct(slotProps.data)"
                    />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="editDialog" :style="{width: '450px'}" header="Crear o Editar" :modal="true" class="p-fluid">
        <div class="p-field">
            <label for="name">Nombre</label>
            <InputText id="name" v-model.trim="brand.name" autofocus :class="{'p-invalid': errors.name}" />
            <small class="p-invalid" v-if="errors.name">{{ errors.name[0] }}</small>
        </div>
        <div class="p-field">
            <label for="description">Descripción</label>
            <Textarea id="description" v-model="brand.description" rows="3" cols="20" />
            <small class="p-invalid" v-if="errors.description">{{ errors.name[0] }}</small>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="save" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
        <div class="flex items-center">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span v-if="brand">¿Eliminar <b>{{brand.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false"/>
            <Button label="Si" icon="pi pi-check" class="p-button-text" @click="destroy" />
        </template>
    </Dialog>

</template>

<script>
import axios from 'axios'
import table from '../mixins/table'

export default {
    mixins: [ table ],
    data: () => ({
        brands: [],
        editDialog: false,
        errors: {},
        deleteDialog: false,
        brand: {},
        loading: false
    }),
    mounted() {
        this.fetch()
    },
    methods: {
        async fetch() {
            this.tableLoading = true
            const query = {
                sort_by: this.sortBy,
                sort_order: this.sortOrder,
                page: this.currentPage,
                search: this.search
            }
            const { data } = await axios.get(route('brands.index', query))
            this.tableLoading = false
            this.brands = data.data
            this.totalRecords = data.total
        },
        openNew() {
            this.brand = {}
            this.editDialog = true
        },
        hideDialog() {
            this.editDialog = false
        },
        async save() {
            this.loading = true
            try {
                await this.http().post(route('brands.store'), this.brand)
                this.success('Marca creada')
                this.editDialog = false
                this.brand = {}
                await this.fetch()
                this.loading = false
            }
            catch (e) {
                this.loading = false
                if (e.response.status === 422) {
                    this.danger(this.getFirstValidationError(e.response.data.errors))
                    this.errors = e.response.data.errors
                }
                else {
                    this.danger(e.message)
                }
            }
        },
        edit(brand) {
            this.brand = {...brand}
            this.editDialog = true
        },
        confirmDeleteProduct(brand) {
            this.brand = brand
            this.deleteDialog = true
        },
        async destroy() {
            this.loading = true
            await this.http().delete(route('brands.destroy', this.brand.id))
            this.loading = false
            this.deleteDialog = false
            this.brand = {}
            this.success('Marca eliminada')
            await this.fetch()
        }
    }
}
</script>
