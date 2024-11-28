import React, { useEffect, useState, useContext } from 'react';
import { View, Modal, StyleSheet, TextInput, Text, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../global';
import { updateDB, writeToDB, writeToSubcollection, updateByCollectionRef } from '../Firebase/firebaseHelper';
import PressableButton from './PressableButton';
import { parse, format } from 'date-fns';
import DateInputer from './DateInputer';
import TimeInputer from './TimeInputer';
import { UserContext } from '../context/UserProvider';
import { db } from '../Firebase/firebaseSetup';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';

export default function AddReminder({ modalVisible, handleModalVisible, route }) {
  const { userProfile } = useContext(UserContext);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);

  function handleClearDate() { 
    setDate(new Date());
    setTime(new Date());
    setTitle('');
    setError('');
  }

  function handleToggleDatePicker() {
    handleClearDate();
    handleModalVisible();
  }

  useEffect(() => {
    if (route?.params) {
      const { title, date, time, id } = route.params;
      const dateObj = parse(date, 'MMM dd, yyyy', new Date());
      const formattedDate = format(dateObj, 'yyyy-MM-dd');
      const dateTimeString = `${formattedDate}T${time}:00`;
      const timeObj = new Date(dateTimeString);
      setTitle(title);
      setDate(dateObj);
      setTime(timeObj);
      setIsEditMode(true);
    }
  }, [route?.params]);

  function handleNewReminder() {
    try {
      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(time.getHours());
      selectedDateTime.setMinutes(time.getMinutes());
      const now = new Date();
      if (selectedDateTime < now) {
        setError("Date and time cannot be earlier than now!");
        setDate(now);
        setTime(now);
        return;
      }

      const newReminder = {
        owner: userProfile.uid,
        title: title || 'Untitled',
        date: date || new Date(),
        time: time || new Date(),
        turnedOn: true,
      };

      console.log("new reminder: ", newReminder);

      const parentPath = `users/${userProfile.userDocId}`;
      const subcollectionName = "reminders";
      const subcollectionRef = collection(doc(db, parentPath), subcollectionName);

      if (isEditMode) {
        updateByCollectionRef(route.params.id, newReminder, subcollectionRef);
        // updateDBByRef(route.params.id, newReminder, remindersRef);
        setIsEditMode(false);
      } else {
        writeToSubcollection(parentPath, subcollectionName, newReminder)
      }
      handleToggleDatePicker();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleModalVisible();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <DateInputer date={date} setDate={setDate} inputerStyle={styles.reminderInput} />
            <TimeInputer time={time} setTime={setTime}inputerStyle={styles.reminderInput} />
            <TextInput 
              // placeholder="Badminton with friends"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
            <View style={styles.btnContainer}>
              <PressableButton
                pressedFunction={handleToggleDatePicker}
                componentStyle={[styles.button, {backgroundColor: COLORS.themeLight}]}
              >
                <Text style={[styles.btnText, {backgroundColor: COLORS.themeLight, color: COLORS.theme}]}>Cancel</Text>
              </PressableButton>
              <PressableButton
                pressedFunction={() => {
                  handleNewReminder();
                }}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Confirm</Text>
              </PressableButton>
            </View>
            <Text style={styles.erroText}>{error}</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  btnContainer: {
    marginTop: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContainer: {
    marginHorizontal: SPACING.large,
    backgroundColor: COLORS.background,
    padding: SPACING.small,
    paddingVertical: SPACING.medium,
    borderRadius: ROUNDED.small,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reminderInput: {
    textAlign: 'center',
    borderColor: COLORS.border,
    marginHorizontal: SPACING.small,
    marginTop: SPACING.medium,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    marginTop: SPACING.medium,
    alignSelf: 'stretch',
    marginHorizontal: SPACING.medium,
    textAlign: 'center',
    color: COLORS.foreground,
  },
  button: {
    marginHorizontal: SPACING.small,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    backgroundColor: COLORS.theme,
  },
  btnText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  erroText: {
    color: COLORS.delete,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
    marginTop: SPACING.small,
    textAlign: 'center',
  },
});