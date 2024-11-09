import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../global'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseSetup";
import { useEffect, useState } from 'react';

export default function ActivityCardList() {
  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
      const currActivityItems = [];
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

        console.log(`Date: ${formattedDate}`);
        console.log(`Time: ${formattedTime}`);
        currActivityItems.push({ ...data, id, time: formattedTime, date: formattedDate});
      });
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

  return (
    <FlatList
      data={activityItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityCard
          activityName={item.activityName}
          venue={item.venue}
          date={item.date}
          time={item.time}
          peopleGoing={item.peopleGoing}
          totalMembers={item.totalMembers}
          description={item.description}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
})