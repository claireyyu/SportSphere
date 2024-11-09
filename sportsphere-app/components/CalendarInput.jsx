import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { COLORS, ROUNDED, FONTSIZE, SPACING } from '../global'

// CalendarInput component
export default function CalendarInput({date, setDate, datePicker, datePickerHandler}) {

  // Format the date to display in the
  const displayDate = date ? format(date, 'EEE, MMM dd, yyyy'):'';

  // Return the JSX to display the input field and the date picker
  return (
    <View>
      <TextInput
        style={styles.input}
        value={displayDate}
        onFocus={() => {
          console.log('onFocus'); // Correct place for console.log
          datePickerHandler(true);
        }}
        />
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()} 
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              console.log('Date picked:', selectedDate); 
              datePickerHandler(false);
              if (selectedDate) {
                setDate(selectedDate);
              } else {
                setDate(new Date());
              }
            }}
          />
        )}
    </View>
  )
}

export const styles = StyleSheet.create({
  input: {
    height: 35,
    marginTop: SPACING.small,
    marginBottom: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    borderRadius: ROUNDED.small,
    fontSize: FONTSIZE.body,
    color: COLORS.text,
  },
})