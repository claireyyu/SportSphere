import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Modal, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { COLORS, ROUNDED, FONTSIZE, SPACING } from '../global';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TimeInput({ time, setTime, timePicker, timePickerHandler }) {
  const [tempTime, setTempTime] = useState(time || new Date());

  const displayTime = time ? format(time, 'HH:mm') : '';

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        value={displayTime}
        onFocus={() => {
          console.log('onFocus');
          timePickerHandler(true);
        }}
      />
      <SafeAreaView style={styles.modalContainer}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={timePicker}
          onRequestClose={() => {
            timePickerHandler(false);
          }}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempTime}
                mode="time"
                display="spinner"
                onChange={(event, selectedTime) => {
                  console.log('Time picked:', selectedTime);
                  if (selectedTime) {
                    const now = new Date();
                    const selectedDateTime = new Date();
                    selectedDateTime.setHours(selectedTime.getHours());
                    selectedDateTime.setMinutes(selectedTime.getMinutes());
                    if (selectedDateTime < now) {
                      Alert.alert("Invalid Time", "Time cannot be earlier than the current time.");
                      setTempTime(now);
                    } else {
                      setTempTime(selectedTime); // Update temporary time state
                    }
                  }
                }}
              />
              <Button
                title="Confirm"
                onPress={() => {
                  setTime(tempTime);
                  timePickerHandler(false);
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    marginTop: SPACING.xsmall,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
    padding: 5,
    backgroundColor: COLORS.inputArea,
    borderRadius: ROUNDED.small,
    fontSize: FONTSIZE.body,
    color: COLORS.text,
  },
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
});