// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtKiJxatRtX3SnLzWV6mJgekj6eLF6EJU",
  authDomain: "crwn-clothing-db-3c554.firebaseapp.com",
  projectId: "crwn-clothing-db-3c554",
  storageBucket: "crwn-clothing-db-3c554.appspot.com",
  messagingSenderId: "620937965730",
  appId: "1:620937965730:web:9c744c42fd8a12e213e7fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Other config
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// Exports
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async userAuth => {
  // doc() retrieves documents inside the db; if the document doesn't exist, Google will still return a reference object, pointing to a place where data could be stored
  const userDocRef = doc(db, "users", userAuth.uid);
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
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  // Return the document with data:
  return userDocRef;
};
