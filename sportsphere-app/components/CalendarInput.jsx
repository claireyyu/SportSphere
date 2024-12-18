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
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()} 
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => {
              console.log('Date picked:', selectedDate); 
              if (selectedDate) {
                setDate(selectedDate);
              }
              console.log('Date:', date);
            }}
          />
        )}
    </View>
  )
}

export const styles = StyleSheet.create({
  input: {
    height: 35,
    marginTop: SPACING.xsmall,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
    padding: 5,
    borderRadius: ROUNDED.small,
    fontSize: FONTSIZE.body,
    color: COLORS.text,
  },
})