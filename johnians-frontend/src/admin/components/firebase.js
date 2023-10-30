// firebase.js
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRsik5Dprl2CDyfEwQrlSnjVq90n21kCM",
    authDomain: "uploadfile-33b73.firebaseapp.com",
    projectId: "uploadfile-33b73",
    storageBucket: "uploadfile-33b73.appspot.com",
    messagingSenderId: "1050045828284",
    appId: "1:1050045828284:web:fa6ba67dd2671d2ab094b9"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };