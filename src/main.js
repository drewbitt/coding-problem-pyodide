import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";
import App from "./App.vue";
import Main from "./pages/Main.vue";
import New from "./pages/New.vue";
import Existing from "./pages/New.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import VueCodemirror from "vue-codemirror";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "buefy/dist/buefy.css";
import itemsjson from "../items.json";

Vue.use(VueRouter);
Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas"
});
Vue.use(VueCodemirror);
library.add(faInfoCircle);
Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Main },
  // don't need to pass props in current implementation
  {
    path: "/item/:id",
    name: "item",
    props: true,
    component: Existing
  },
  { path: "/new", name: "new", component: New },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  router: router,
  data: {
    items: itemsjson
  },
  render: h => h(App)
}).$mount("#app");
