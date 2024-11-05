import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, ROUNDED } from '../constants';
import CustomSearchBar from './CustomSearchBar';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreenHeader() {


  return (
    <SafeAreaView style={styles.view}>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    minHeight: 200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: ROUNDED.medium,
    borderBottomRightRadius: ROUNDED.medium,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },

});
