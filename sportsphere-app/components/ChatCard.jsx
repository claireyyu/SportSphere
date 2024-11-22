import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTSIZE, SPACING, SIZE, ROUNDED } from '../global';
import { Avatar } from '@rneui/themed';
import PressableButton from './PressableButton';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';

export default function ChatCard({ username, message, timestamp, uid, isRead, messageId }) {
  const navigation = useNavigation();

  async function handleToChatDetail() {
    // Update the isRead field to true
    const messageDocRef = doc(db, 'messages', messageId);
    await updateDoc(messageDocRef, { isRead: true });

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
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
          {!isRead && <View style={styles.unreadBadge} />}
        </View>
      </View>
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    minHeight: SIZE.tabBar,
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
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    fontSize: FONTSIZE.small,
    color: COLORS.secondaryText,
    marginLeft: SPACING.medium,
  },
  unreadBadge: {
    width: SIZE.badge,
    height: SIZE.badge,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: ROUNDED.small,
    backgroundColor: COLORS.primary,
  },
});