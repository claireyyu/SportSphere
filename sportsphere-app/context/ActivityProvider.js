import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';
import { readAllFiles } from '../Firebase/firebaseHelper';


export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function handleActivityItems(newItems) {
    setActivityItems(newItems);
  }

  useEffect(() => {
    // const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
    //   const currActivityItems = [];
    readAllFiles(collectionName, handleActivityItems, (error) => {
      console.log("Error fetching activities", error.message);
    });
  }, []);

  const filteredActivityItems = activityItems.filter(item => {
    const terms = searchQuery.toLowerCase().split(' ');
    return terms.some(term =>
      item.activityName.toLowerCase().includes(term) ||
      item.venue.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.date.toLowerCase().includes(term)
    );
  });

  return (
    <ActivityContext.Provider value={{ activityItems: filteredActivityItems, setActivityItems, searchQuery, setSearchQuery }}>
      {children}
    </ActivityContext.Provider>
  );
}