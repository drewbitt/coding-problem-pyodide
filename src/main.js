import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";
import App from "./App.vue";
import Main from "./pages/Main.vue";
import New from "./pages/New.vue";
import VueCodemirror from "vue-codemirror";
import "buefy/dist/buefy.css";

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(VueCodemirror);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Main },
  { path: "/new", component: New }
];

const router = new VueRouter({
  routes
});

new Vue({
  router: router,
  data: {
    items: [
      {
        id: 1,
        name: "Test",
        code: "",
        input: "",
        output: ""
      },
      {
        id: 2,
        name: "Test2",
        code: "",
        input: "",
        output: ""
      }
    ]
  },
  render: h => h(App)
}).$mount("#app");
