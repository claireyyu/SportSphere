import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'

export default function NotificationManager() {

  async function verifyPermission() {
    try {
      const data = await Notifications.getPermissionsAsync();
      if (data.granted) {
        return true;
      }
      const permissionResponse = await Notifications.requestPermissionsAsync();
      //else ask for permission
      //return the granted property of the response
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }

  async function sendNotification() {
    try {// send notification
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give notification permission");
        return;
      }
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'This is a reminder!',
        body: 'A notification was sent to you.',
      },
      trigger: {
        seconds: 3,
        // type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        
      },
    })
      console.log("Notification sent with id: ", id);
    } catch (e) {
      console.error("Error sending notification: ", e);
    }
  }

  return (
    <View>
      <Button title="Send a Notification" onPress={sendNotification} />
    </View>
  )
}

const styles = StyleSheet.create({})