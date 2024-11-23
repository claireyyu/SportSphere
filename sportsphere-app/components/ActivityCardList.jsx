import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { QueryContext } from "../context/QueryProvider";
import { readAllFiles } from '../Firebase/firebaseHelper';

export default function ActivityCardList({modalVisible, modalHandler, currentLocation}) {
  const {searchQuery, sortPreference} = useContext(QueryContext);

  const collectionName = "activities";
  const [activityItems, setActivityItems] = useState([]);

  function handleActivityItems(newItems) {
    setActivityItems(newItems);
  }

  useEffect(() => {
    readAllFiles(collectionName, null, sortPreference, currentLocation, handleActivityItems, (error) => {
      console.log("Error fetching activities", error.message);
    });
  }, [sortPreference]);

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
  },
})