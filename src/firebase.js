import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPxzUsW44AIRet211OTqk_D903Z4N0h3E",
  authDomain: "agora-question.firebaseapp.com",
  databaseURL: "https://agora-question.firebaseio.com",
  projectId: "agora-question",
  storageBucket: "agora-question.appspot.com",
  messagingSenderId: "939201026710",
  appId: "1:939201026710:web:bab6eadbd4b2c3ed36c0b7",
  measurementId: "G-7JYMQBNS0Q"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
