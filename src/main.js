import Vue from "vue";
import App from "./App.vue";
import { initializeApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { Loader } from "@googlemaps/js-api-loader";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { firebaseConfig, mapsKey, nasa_doc } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const paginaInfo = doc(database, "nasa", nasa_doc);

//JS - GOOGLE MAPS
const mapsloader = new Loader({
  apiKey: mapsKey,
  version: "weekly",
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export { paginaInfo, mapsloader };
