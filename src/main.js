import { createApp } from "vue";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";

import App from "./App.vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/nova-vue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(PrimeVue);

app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);

app.mount("#app");
