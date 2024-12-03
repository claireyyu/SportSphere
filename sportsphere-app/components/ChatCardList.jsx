import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
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
import LottieView from 'lottie-react-native';

export default function ChatCardList() {
  const [conversations, setConversations] = useState([]); // State to hold grouped conversations
  const usernamesCache = useRef({}); // Cache to store usernames using a ref
  const avatarCache = useRef({}); // Cache to store avatars using a ref
  const { userProfile } = useContext(UserContext);
  const currentUserUid = userProfile.uid; // Current user's UID
  const [isLoading, setIsLoading] = useState(null); // Loading state for fetching messages

  useEffect(() => {
    setIsLoading(true);
    async function getProfileDownloadURL(profileUploadURL, otherUserUid) {
      try {
        if (profileUploadURL) {
          // Check cache first
          if (avatarCache.current[otherUserUid]) {
            return avatarCache.current[otherUserUid];
          }

          const imageRef = ref(storage, profileUploadURL);
          const downloadURL = await getDownloadURL(imageRef);

          // Store in cache
          avatarCache.current[otherUserUid] = downloadURL;
          console.log(`Fetched and cached avatar for user ${otherUserUid}:`, downloadURL);
          return downloadURL;
        }
      } catch (err) {
        console.log("Error getting profile picture URL: ", err);
        return null;
      }
    }

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

      const groupedConversations = {};
      const fetchData = async () => {
        for (const msg of messages) {
          const otherUserUid = msg.participants.find((uid) => uid !== currentUserUid);
          const user = await findUserByUid(otherUserUid);

          let profileDownloadURL = null;
          if (user && user.userInfo && user.userInfo.profilePicture) {
            const profileUploadURL = user.userInfo.profilePicture;
            profileDownloadURL = await getProfileDownloadURL(profileUploadURL, otherUserUid); // Pass UID for caching
          }

          if (!groupedConversations[otherUserUid]) {
            groupedConversations[otherUserUid] = [];
          }

          groupedConversations[otherUserUid].push({ ...msg, profileDownloadURL });
        }

        const processedConversations = [];
        for (const otherUserUid in groupedConversations) {
          const conversationMessages = groupedConversations[otherUserUid];
          const latestMessage = conversationMessages[conversationMessages.length - 1];

          const messageWords = latestMessage.text.split(' ');
          const trimmedMessage = messageWords.length > 10 ? messageWords.slice(0, 10).join(' ') + '...' : latestMessage.text;

          const formattedTimestamp = format(latestMessage.timestamp.toDate(), 'HH:mm');

          if (!usernamesCache.current[otherUserUid]) {
            const user = await findUserByUid(otherUserUid);
            if (user?.userInfo?.username) {
              usernamesCache.current[otherUserUid] = user.userInfo.username;
            } else {
              usernamesCache.current[otherUserUid] = 'Unknown';
            }
          }

          const unreadStatus = latestMessage.recipient === currentUserUid && latestMessage.isUnread;

          processedConversations.push({
            id: latestMessage.id,
            uid: otherUserUid,
            username: usernamesCache.current[otherUserUid],
            message: trimmedMessage,
            timestamp: formattedTimestamp,
            isUnread: unreadStatus,
            messageId: latestMessage.id,
            recipientId: latestMessage.recipient,
            otherUserAvatar: latestMessage.profileDownloadURL, // Cached or fetched URL
          });
        }

        setConversations(processedConversations);
        setIsLoading(false);
      };

      fetchData();
    });

    return () => unsubscribe();
  }, [currentUserUid]);

  return (
    isLoading ? <View style={styles.animation}>
      <LottieView source={require('../assets/kickSoccer.json')} autoPlay loop style={{ width: 100, height: 100 }} />
      <Text style={{fontFamily: 'Montserrat_600SemiBold'}}>Loading...</Text>
    </View>
    : (
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatCard
            uid={item.uid}
            currentUserUid={currentUserUid}
            username={item.username}
            message={item.message}
            timestamp={item.timestamp}
            isUnread={item.isUnread}
            messageId={item.messageId}
            recipientId={item.recipientId}
            otherUserAvatar={item.otherUserAvatar}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    )
  );
}


const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    // paddingVertical: SPACING.small,
    // gap: SPACING.xsmall,
  },
  animation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});