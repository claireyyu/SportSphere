import ActivityCard from "./ActivityCard";

import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../constants'

export default function ActivityCardList() {
  const data = [
    {
      id: '1',
      title: 'Morning Yoga',
      location: 'Central Park',
      time: '6:00 AM',
      peopleGoing: 15,
      totalPeople: 20,
    },
    {
      id: '2',
      title: 'Tech Meetup',
      location: 'Tech Hub',
      time: '10:00 AM',
      peopleGoing: 50,
      totalPeople: 100,
    },
    {
      id: '3',
      title: 'Cooking Class',
      location: 'Community Center',
      time: '2:00 PM',
      peopleGoing: 10,
      totalPeople: 15,
    },
    {
      id: '4',
      title: 'Evening Run',
      location: 'Riverside Park',
      time: '6:00 PM',
      peopleGoing: 25,
      totalPeople: 30,
    },
    {
      id: '5',
      title: 'Book Club',
      location: 'City Library',
      time: '7:00 PM',
      peopleGoing: 8,
      totalPeople: 10,
    },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityCard
          title={item.title}
          location={item.location}
          time={item.time}
          peopleGoing={item.peopleGoing}
          totalPeople={item.totalPeople}
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