import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAo4zUgOhPIDQFsSRiVjskgXXz8LkxlbIs",
    authDomain: "agora-munera.firebaseapp.com",
    databaseURL: "https://agora-munera.firebaseio.com",
    projectId: "agora-munera",
    storageBucket: "agora-munera.appspot.com",
    messagingSenderId: "463645494160",
    appId: "1:463645494160:web:640637acc1d7abffa7c115",
    measurementId: "G-LKYW0E0BB8"
}; 

firebase.initializeApp(firebaseConfig);

export default firebase;