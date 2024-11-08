import ChatCard from './ChatCard.jsx';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../constants'

export default function ChatCardList({ navigation }) {
  const data = [
    { id: '1', username: 'jamie.franco', message: "Yeap, I'm going to travel in To...", timestamp: '4h' },
    { id: '2', username: 'john.doe', message: "Let's catch up tomorrow!", timestamp: '2d' },
    { id: '3', username: 'jane.smith', message: "Can you send me the report?", timestamp: '1w' },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatCard
          username={item.username}
          message={item.message}
          timestamp={item.timestamp}
          navigation={navigation}
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
    paddingVertical: SPACING.small,
    gap: SPACING.xsmall,
  },
})