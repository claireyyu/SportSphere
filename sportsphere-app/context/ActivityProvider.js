import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';


export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
      const currActivityItems = [];
      if (querySnapshot.empty) {
        console.log("No activities found");
        return;
      }
      querySnapshot.forEach((docSnapshot) => {
        const id = docSnapshot.id;
        const data = docSnapshot.data();
        if (!data.time || !data.date) {
          console.log("No date or time data found for reminder with id", id);
          return;
        }

        const dtDate = new Date(data.date.seconds * 1000);
        // Format date to "Aug 24, 2024"
        const formattedDate = dtDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        });
        
        const dtTime = new Date(data.time.seconds * 1000);
        // Format time to "14:32" (24-hour format)
        const formattedTime = dtTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
        const dtCombined = new Date(`${dtDate.toISOString().split('T')[0]}T${formattedTime}:00`);

        console.log(`Date: ${formattedDate}`);
        console.log(`Time: ${formattedTime}`);
        // by default we show users the most recent activities
        currActivityItems.push({ ...data, id, time: formattedTime, date: formattedDate, dtCombined});
      });
      currActivityItems.sort((a, b) => a.dtCombined - b.dtCombined);
      setActivityItems(currActivityItems);
    }, (error) => {
      console.log("on snapshot", error);
      Alert.alert("Error", error.message);
    });

    return () => {
      console.log("unsubscribing");
      unsubscribe();
    };
  }, []);

  const filteredActivityItems = activityItems.filter(item =>
    item.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <ActivityContext.Provider value={{ activityItems: filteredActivityItems, setActivityItems, searchQuery, setSearchQuery }}>
      {children}
    </ActivityContext.Provider>
  );
}