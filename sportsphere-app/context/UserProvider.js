import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebaseSetup';
import { findUserByUid } from '../Firebase/firebaseHelper';
import { onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const {userInfo, userDocId} = await findUserByUid(user.uid);
          setUserProfile({userInfo, userDocId});
        } catch (error) {
          console.log('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};