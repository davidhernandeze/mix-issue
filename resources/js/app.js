window.axios = require('axios');

import { createApp, Vue } from 'vue'
import axios from 'axios'
import router from './router'
import PrimeVue from 'primevue/config'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './icons'
import registerPrimeComponents from './prime-imports'

import App from './components/App.vue'

const app = createApp(App)

app.use(router)

app.component('Icon', FontAwesomeIcon)

app.use(PrimeVue.install)
registerPrimeComponents(app)

app.mount("#app")
