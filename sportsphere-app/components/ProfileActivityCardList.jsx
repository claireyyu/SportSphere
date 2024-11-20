import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { QueryContext } from "../context/QueryProvider";
import { readAllFiles } from '../Firebase/firebaseHelper';
import { UserContext} from '../context/UserProvider';

export default function ProfileActivityCardList({modalVisible, modalHandler}) {
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

  return (
    <View>
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
  },
})