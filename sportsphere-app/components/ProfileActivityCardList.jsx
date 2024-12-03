import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { QueryContext } from "../context/QueryProvider";
import { readAllFiles } from '../Firebase/firebaseHelper';
import { UserContext } from '../context/UserProvider';
import { findUserByUid } from '../Firebase/firebaseHelper';
import { parse } from 'date-fns';
import { SIZE, SPACING } from '../global';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileActivityCardList({uid}) {
  const [viewingUserInfo, setViewingUserInfo] = useState({});

  useEffect(() => {
    async function fetchUserInfo() {
      if (uid) {
        const { userInfo } = await findUserByUid(uid);
        setViewingUserInfo(userInfo);
        console.log("Viewing User Info: ", viewingUserInfo);
      }
    }

    fetchUserInfo();
  }, [uid]);

  const { userProfile } = useContext(UserContext);

  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);

  function handleActivityItems(newItems) {
    setActivityItems(newItems);
  }

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

  readAllFiles(collectionName, null, 'date', null, (items)=> fetchProfileUrls(items), (error) => {
    console.log("Error fetching activities", error.message);
  });
  console.log("ActivityItems: ", activityItems);
  //console.log("Activity distance 1: ", activityItems[0]?.distance, "2: ", activityItems[1]?.distance, "3: ", activityItems[2]?.distance);
}, [])
  );
  
  // useEffect(() => {
  //   readAllFiles(collectionName, null, 'date', null, handleActivityItems, (error) => {
  //     console.log("Error fetching activities", error.message);
  //   });
  // }, []);

  const filteredActivityItems = activityItems.filter(item => {
    return item.peopleGoing.includes(userProfile?.uid);
  });

  const organizerFilteredActivityItems = activityItems.filter(item => {
    return item.peopleGoing.includes(viewingUserInfo?.uid);  });

  return (
    <View>
      <View>
        <FlatList
          data={uid ? organizerFilteredActivityItems : filteredActivityItems}
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
              profileDownloadurl={item.profileDownloadurl}
              images={item.images}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    paddingBottom: SIZE.avatar,
  },
})