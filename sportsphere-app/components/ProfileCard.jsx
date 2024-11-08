import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '@rneui/themed';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import { ProgressBar } from './ProgressBar';
import PressableButton from './PressableButton';
  
export default function ProfileCard({name, email, bio}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.infoText}>{name}</Text>
      </View>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Bio</Text>
        <Text style={styles.infoText}>{bio}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.medium,
    padding: SPACING.medium,
    margin: SPACING.medium,
    // Shadow properties
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  profileCardRow: {
    flexDirection: 'row',
    gap: SPACING.small,
  },
  title: {
    fontSize: FONTSIZE.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  infoText: {
    fontSize: FONTSIZE.medium,
    color: COLORS.secondaryText,
    marginBottom: SPACING.xsmall,
  },
});
