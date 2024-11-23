import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatCard from '../components/ChatCard'
import { COLORS } from '../global'
import ChatCardList from '../components/ChatCardList'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <ChatCardList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})