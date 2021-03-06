import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const config = {

    apiKey: "AIzaSyAC57Kn1nBmADy8bONzwH6_JUsGUxqKRYs",

    authDomain: "crwn-db-90122.firebaseapp.com",

    projectId: "crwn-db-90122",

    storageBucket: "crwn-db-90122.appspot.com",

    messagingSenderId: "534554135205",

    appId: "1:534554135205:web:73fad1ff7a6bbf982e5b4c",

    measurementId: "G-EMK2N2FET2"

  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    //console.log(userAuth.uid);
    
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
  
      }
    }

    return userRef;
  };

  /**
   * This method uses the data of the store to save in tho firestore through batch method.
   */
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log('collectionRef');
    console.log(collectionRef);

    console.log('newDocRef');

    const batch = firestore.batch();
    objectsToAdd.forEach(
        obj => {
          const newDocRef = collectionRef.doc();
          console.log(newDocRef);
          batch.set(newDocRef, obj);
        }
    );
    return await batch.commit();
  }

  export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedCollection = collections.docs.map(doc=>{
      const {title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });

    return transformedCollection.reduce((accumulator, collection) =>{
     accumulator[collection.title.toLowerCase()] = collection;

     return accumulator;
    }, {});
  }

  firebase.initializeApp(config);

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsuscribe = auth.onAuthStateChanged(userAuth => {
        unsuscribe();
        resolve(userAuth);
      }, reject)
    });
  }

  export const createUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password).then( user =>{
          resolve(user);
        }, reject)
    });
  }

  export const createUserProfileDocumentPromised = (user, displayName) => {
    return new Promise((resolve, reject) => {
      createUserProfileDocument(user, displayName).then( userRef =>{
        resolve(userRef);
      }, reject)
    });
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({promp: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

