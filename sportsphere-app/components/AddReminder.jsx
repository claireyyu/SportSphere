import React, { useState } from 'react'
import { View, Modal, StyleSheet, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, ROUNDED } from '../global'
import { writeToDB } from '../Firebase/firebaseHelper';

export default function AddReminder({modalVisible, handleModalVisible}) {
  const [time, setTime] = useState(null);
  function handleNewReminder() {
    const newReminder = {
      time: time,
      turnedOn: true,
    }
    writeToDB(newReminder, "reminders");
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
              value={time || new Date()} // Ensure a valid date object is passed
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                console.log('Time picked:', selectedTime);
                if (selectedTime) {
                  setTime(selectedTime); // Update temporary time state
                }
              }}
            />
            <Button
              title="Confirm"
              onPress={() => {
                setTime(time); // Confirm the time when button is pressed
                handleModalVisible();
                handleNewReminder();
              }}
            />
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
})
