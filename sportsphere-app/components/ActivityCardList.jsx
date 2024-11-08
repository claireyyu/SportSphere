import ActivityCard from "./ActivityCard";

import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../global'

export default function ActivityCardList() {
  const data = [
    {
      id: '1',
      activityName: 'Morning Yoga',
      venue: 'Central Park',
      time: '6:00 AM',
      peopleGoing: 15,
      totalMembers: 20,
      description: 'lorem ipsum dolor sit amet',
    },
    {
      id: '2',
      activityName: 'Tech Meetup',
      venue: 'Tech Hub',
      time: '10:00 AM',
      peopleGoing: 50,
      totalMembers: 100,
      description: 'lorem ipsum dolor sit amet',
    },
    {
      id: '3',
      activityName: 'Cooking Class',
      venue: 'Community Center',
      time: '2:00 PM',
      peopleGoing: 10,
      totalMembers: 15,
      description: 'lorem ipsum dolor sit amet',
    },
    {
      id: '4',
      activityName: 'Evening Run',
      venue: 'Riverside Park',
      time: '6:00 PM',
      peopleGoing: 25,
      totalMembers: 30,
      description: 'lorem ipsum dolor sit amet',
    },
    {
      id: '5',
      activityName: 'Book Club',
      venue: 'City Library',
      time: '7:00 PM',
      peopleGoing: 8,
      totalMembers: 10,
      description: 'lorem ipsum dolor sit amet',
    },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityCard
          activityName={item.activityName}
          venue={item.venue}
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