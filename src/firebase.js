import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtgriYpLyn037HlUdGxWTUANd_yktBe-4",
  authDomain: "agora-13c30.firebaseapp.com",
  databaseURL: "https://agora-13c30.firebaseio.com",
  projectId: "agora-13c30",
  storageBucket: "agora-13c30.appspot.com",
  messagingSenderId: "857139755099",
  appId: "1:857139755099:web:21d5b884be863481e4277e",
  measurementId: "G-VRETGPS7YQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
