import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "vue-router";

const router: any = useRouter();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result:UserCredential) => {
      console.log(result.user);
      router.push("/feed");
    })
    .catch((err) => {
      console.log(err.code);
      alert(err.message);
    });
};
