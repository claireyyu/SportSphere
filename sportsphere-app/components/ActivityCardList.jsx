import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { QueryContext } from "../context/QueryProvider";
import { readAllFiles } from '../Firebase/firebaseHelper';
import { parse } from 'date-fns';

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