import { createSSRApp,h } from "vue";
import App from "./App.vue";
import "@/styles/global.css"
import router from "@/router"
import plugins from "@/plugins";
import apiall from "@/api";
export function createApp() {
  const app = createSSRApp(App);
  app.use(plugins)
  app.mixin(router)
  app.config.globalProperties.$api = apiall
  return {
    app,
  };
}
