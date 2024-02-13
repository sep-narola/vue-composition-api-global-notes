import "./assets/main.css";
import "vue3-toastify/dist/index.css";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import DycIcon from "@/components/DycIcon.vue";
import Vue3Toastify from "vue3-toastify";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(Vue3Toastify)
  .component("DycIcon", DycIcon)
  .mount("#app");
