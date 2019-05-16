import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Main from "./components/Main.vue";
import New from "./components/New.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Main },
  { path: "/new", component: New }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
