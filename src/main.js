import Vue from "vue";
import VueRouter from "vue-router";
import Buefy from "buefy";
import App from "./App.vue";
import Main from "./pages/Main.vue";
import New from "./pages/New.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import VueCodemirror from "vue-codemirror";
import "buefy/dist/buefy.css";

Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(VueCodemirror);
Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Main },
  // don't need to pass props in current implementation
  {
    path: "/item/:id?",
    name: "new",
    props: true,
    component: New,
    alias: "/new"
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  router: router,
  data: {
    items: [
      {
        id: "1",
        name: "Test",
        code: "testingcode1",
        input: "",
        output: ""
      },
      {
        id: "2",
        name: "Test2",
        code: "",
        input: "",
        output: ""
      }
    ]
  },
  render: h => h(App)
}).$mount("#app");
