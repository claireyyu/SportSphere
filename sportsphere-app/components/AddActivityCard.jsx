import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import CalendarInput from './CalendarInput';

export default function AddActivityCard() {
  [sportName, setSportName] = useState('');
  [venue, setVenue] = useState('');
  [date, setDate] = useState('');
  [time, setTime] = useState('');
  [totalMembers, setTotalMembers] = useState(0);
  [description, setDescription] = useState('');
  [showDatePicker, setShowDatePicker] = useState(false);
  [showTimePicker, setShowTimePicker] = useState(false);

  function handleDate() {
    setDate(date);
  }
  function handleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }
  return (
    <View style={styles.cardContainer}>
        <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Sports: </Text>
            <TextInput 
                style={styles.input}
                onChangeText={setSportName}
                value={sportName}
                placeholder="Enter the name of your activity"
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Venue: </Text>
            <TextInput 
                style={styles.input}
                onChangeText={setVenue}
                value={venue}
                placeholder="Enter the location of your activity"
            />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.textInfo}>Date: </Text>
            <CalendarInput date={date} setDate={handleDate} datePicker={showDatePicker} datePickerHandler={handleDatePicker}/>
        </View>
    </View>
  )
}

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.background,
        borderRadius: ROUNDED.medium,
        padding: SPACING.medium,
        margin: SPACING.medium,
        // Shadow properties
        shadowColor: SHADOW.color,
        shadowOffset: SHADOW.offset,
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        elevation: SHADOW.elevation,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.inputArea,
        borderRadius: ROUNDED.small,
        width: '80%',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: showDatePicker?'':'center',
      },
      textInfo: {
        fontSize: FONTSIZE.medium,
        fontWeight: 'bold',
        color: COLORS.text,
      },
    });
