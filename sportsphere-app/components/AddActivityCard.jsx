import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import CalendarInput from './CalendarInput';
import TimeInput from './TimeInput';


export default function AddActivityCard() {
  const [sportName, setSportName] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [totalMembers, setTotalMembers] = useState(0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleDate(date) {
    setDate(date);
  }
  function handleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }
  function handleTime(time) {
    setTime(time);
  }
  function handleTimePicker() {
    setShowTimePicker(!showTimePicker);
  }
  return (
    < View style={styles.cardContainer}>
        {/* <View style={styles.inputContainer}> */}
            <Text style={styles.textInfo}>Activity Name: </Text>
            <TextInput 
                style={styles.input}
                onChangeText={setSportName}
                value={sportName}
                placeholder="Enter the name of your activity"
            />
        {/* </View>
        <View style={styles.inputContainer}> */}
            <Text style={styles.textInfo}>Venue: </Text>
            <TextInput 
                style={styles.input}
                onChangeText={setVenue}
                value={venue}
                placeholder="Enter the location of your activity"
            />
        {/* </View>
        <View style={styles.inputContainer}> */}
            <Text style={styles.textInfo}>Date: </Text>
            <CalendarInput date={date} setDate={handleDate} datePicker={showDatePicker} datePickerHandler={handleDatePicker}/>
        {/* </View> */}
            <Text style={styles.textInfo}>Time: </Text>
            <TimeInput time={time} setTime={handleTime} timePicker={showTimePicker} timePickerHandler={handleTimePicker}/>
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
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textInfo: {
        fontSize: FONTSIZE.medium,
        fontWeight: 'bold',
        color: COLORS.text,
      },
    });
