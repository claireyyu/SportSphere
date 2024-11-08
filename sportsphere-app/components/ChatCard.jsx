import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING, SIZE } from '../global';
import { Avatar } from '@rneui/themed';
import PressableButton from './PressableButton';

export default function ChatCard({ username, message, timestamp, navigation }) {
  function handleToChatDetail() {
    navigation.navigate('ChatDetail');
  }

  return (
    <PressableButton
      componentStyle={styles.cardContainer}
      pressedFunction={handleToChatDetail}
    >
      <Avatar
        size={SIZE.smallAvatar}
        rounded
        source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </PressableButton>
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
    fontSize: FONTSIZE.body,
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
