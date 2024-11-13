import React from 'react';
import { View, TextInput, StyleSheet, Modal, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { COLORS, ROUNDED, FONTSIZE, SPACING } from '../global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableButton from './PressableButton';

export default function TimeInput({ time, setTime, timePicker, timePickerHandler }) {
  const displayTime = time ? format(time, 'HH:mm') : '';

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime); // Update time state directly
      if (Platform.OS === 'android') {
        timePickerHandler(false); // Close picker on Android
      }
    } else {
      if (Platform.OS === 'android') {
        timePickerHandler(false); // Close picker on Android
      }
    }
  };

  return (
    <SafeAreaView>
        <TextInput
          style={styles.input}
          value={displayTime}
          onFocus={() => timePickerHandler(true)}
        />

      {Platform.OS === 'ios' ? (
        // iOS Modal with Confirm Button
        <Modal
          transparent={true}
          animationType="slide"
          visible={timePicker}
          onRequestClose={() => timePickerHandler(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={time || new Date()}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
              <Button
                title="Confirm"
                onPress={() => {
                  timePickerHandler(false);
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      ) : (
        // Android DateTimePicker without Modal
        timePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputButton: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    flex: 1,
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