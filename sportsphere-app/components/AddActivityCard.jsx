import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import CalendarInput from './CalendarInput';


export default function AddActivityCard() {
  const [sportName, setSportName] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [totalMembers, setTotalMembers] = useState(0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleDate() {
    setDate(date);
  }
  function handleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }
  return (
    < SafeAreaView style={styles.cardContainer}>
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
    </SafeAreaView>
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
        borderColor: COLORS.border,
        backgroundColor: COLORS.defaultBackground,
        borderRadius: ROUNDED.small,
        width: '80%',
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
