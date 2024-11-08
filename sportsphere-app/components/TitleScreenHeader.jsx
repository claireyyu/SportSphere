import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, FONTSIZE } from '../global';


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
    fontSize: FONTSIZE.h2,
    color: COLORS.background,
    fontWeight: 'bold',
  },
});
