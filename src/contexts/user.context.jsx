import { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.util';

// The literal context (data storage)
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// The actual context (wrapper)
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // Here unsubscribe is a method(?) that will remove the observer
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    
    // Clean up phase; if a completeCallBack was passed, it would run in this phase
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
