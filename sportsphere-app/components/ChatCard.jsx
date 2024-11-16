import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING, SIZE } from '../global';
import { Avatar } from '@rneui/themed';
import PressableButton from './PressableButton';
import { useNavigation } from '@react-navigation/native';

export default function ChatCard({ username, message, timestamp, uid }) {
  const navigation = useNavigation();
  function handleToChatDetail() {
    navigation.navigate('Message', { uid });
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
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
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
  container: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: SPACING.medium,
  },
  username: {
    flex: 1,
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: SPACING.xsmall,
  },
  timestamp: {
    flex: 1,
    fontSize: FONTSIZE.small,
    color: COLORS.secondaryText,
    marginLeft: SPACING.small,
  },
  message: {
    fontSize: FONTSIZE.small,
    color: COLORS.secondaryText,
    marginLeft: SPACING.medium,
  },
});
