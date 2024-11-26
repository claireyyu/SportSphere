import React, { createContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseSetup';
import dateTimeParser from '../utils/dateTimeParser';
import { Alert } from 'react-native';
import { UserContext } from './UserProvider';
import { useContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    async function verifyPermission() {
      try {
        const data = await Notifications.getPermissionsAsync();
        if (data.granted) {
          return true;
        }
        const permissionResponse = await Notifications.requestPermissionsAsync();
        return permissionResponse.granted;
      } catch (err) {
        console.log("verify permission ", err);
        return false;
      }
    }

    async function scheduleNotification(reminder, reminderId) {
      try {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
          Alert.alert("You need to give notification permission");
          return;
        }

        const trigger = dateTimeParser(reminder.date, reminder.time);
        console.log("Trigger date: ", trigger);

        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: reminder.title,
            body: 'Time for your workout!',
          },
          trigger,
        });

        console.log("Notification scheduled with id: ", id);

        // Delete reminder only after the notification is triggered
        const notificationListener = Notifications.addNotificationReceivedListener(async (notification) => {
          if (notification.request.identifier === id) {
            console.log("Notification triggered for id: ", id);
            await deleteDoc(doc(db, 'users', userProfile.userDocId, 'reminders', reminderId));
            console.log("Reminder deleted after triggering:", reminderId);
          }
        });

        // Handle notification response (when the app is in the background or closed)
        const responseListener = Notifications.addNotificationResponseReceivedListener(async (response) => {
          if (response.notification.request.identifier === id) {
            console.log("Notification response received for id: ", id);
            await deleteDoc(doc(db, 'users', userProfile.userDocId, 'reminders', reminderId));
            console.log("Reminder deleted after response:", reminderId);
          }
        });

        // Clean up listeners when the component unmounts
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      } catch (e) {
        console.error("Error scheduling notification: ", e);
      }
    }

    if (userProfile?.userDocId) {
      const remindersRef = collection(db, 'users', userProfile.userDocId, 'reminders');
      const unsubscribe = onSnapshot(remindersRef, (snapshot) => {
        snapshot.forEach((doc) => {
          const reminder = doc.data();
          console.log("Scheduling notification for reminder: ", reminder);
          scheduleNotification(reminder, doc.id);
        });
      });

      return () => unsubscribe();
    }
  }, [userProfile]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};