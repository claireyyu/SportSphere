import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatCard from '../components/ChatCard'
import { COLORS, SPACING, FONTSIZE, SIZE } from '../global'
import ProfileActivityCardList from '../components/ProfileActivityCardList'
import PressableButton from '../components/PressableButton'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function JoinedActivitiesScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <PressableButton
        pressedFunction={() => navigation.goBack()}
        componentStyle={{marginTop: SPACING.xxl}}
      >
        <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.themeDark} />
      </PressableButton>
      <View>
        <Text style={styles.title}>Joined Activities</Text>
      </View>
      <View style={{marginTop: SPACING.l}}>
        <ProfileActivityCardList />
      </View>
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
    fontSize: FONTSIZE.header,
    marginTop: SPACING.l,
  }
})