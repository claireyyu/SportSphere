import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatCard from '../components/ChatCard'
import { COLORS, SPACING, FONTSIZE } from '../global'
import ChatCardList from '../components/ChatCardList'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Chats</Text>
      </View>
      <ChatCardList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l,
  },

  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.xxl,
  }
})