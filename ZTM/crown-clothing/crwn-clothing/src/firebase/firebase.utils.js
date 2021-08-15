import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyAC57Kn1nBmADy8bONzwH6_JUsGUxqKRYs",

    authDomain: "crwn-db-90122.firebaseapp.com",

    projectId: "crwn-db-90122",

    storageBucket: "crwn-db-90122.appspot.com",

    messagingSenderId: "534554135205",

    appId: "1:534554135205:web:73fad1ff7a6bbf982e5b4c",

    measurementId: "G-EMK2N2FET2"

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promp: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

