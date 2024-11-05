import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, ROUNDED, SIZE } from '../constants';

export function ProgressBar({ value, total }) {
  const progress = (value / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    height: SIZE.progressBar,
    backgroundColor: COLORS.lightGray,
    borderRadius: ROUNDED.large,
    borderColor: COLORS.primary,
    borderWidth: 1,
    overflow: 'hidden',
    flex: 1,
  },
  progressBar: {
    height: SIZE.progressBar,
    backgroundColor: COLORS.primary,
  },
});
