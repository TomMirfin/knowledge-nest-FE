import { createApp, onUnmounted, ref, computed, Ref } from "vue";
import "./style.css";
import { plugin, defaultConfig } from "@formkit/vue";
import App from "./App.vue";
import router from "./router";
import "./components/axios.js";
import { FirebaseOptions } from "firebase/app";
import "firebase/compat/auth";
import "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Filter from "bad-words";
import { User } from "./types/type.js";

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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export function useAuth() {
  const user: Ref<User> | any = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  return { user, isLogin };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection("messages");
const messagesQuery = messagesCollection
  .orderBy("createdAt", "desc")
  .limit(100);
const filter = new Filter();

export function useChat() {
  const messages: Ref = ref([]);
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text: any) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}

const app = createApp(App);

app.use(router);
app.use(plugin, defaultConfig);

app.mount("#app");
