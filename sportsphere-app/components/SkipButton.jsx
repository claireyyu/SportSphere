import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PressableButton from './PressableButton'
import { COLORS, FONTSIZE } from '../global'

export default function SkipButton({navigation}) {
  return (
    <PressableButton pressedFunction={()=>navigation.navigate("TabNavigator")}>
        <Text style={styles.Text}>Skip</Text>
    </PressableButton>

  )
}
export const styles = StyleSheet.create({
  Text: {
    color: COLORS.background,
    fontSize: FONTSIZE.small,
  }
})


