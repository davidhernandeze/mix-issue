import axios from 'axios'

export default {
    methods: {
        http(){
            let instance = axios.create();
            instance.interceptors.response.use(
                response => response,
                error => {
                    if (error.response.status === 419 || error.response.status === 500) {
                        window.location.reload();
                    }
                    return Promise.reject(error);
                }
            )
            return instance
        },

        success(message) {
            this.$toast.add({severity:'success', summary: 'Operación exitosa', detail: message, life: 3000})
        },

        danger(message) {
            this.$toast.add({severity:'error', summary: 'Error', detail: message, life: 3000})
        },

        getFirstValidationError(errorBag) {
            let errors = Object.values(errorBag)
            errors = errors.flat()
            return errors[0]
        }
    },
}
