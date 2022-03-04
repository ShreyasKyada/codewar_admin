import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrJFe00ufIpM8NgqoG4_fc6XUtG9QV6KA",
  authDomain: "codewar-project-2022.firebaseapp.com",
  projectId: "codewar-project-2022",
  storageBucket: "codewar-project-2022.appspot.com",
  messagingSenderId: "330802716927",
  appId: "1:330802716927:web:d53b794e650bea32456cca",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const appRef = app.database().ref();

export const storage = getStorage(app);
export default appRef;
export { auth };
