import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBF-mfg4i0voROEh-ivvSpxhBd8SGeu7jo",
    authDomain: "discord-33552.firebaseapp.com",
    projectId: "discord-33552",
    storageBucket: "discord-33552.appspot.com",
    messagingSenderId: "465228029053",
    appId: "1:465228029053:web:07be811009e638baaea514"
  };

  const app =  firebase.initializeApp(firebaseConfig)
  const db = app.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider() //provide login in with google


  export {db, provider, auth}