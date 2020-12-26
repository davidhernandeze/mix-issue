import {debounce} from 'lodash';

export default {
    data: () => ({
        totalRecords: 0,
        tableLoading: false,
        currentPage: 1,
        sortBy: 'id',
        sortOrder: 'desc',
        search: '',
    }),
    methods: {
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
    },
    watch: {
        search: debounce(function () {
            this.page = 1
            this.fetch()
        }, 500)
    }
}
