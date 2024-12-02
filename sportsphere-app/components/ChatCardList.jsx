import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatCard from './ChatCard.jsx';
import { SPACING } from '../global.js';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup'; // Ensure you have Firebase setup
import { findUserByUid } from '../Firebase/firebaseHelper.js'; // Helper to find username by UID
import { format } from 'date-fns'; // Import for timestamp formatting
import { UserContext } from '../context/UserProvider';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { useFocusEffect } from "@react-navigation/native";
import { readAllFiles } from '../Firebase/firebaseHelper';

export default function ChatCardList() {
  const [conversations, setConversations] = useState([]); // State to hold grouped conversations
  const usernamesCache = useRef({}); // Cache to store usernames using a ref
  const { userProfile } = useContext(UserContext);
  const currentUserUid = userProfile.uid; // Current user's UID
  
  useEffect(() => {
    async function getProfileDownloadURL(profileUploadURL) {
      try {
        if (profileUploadURL) {
          const imageRef = ref(storage, profileUploadURL);
          const downloadURL = await getDownloadURL(imageRef);
          console.log("Profile picture URL:", downloadURL);
          return downloadURL;
        }
      } catch (err) {
        console.log("Error getting profile picture URL: ", err);
        return null;
      }
    }

    // Query Firestore for messages involving the current user, ordered by timestamp
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUserUid),
      orderBy('timestamp', 'asc') // Order messages by timestamp in descending order
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Group messages by other user's UID
      const groupedConversations = {};
      const fetchData = async () => {
        for (const msg of messages) {
          const otherUserUid = msg.participants.find((uid) => uid !== currentUserUid);
          const user = await findUserByUid(otherUserUid);
          let profileDownloadURL = null;

          if (user && user.userInfo && user.userInfo.profilePicture) {
            const profileUploadURL = user.userInfo.profilePicture;
            profileDownloadURL = await getProfileDownloadURL(profileUploadURL);
          }

          // If this conversation doesn't exist, initialize it
          if (!groupedConversations[otherUserUid]) {
            groupedConversations[otherUserUid] = [];
          }

          groupedConversations[otherUserUid].push({ ...msg, profileDownloadURL }); // Add message to this conversation
        }

        // Process each group to determine the display data
        const processedConversations = [];
        for (const otherUserUid in groupedConversations) {
          const conversationMessages = groupedConversations[otherUserUid];

          // Find the latest message in the conversation
          const latestMessage = conversationMessages[conversationMessages.length - 1]; // Messages are already sorted by timestamp descending

          // Trim the message text to 10 words
          const messageWords = latestMessage.text.split(' ');
          const trimmedMessage = messageWords.length > 10 ? messageWords.slice(0, 10).join(' ') + '...' : latestMessage.text;

          // Format the timestamp
          const formattedTimestamp = format(latestMessage.timestamp.toDate(), 'HH:mm');

          // Fetch the username (cache it if not already cached)
          if (!usernamesCache.current[otherUserUid]) {
            const user = await findUserByUid(otherUserUid);
            if (user?.userInfo?.username) {
              usernamesCache.current[otherUserUid] = user.userInfo.username;
            } else {
              usernamesCache.current[otherUserUid] = 'Unknown'; // Fallback for missing users
            }
          }

          // Determine if the message is unread
          const unreadStatus = latestMessage.recipient === currentUserUid && latestMessage.isUnread;

            processedConversations.push({
            id: latestMessage.id, // Use the latest message ID as unique key
            uid: otherUserUid,
            username: usernamesCache.current[otherUserUid], // Use cached username
            message: trimmedMessage,
            timestamp: formattedTimestamp,
            isUnread: unreadStatus, // Pass the isRead status
            messageId: latestMessage.id, // Pass the message ID
            recipientId: latestMessage.recipient,
            otherUserAvatar: latestMessage.profileDownloadURL, // Use the profileDownloadURL from the latest message
            });
        }

        // Update state with processed conversations
        setConversations(processedConversations);
      };

      fetchData();
    });

    return () => unsubscribe(); // Clean up Firestore listener
  }, [currentUserUid]);

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
          recipientId={item.recipientId}
          otherUserAvatar={item.otherUserAvatar}
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