import React, { useState } from 'react'
import { View, Modal, StyleSheet, Button, TextInput, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, ROUNDED, SPACING } from '../global'
import { writeToDB } from '../Firebase/firebaseHelper';
import DatePicker from './DatePicker';
import PressableButton from './PressableButton';

export default function AddReminder({ modalVisible, handleModalVisible }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleClearDate() { 
    setDate(null);
    setTime(null);
    setTitle('');
  }

  function handleToggleDatePicker() {
    handleClearDate();
    handleModalVisible();
  }

  function handleNewReminder() {
    try {
      const newReminder = {
        title: title,
        date: date || new Date(),
        time: time || new Date(),
        turnedOn: true,
      };
      writeToDB(newReminder, "reminders");
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
          handleModalVisible()
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={time || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                console.log('Time picked:', selectedTime);
                if (selectedTime) {
                  setTime(selectedTime); // Update temporary time state
                }
              }}
            />
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                console.log('Date picked:', selectedDate);
                if (selectedDate) {
                  setDate(selectedDate); // Update temporary time state
                }
              }}
            />
            <TextInput 
              placeholder="Badminton with friends"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
            <View style={styles.btnContainer}>
              <PressableButton
                pressedFunction={handleToggleDatePicker}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </PressableButton>
              <PressableButton
                pressedFunction={() => {
                  // setTime(time); // Confirm the time when button is pressed
                  handleNewReminder();
                  handleToggleDatePicker();
                }}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Confirm</Text>
              </PressableButton>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
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
      backgroundColor: COLORS.background,
      width: 250,
      padding: 20,
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
  titleInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    marginTop: SPACING.medium,
    alignSelf: 'stretch',
    marginHorizontal: SPACING.medium,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: SPACING.small,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
})
