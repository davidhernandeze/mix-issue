window.axios = require('axios');

import { createApp } from 'vue'
import router from './router'
import PrimeVue from 'primevue/config'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './icons'
import registerPrimeComponents from './prime-imports'

import App from './components/App.vue'
import Spinner from './components/Spinner.vue'

const app = createApp(App)

app.use(router)

app.component('Icon', FontAwesomeIcon)
app.component('Spinner', Spinner)

app.use(PrimeVue.install)
registerPrimeComponents(app)

app.mount("#app")
