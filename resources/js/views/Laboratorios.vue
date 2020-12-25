<template>
    <Spinner :active="loading"/>
    <div class="card p-4">
        <h1 class="uppercase my-4 text-2xl">Administrar laboratorios</h1>
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
            :value="laboratories"
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
                        @click="editProduct(slotProps.data)"
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

    <Dialog v-model:visible="editDialog" :style="{width: '450px'}" header="Detalles" :modal="true" class="p-fluid">
        <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" />
        <div class="p-field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
            <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
        </div>
        <div class="p-field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
        </div>

        <div class="p-field">
            <label class="p-mb-3">Category</label>
            <div class="p-formgrid p-grid">
                <div class="p-field-radiobutton p-col-6">
                    <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                    <label for="category1">Accessories</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                    <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                    <label for="category2">Clothing</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                    <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                    <label for="category3">Electronics</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                    <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                    <label for="category4">Fitness</label>
                </div>
            </div>
        </div>

        <div class="p-formgrid p-grid">
            <div class="p-field p-col">
                <label for="price">Price</label>
                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
            </div>
            <div class="p-field p-col">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="product.quantity" integeronly />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
        <div class="flex items-center">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span v-if="laboratory">¿Eliminar <b>{{laboratory.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false"/>
            <Button label="Si" icon="pi pi-check" class="p-button-text" @click="delete" />
        </template>
    </Dialog>

</template>

<script>
import axios from 'axios'
import { debounce } from 'lodash'

export default {
    data() {
        return {
            laboratories: [],
            totalRecords: 0,
            tableLoading: false,
            currentPage: 1,
            sortBy: 'id',
            sortOrder: 'desc',
            search: '',
            editDialog: false,
            deleteDialog: false,
            laboratory: {},
            submitted: false,
            loading: false
        }
    },
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
            const { data } = await axios.get(route('laboratories.index', query))
            this.tableLoading = false
            this.laboratories = data.data
            this.totalRecords = data.total
        },
        onPageChange(event) {
            this.currentPage = event.page + 1
            this.fetch()
        },
        onSortChange(event) {
            this.sortBy = event.sortField
            this.sortOrder = event.sortOrder > 0 ? 'asc' : 'desc'
            this.currentPage = 1
            this.fetch()
        },
        openNew() {
            this.product = {}
            this.submitted = false
            this.productDialog = true
        },
        hideDialog() {
            this.productDialog = false
            this.submitted = false
        },
        saveProduct() {

        },
        editProduct(product) {
            this.product = {...product}
            this.productDialog = true
        },
        confirmDeleteProduct(laboratory) {
            this.laboratory = laboratory
            this.deleteDialog = true
        },
        async delete() {
            this.loading = true
            await axios.delete(route('laboratories.destroy', this.laboratory.id))
            this.loading = false
            this.deleteDialog = false
            this.laboratory = {}
            this.$toast.add({severity:'success', summary: 'Operación exitosa', detail: 'Laboratorio eliminado', life: 3000})
            await this.fetch()
        }
    },
    watch: {
        search: debounce(function () {
            this.page = 1
            this.fetch()
        }, 500)
    }
}
</script>
