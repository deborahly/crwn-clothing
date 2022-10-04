// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  // Get collection ('categories') location reference:
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    // Get document in the database (here we can pass the collection reference) by its title:
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // Commit all the sets in the batch:
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  // Define the range of the query:
  const q = query(collectionRef);

  // Get query snapshot:
  const querySnapshot = await getDocs(q);

  // Reduce the snapshot to an object that contains as keys the titles and as the values the items:
  return querySnapshot.docs.map(doc => doc.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // doc() retrieves documents inside the db; if the document doesn't exist, Google will still return a reference object, pointing to a place where data could be stored
  const userDocRef = doc(db, 'users', userAuth.uid);

  // getDoc() is a function to get the document's data; if there is no document, the method will still return an object; to really check if the document exists, we need to run exists() on the snapshot
  const userSnapshot = await getDoc(userDocRef);

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

  return userSnapshot;
};

// Interface functions
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Set a listener for whenever the auth state changes, call onAuthStateChanged and pass a callback function to it:
export const onAuthStateChangedListener = callback => {
  // Establish a listener under an observer pattern:
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
