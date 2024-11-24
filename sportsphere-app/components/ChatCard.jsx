import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, SIZE, ROUNDED } from '../global';
import { Avatar } from '@rneui/themed';
import PressableButton from './PressableButton';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';
import { query, collection, where, getDocs, deleteDoc } from 'firebase/firestore';

export default function ChatCard({ username, message, timestamp, uid, isUnread, messageId, currentUserUid, recipientId }) {
  const navigation = useNavigation();

  async function handleToChatDetail() {
    // Update the isRead field to true
    navigation.navigate('Message', { uid });
    console.log('recipientId', recipientId);
    console.log('currentUserUid', currentUserUid);
    if (recipientId === currentUserUid) {
      const messageDocRef = doc(db, 'messages', messageId);
      await updateDoc(messageDocRef, { isUnread: false });
    }
  }

  async function handleDeleteChat() {
    try {
      const q = query(
        collection(db, 'messages'),
        where('participants', 'array-contains', currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (data.participants.includes(uid)) {
          await deleteDoc(docSnapshot.ref);
        }
      });

      await Promise.all(deletePromises);
      Alert.alert('Chat deleted successfully');
    } catch (error) {
      console.error('Error deleting chat: ', error);
      Alert.alert('Error deleting chat');
    }
  }


  function confirmDeleteChat() {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: handleDeleteChat },
      ],
      { cancelable: true }
    );
  }


  return (
    <PressableButton
      componentStyle={styles.cardContainer}
      pressedFunction={handleToChatDetail}
      onLongPress={confirmDeleteChat}
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
          {isUnread && <View style={styles.unreadBadge} />}
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
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