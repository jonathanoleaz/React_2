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

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({promp: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

