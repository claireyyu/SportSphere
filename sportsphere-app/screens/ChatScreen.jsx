import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatCard from '../components/ChatCard'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>ChatScreen</Text> */}
      <ChatCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})