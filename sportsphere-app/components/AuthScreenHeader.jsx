import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global';


export default function ProfileScreenHeader({ navigation }) {
  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.welcomeText}>SportSphere</Text>
      <Text style={styles.introText}>Welcome Back!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: SIZE.profileHeader,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: ROUNDED.default,
    borderBottomRightRadius: ROUNDED.default,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  welcomeText: {
    fontSize: FONTSIZE.h0,
    color: COLORS.background,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.default,
  },
  introText: {
    fontSize: FONTSIZE.h2,
    color: COLORS.background,
    },
});
