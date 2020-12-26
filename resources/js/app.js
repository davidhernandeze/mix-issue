window.axios = require('axios')
let token = document.head.querySelector('meta[name="csrf-token"]')
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
window.laravelToken = token.content

import { createApp } from 'vue'
import router from './router'
import PrimeVue from 'primevue/config'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './icons'
import registerPrimeComponents from './prime-imports'

import App from './components/App.vue'
import Spinner from './components/Spinner.vue'
import ToastService from 'primevue/toastservice';
import http from './mixins/http'

const app = createApp(App)

app.use(router)

app.component('Icon', FontAwesomeIcon)
app.component('Spinner', Spinner)

app.use(PrimeVue.install)
app.use(ToastService);
registerPrimeComponents(app)

app.mount("#app")
app.mixin(http)
