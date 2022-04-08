import { createApp } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chips from 'primevue/chips';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(Toast);

app.component('Button', Button);
app.component('Card', Card);
app.component('Chips', Chips);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Message', Message);
app.mount('#app');
