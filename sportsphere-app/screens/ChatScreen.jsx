import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatCard from '../components/ChatCard'
import { COLORS } from '../constants'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: COLORS.background,
  },
})