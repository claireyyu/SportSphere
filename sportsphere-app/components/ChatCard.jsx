import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING, SIZE } from '../constants';
import { Avatar } from '@rneui/themed';

export default function ChatCard() {
  return (
    <View style={styles.cardContainer}>
      <Avatar
        size={SIZE.smallAvatar}
        rounded
        source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>jamie.franco</Text>
        <Text style={styles.message}>Yeap, I'm going to travel in To...</Text>
      </View>
      <Text style={styles.timestamp}>4h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: SIZE.tabBar,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  username: {
    fontSize: FONTSIZE.medium,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: SPACING.xsmall,
  },
  message: {
    fontSize: FONTSIZE.small,
    color: COLORS.secondaryText,
  },
  timestamp: {
    fontSize: FONTSIZE.small,
    color: COLORS.secondaryText,
    marginLeft: SPACING.small,
  },
});
