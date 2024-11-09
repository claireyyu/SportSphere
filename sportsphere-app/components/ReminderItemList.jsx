import React from 'react';
import { StyleSheet, Text, View, Switch, FlatList, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, ROUNDED, SHADOW } from '../global';
import { db } from "../Firebase/firebaseSetup";
import { onSnapshot, collection, doc, query, where } from "firebase/firestore";
import { useEffect } from 'react';

export default function ReminderItemList() {
  const [reminderItems, setReminderItems] = React.useState([]);

  const collectionName = "reminders";
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (querySnapshot) => {
      const currReminderItems = [];
      querySnapshot.forEach((docSnapshot) => {
        const id = docSnapshot.id;
        const data = docSnapshot.data();
        if (!data.time || !data.date) {
          console.log("No date or time data found for reminder with id", id);
          return;
        }

        const dtDate = new Date(data.date.seconds * 1000);
        // Format date to "Aug 24, 2024"
        const date = dtDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        });
        
        const dtTime = new Date(data.time.seconds * 1000);
        // Format time to "14:32" (24-hour format)
        const time = dtTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });

        console.log(`Date: ${date}`);
        console.log(`Time: ${time}`);
        currReminderItems.push({ ...data, id, time, date, dtCombined: new Date(`${dtDate.toISOString().split('T')[0]}T${time}:00`) });
      });
      currReminderItems.sort((a, b) => a.dtCombined - b.dtCombined);
      setReminderItems(currReminderItems);
    }, (error) => {
      console.log("on snapshot", error);
      Alert.alert("Error", error.message);
    });

    return () => {
      console.log("unsubscribing");
      unsubscribe();
    };
  }, []);


  return (
    <FlatList
      data={reminderItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReminderItem title={item.title} time={item.time} date={item.date} />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

function ReminderItem({ title, time, date }) {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Switch
        trackColor={{ false: COLORS.background, true: COLORS.primary }}
        thumbColor={isEnabled ? COLORS.background : COLORS.background}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: SPACING.large,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  title: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    marginBottom: SPACING.xsmall,
    color: COLORS.foreground,
  },
  time: {
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  date: {
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
  },
});