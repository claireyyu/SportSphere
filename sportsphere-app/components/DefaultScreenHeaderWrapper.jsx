import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZE } from '../constants'

export default function DefaultScreenHeaderWrapper({children}) {
  return (
    <View style={styles.headerContainer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {  
    height: SIZE.headerBar,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.background,
  },
})