import { createApp } from 'vue';
import router from './router'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';

import App from './components/App.vue'
const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Dialog', Dialog);

app.mount("#app")
