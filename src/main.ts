import { createApp } from 'vue';
import App from './App.vue';
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia';

import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import router from './router';

const app = createApp(App);

app.use(VueTheMask);
app.use(router);
app.use(createPinia());

app.mount('#app');
