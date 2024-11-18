import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MessageScreenHeader from '../components/MessageScreenHeader';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseSetup';
import { COLORS, FONTSIZE, ROUNDED, SIZE, SPACING } from '../global';
import PressableButton from '../components/PressableButton';
import { Ionicons } from '@expo/vector-icons'; // Icon for the send button
import { format } from 'date-fns'; // Import date-fns for formatting

export default function MessageScreen({ route }) {
  const [uid, setUid] = useState(route.params.uid); // Chatting user's UID
  const [messages, setMessages] = useState([]); // List of messages
  const [text, setText] = useState(''); // Current text input
  const [loading, setLoading] = useState(true); // Loading state for fetching messages
  const [error, setError] = useState(null); // Error state for database issues

  const currentUserUid = auth.currentUser.uid; // Current user's UID

  // Fetch and listen for messages in real-time
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'messages'),
        where('participants', 'array-contains', currentUserUid),
        orderBy('timestamp', 'asc') // Order messages by timestamp in ascending order
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Filter messages specific to this chat
        setMessages(fetchedMessages.filter(msg => msg.participants.includes(uid)));
        setLoading(false); // Mark as loaded
      });

      return () => unsubscribe();
    } catch (err) {
      setError('Failed to fetch messages. Please try again later.');
      setLoading(false);
    }
  }, [currentUserUid, uid]);

  // Function to send a message
  const sendMessage = async () => {
    if (text.trim() === '') return; // Ignore empty messages

    try {
      await addDoc(collection(db, 'messages'), {
        text,
        sender: currentUserUid,
        recipient: uid,
        timestamp: new Date(),
        participants: [currentUserUid, uid], // Store both participants
      });
      setText(''); // Clear the input after sending
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <MessageScreenHeader uid={uid} />

      {/* Loading or Error State */}
      {loading && <Text>Loading messages...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const messageTime = format(item.timestamp.toDate(), 'HH:mm'); // Format the timestamp

          return (
            <View style={item.sender === currentUserUid ? styles.sentMessage : styles.receivedMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={[styles.messageTime]}>{messageTime}</Text>
            </View>
          )
        }}
        style={styles.messageList}
      />

      {/* Input and Send Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Send a message"
        />
        <PressableButton
          pressedFunction={sendMessage}
        >
          <Ionicons name="send" size={20} color={COLORS.primary} />
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  messageList: {
    flex: 1,
    padding: SPACING.small,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.message,
    padding: SPACING.small,
    marginVertical: SPACING.xsmall,
    borderRadius: SPACING.small,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.defaultBackground,
    padding: SPACING.small,
    marginVertical: SPACING.xsmall,
    borderRadius: ROUNDED.default,
  },
  messageText: {
    fontSize: FONTSIZE.body,
  },
  messageTime: {
    fontSize: FONTSIZE.tiny,
    color: COLORS.secondaryText,
    textAlign: 'right',
    marginTop: SPACING.xsmall,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.small,
    borderTopWidth: 1,
    borderTopColor: COLORS.defaultBackground,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    minHeight: SIZE.smallAvatar,
    borderColor: COLORS.defaultBackground,
    borderRadius: ROUNDED.small,
    paddingHorizontal: SPACING.small,
    marginRight: SPACING.small,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: SPACING.small,
  },
  btnText: {
    color: COLORS.background,
    fontSize: FONTSIZE.body,
  },
});
