import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../global'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseSetup";
import { useEffect, useState, useContext } from 'react';
import { useActivity, ActivityContext } from "../context/ActivityProvider";

export default function ActivityCardList() {
  const {activityItems, setActivityItems} = useContext(ActivityContext);

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
          id={item.id}
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