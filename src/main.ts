import { createApp } from "vue";
import "./style.css";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "./router";
import "./components/axios.js";
import { initializeApp, FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VUE_APP_FIREBASE_API_KEY || "api-key-not-set",
  authDomain: import.meta.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "env-not-set",
  projectId: import.meta.env.VUE_APP_FIREBASE_PROJECT_ID || "env-not-set",
  storageBucket:
    import.meta.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "env-not-set",
  messagingSenderId:
    import.meta.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "env-not-set",
  appId: import.meta.env.VUE_APP_FIREBASE_APP_ID || "env-not-set",
  measurementId:
    import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID || "env-not-set",
};

initializeApp(firebaseConfig);

const app: App = createApp(App);

app.use(router);
app.use(plugin, defaultConfig);

app.mount("#app");
