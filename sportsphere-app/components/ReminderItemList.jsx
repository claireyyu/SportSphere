import React from 'react';
import { StyleSheet, Text, View, Switch, FlatList, Alert, Pressable } from 'react-native';
import { COLORS, FONTSIZE, SPACING, ROUNDED, SHADOW } from '../global';
import { useEffect } from 'react';
import { readAllFiles, updateDB, deleteDB } from '../Firebase/firebaseHelper';
import { parse, format } from 'date-fns';
import PressableButton from './PressableButton';
import EditReminderModal from './EditReminderModal';
import { UserContext } from '../context/UserProvider';

export default function ReminderItemList() {
  const { userProfile } = React.useContext(UserContext);
  const [reminderItems, setReminderItems] = React.useState([]);

  const collectionName = "reminders";
  
  function handleReminderItems(reminderItems) {
    setReminderItems(reminderItems);
  }

  useEffect(() => {
    readAllFiles(collectionName, setReminderItems, (error) => {
      Alert.alert("Error fetching reminders", error.message);
    });
  }, []);

  const filteredReminderItems = reminderItems.filter(item => item.owner === userProfile.uid);

  return (
    <FlatList
      data={filteredReminderItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReminderItem title={item.title} time={item.time} date={item.date} id={item.id} reminderItemHandler = {handleReminderItems} />)}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

function ReminderItem({ title, time, date, id, reminderItemHandler }) {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  function handleModalVisible() {
    setModalVisible(!modalVisible);
  }

  function toggleSwitch(id) {
    const dateObj = parse(date, 'MMM dd, yyyy', new Date());
    const formattedDate = format(dateObj, 'yyyy-MM-dd');
    const dateTimeString = `${formattedDate}T${time}:00`;
    const timeObj = new Date(dateTimeString);
    
    const newReminder = {
      title,
      time: timeObj,
      date: dateObj,
      turnedOn: !isEnabled,
    };
    updateDB(id, newReminder, "reminders");
    setIsEnabled(previousState => !previousState);
  }

  function handleDelete() {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", 
          onPress: () => {
            deleteDB(id, "reminders")
            reminderItemHandler(prevItems => prevItems.filter(item => item.id !== id));
          },
        }
      ]
    );

  }


  return (
    <View>
    <PressableButton
        pressedFunction={handleModalVisible}
        onLongPress={handleDelete}
        childrenStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}> 
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Switch
        trackColor={{ false: COLORS.background, true: COLORS.primary }}
        thumbColor={isEnabled ? COLORS.background : COLORS.background}
        onValueChange={() => toggleSwitch(id)}
        value={isEnabled}
      />
    </View>
    </PressableButton>
    <EditReminderModal modalVisible={modalVisible} handleModalVisible={handleModalVisible} route={{params: {title, time, date, id}}} />
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
    fontSize: FONTSIZE.h0,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  date: {
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
  },
});