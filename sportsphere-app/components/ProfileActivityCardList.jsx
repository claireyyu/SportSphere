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

  useEffect(() => {
    readAllFiles(collectionName, null, 'date', null, handleActivityItems, (error) => {
      console.log("Error fetching activities", error.message);
    });
  }, []);

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