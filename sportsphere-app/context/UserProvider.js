import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/firebaseSetup';
import { findUserByUid, readAllFiles } from '../Firebase/firebaseHelper';
import { onAuthStateChanged } from 'firebase/auth';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [userItems, setUserItems] = useState([]);

  function handleUserItems(items) {
    setUserItems(items);
  } 
  function findUser(uid) {
      const newUser = userItems.find(userItem => userItem.uid === uid);
      console.log("New User: ", newUser);
      return newUser ? newUser : null;
    }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await readAllFiles("users", handleUserItems, (error) => {
      console.log("Error fetching users", error.message);
    });
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    }
    console.log("User Items: ", userItems);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          // const userProfile = await findUserByUid(user.uid);
          // setUserProfile(userProfile);
          const newUser = findUser(user.uid);
          if (newUser?.id) {
            console.log("User found with ID: ", newUser.id);
            setUserProfile(newUser);
            console.log("User Profile: ", userProfile);
          } else {
            console.log("User not found");
            setUserProfile(null);
          }
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
  

  // const user = findUser(auth.currentUser.uid);
  // setUserProfile(user);
  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};