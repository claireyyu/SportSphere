import React from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'
import { SPACING, COLORS, FONTSIZE, SIZE } from '../global'
import PressableButton from '../components/PressableButton'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function EditActivityScreen({ route }) {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <PressableButton
        pressedFunction={() => navigation.goBack()}
        componentStyle={{marginTop: SPACING.xxl}}
      >
        <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.theme} />
      </PressableButton>
      <View>
        <Text style={styles.title}>Edit Activity</Text>
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
