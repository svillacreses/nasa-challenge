import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Home",
    component: Home,
    title: "Global Warning",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = "Global Warning";
router.afterEach(() => {
  Vue.nextTick(() => {
    document.title = DEFAULT_TITLE;
  });
});

export default router;
