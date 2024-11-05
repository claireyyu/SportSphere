import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, FONTSIZE } from '../constants';


export default function TitleScreenHeader({title}) {

  return (
    <DefaultScreenHeaderWrapper>
      <SafeAreaView style={styles.view}>
        <Text style={styles.title}>{title}</Text>
      </SafeAreaView>
    </DefaultScreenHeaderWrapper>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  title: {
    fontSize: FONTSIZE.large,
    color: COLORS.background,
    fontWeight: 'bold',
  },
});
