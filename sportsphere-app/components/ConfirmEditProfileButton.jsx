import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import { COLORS, FONTSIZE } from '../constants'

export default function ConfirmEditProfileButton() {
  return (
    <PressableButton>
      <Text style={styles.btnText}>Done</Text>
    </PressableButton>
  )
}

const styles = StyleSheet.create({
  btnText: {
    color: COLORS.background,
    fontSize: FONTSIZE.medium,
  },
})