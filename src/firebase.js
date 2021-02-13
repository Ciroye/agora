import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaxaYrPa5_kthkHv-RVUx-eHJeQM_HcdI",
  authDomain: "agora-v2-bfbd6.firebaseapp.com",
  projectId: "agora-v2-bfbd6",
  storageBucket: "agora-v2-bfbd6.appspot.com",
  messagingSenderId: "69083485259",
  appId: "1:69083485259:web:7a8325e7bcc29617e329ce",
  measurementId: "G-2QQCPT41J0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
