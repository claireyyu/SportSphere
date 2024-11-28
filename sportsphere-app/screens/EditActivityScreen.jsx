import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING, COLORS, FONTSIZE } from '../global'

export default function EditActivityScreen({ route }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New Activity</Text>
      </View>
      <AddActivityCard route={route}/>
  </View>
)
}
export const styles = StyleSheet.create({
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
