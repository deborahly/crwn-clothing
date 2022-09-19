// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDtKiJxatRtX3SnLzWV6mJgekj6eLF6EJU',
  authDomain: 'crwn-clothing-db-3c554.firebaseapp.com',
  projectId: 'crwn-clothing-db-3c554',
  storageBucket: 'crwn-clothing-db-3c554.appspot.com',
  messagingSenderId: '620937965730',
  appId: '1:620937965730:web:9c744c42fd8a12e213e7fb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set Google provider (we can have others)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Exports
// auth is the authentication state of the application
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // doc() retrieves documents inside the db; if the document doesn't exist, Google will still return a reference object, pointing to a place where data could be stored
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  // getDoc() is a function to get the document's data; if there is no document, the method will still return an object; to really check if the document exists, we need to run exists() on the snapshot
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // If data does not exists, set the data:
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  // Return the document with data:
  return userDocRef;
};

// Interface layers through helper functions
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
