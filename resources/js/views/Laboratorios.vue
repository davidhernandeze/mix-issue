<template>
    <div class="card p-4">
        <Toolbar class="p-mb-4">
            <template #left>
                <Button
                    label="New"
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
                <div class="table-header flex justify-between items-center">
                    <span class="text-lg">Administrar laboratorios</span>
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

    <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
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

    <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete the selected products?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts"/>
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
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            laboratory: {},
            submitted: false
        }
    },
    mounted() {
        this.fetch()
    },
    methods: {
        async fetch() {
            this.tableLoading = true
            this.loading = true
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
        confirmDeleteProduct(product) {
            this.product = product
            this.deleteProductDialog = true
        },
        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id)
            this.deleteProductDialog = false
            this.product = {}
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000})
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
