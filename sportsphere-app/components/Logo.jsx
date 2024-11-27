import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SIZE, FONTSIZE, ROUNDED, SPACING } from '../global'
import React from 'react'

export default function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <MaterialCommunityIcons name="badminton" size={SIZE.logo} color={COLORS.theme} />
      </View>
      <Text style={styles.title}>SportSphere</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.themeLight,
    alignItems: 'center',
  },
  logo: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.s,
    borderRadius: ROUNDED.m,
  },
  title: {
    fontFamily: 'Rubik_500Medium',
    fontSize: FONTSIZE.h0,
    color: COLORS.foreground,
    textAlign: 'center',
    marginLeft: SPACING.s,
  },
})