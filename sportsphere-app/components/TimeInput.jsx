import React from 'react'
import { View, TextInput, StyleSheet, Modal, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { COLORS, ROUNDED, FONTSIZE } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TimeInput({time, setTime, timePicker, timePickerHandler}) {

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
        {/* {timePicker && (
          <DateTimePicker
            value={time || new Date()} 
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              console.log('Time picked:', selectedTime); 
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
            onBlur={() => {
              console.log('onBlur'); 
              timePickerHandler(false);
            }}
          />
        )} */}
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
                timePickerHandler(false);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
      </SafeAreaView>
    </SafeAreaView>
  )
}
export const styles = StyleSheet.create({
    input: {
        height: 35,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        padding: 5,
        backgroundColor: COLORS.inputArea,
        borderRadius: ROUNDED.small,
        fontSize: FONTSIZE.medium,
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
        borderRadius: ROUNDED.medium,
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