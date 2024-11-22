import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatCard from './ChatCard.jsx';
import { SPACING } from '../global.js';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseSetup'; // Ensure you have Firebase setup
import { findUserByUid } from '../Firebase/firebaseHelper.js'; // Helper to find username by UID
import { format } from 'date-fns'; // Import for timestamp formatting
import { UserContext } from '../context/UserProvider';

export default function ChatCardList() {
  const [conversations, setConversations] = useState([]); // State to hold grouped conversations
  const [usernamesCache, setUsernamesCache] = useState({}); // Cache to store usernames
  const { userProfile } = useContext(UserContext);
  const currentUserUid = userProfile.uid; // Current user's UID

  useEffect(() => {
    // Query Firestore for messages involving the current user, ordered by timestamp
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUserUid),
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Group messages by other user's UID
      const groupedConversations = {};
      messages.forEach((msg) => {
        const otherUserUid = msg.participants.find((uid) => uid !== currentUserUid);

        // If this conversation doesn't exist, initialize it
        if (!groupedConversations[otherUserUid]) {
          groupedConversations[otherUserUid] = [];
        }

        groupedConversations[otherUserUid].push(msg); // Add message to this conversation
      });

      // Process each group to determine the display data
      const processedConversations = [];
      for (const otherUserUid in groupedConversations) {
        const conversationMessages = groupedConversations[otherUserUid];

        // Find the latest message in the conversation
        const latestMessage = conversationMessages[0]; // Messages are already sorted by timestamp descending

        // Trim the message text to 10 words
        const trimmedMessage = latestMessage.text.split(' ').slice(0, 10).join(' ') + '...';

        // Format the timestamp
        const formattedTimestamp = format(latestMessage.timestamp.toDate(), 'HH:mm - MMM dd, yyyy');

        // Fetch the username (cache it if not already cached)
        if (!usernamesCache[otherUserUid]) {
          const user = await findUserByUid(otherUserUid);
          if (user?.userInfo?.username) {
            usernamesCache[otherUserUid] = user.userInfo.username;
          } else {
            usernamesCache[otherUserUid] = 'Unknown'; // Fallback for missing users
          }
        }

        processedConversations.push({
          id: latestMessage.id, // Use the latest message ID as unique key
          uid: otherUserUid,
          username: usernamesCache[otherUserUid], // Use cached username
          message: trimmedMessage,
          timestamp: formattedTimestamp,
          isUnread: latestMessage.isUnread, // Pass the isRead status
          messageId: latestMessage.id, // Pass the message ID
        });
      }

      // Update state with processed conversations
      setUsernamesCache({ ...usernamesCache }); // Ensure state is updated
      setConversations(processedConversations);
    });

    return () => unsubscribe(); // Clean up Firestore listener
  }, [currentUserUid, usernamesCache]);

  return (
    <FlatList
      data={conversations} // Bind grouped conversations to FlatList
      keyExtractor={(item) => item.id} // Use the latest message ID as key
      renderItem={({ item }) => (
        <ChatCard
          uid={item.uid}
          currentUserUid={currentUserUid}
          username={item.username}
          message={item.message}
          timestamp={item.timestamp}
          isUnread={item.isUnread} // Pass the isRead status
          messageId={item.messageId} // Pass the message ID
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    // paddingVertical: SPACING.small,
    // gap: SPACING.xsmall,
  },
});