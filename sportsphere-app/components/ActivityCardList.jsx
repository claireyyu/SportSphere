import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { QueryContext } from "../context/QueryProvider";
import { readAllFiles } from '../Firebase/firebaseHelper';
import { parse } from 'date-fns';
import { SIZE } from '../global';
import * as geolib from 'geolib';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { findUserByUid } from '../Firebase/firebaseHelper';
import { useFocusEffect } from "@react-navigation/native";
import filterActivityItems from "../utils/filterActivityItems";


export default function ActivityCardList({modalVisible, modalHandler, currentLocation, isDateSelected, isDistanceSelected}) {
  const {searchQuery, sortPreference} = useContext(QueryContext);

  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);

  function handleActivityItems(items) {
    setActivityItems(items);
  }
  
  // useEffect(() => {
    useFocusEffect(
      React.useCallback(() => {

    async function getProfileDownloadURL(profileUploadURL) {
      try {
        if (profileUploadURL) {
          const imageRef = ref(storage, profileUploadURL);
          const downloadURL = await getDownloadURL(imageRef);
          console.log("Profile picture URL:", downloadURL);
          return downloadURL;
        }
      } catch (err) {
        console.log("Error getting profile picture URL: ", err);
        return null;
      }
    }

    async function fetchProfileUrls(activityItems) {
      try {
        const updatedItems = await Promise.all(
          activityItems.map(async (item) => {
            const user = await findUserByUid(item.owner);
            let profileDownloadURL = null;
    
            if (user && user.userInfo && user.userInfo.profilePicture) {
              const profileUploadURL = user.userInfo.profilePicture;
              profileDownloadURL = await getProfileDownloadURL(profileUploadURL);
            }
    
            return { ...item, profileDownloadurl: profileDownloadURL };
          })
        );
    
        setActivityItems(updatedItems);
      } catch (error) {
        console.log("Error fetching profile URLs to display in map: ", error.message);
      }
    }

    readAllFiles(collectionName, null, sortPreference, currentLocation, (items)=> fetchProfileUrls(items), (error) => {
      console.log("Error fetching activities", error.message);
    });
    console.log("ActivityItems: ", activityItems);
    //console.log("Activity distance 1: ", activityItems[0]?.distance, "2: ", activityItems[1]?.distance, "3: ", activityItems[2]?.distance);
  }, [sortPreference, isDateSelected, isDistanceSelected])
);

  
  const filteredActivityItems = activityItems.filter(item => {
    const now = new Date(); // Current date and time
    const itemDate = parse(item.date, 'MMM dd, yyyy', new Date());
    const itemTime = parse(item.time, 'HH:mm', new Date());
    itemDate.setHours(itemTime.getHours(), itemTime.getMinutes(), 0);

    // Check if the item's date is after now
    if (itemDate <= now) return false;
    const terms = searchQuery.toLowerCase().split(' ');
  
    // Check if any term matches activityName, venue, description, or date
    return terms.some(term =>
      item.activityName.toLowerCase().includes(term) ||
      item.venue.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.date.toLowerCase().includes(term)
    );
  });
  

  return (
    <View>
      <FlatList
        data={filteredActivityItems}
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
            id={item.id}
            owner={item.owner}
            venuePosition={item.venuePosition}
            images={item.images}
            profileDownloadurl={item.profileDownloadurl}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    // width: '100%',
    paddingBottom: SIZE.tabBar,
  },
})