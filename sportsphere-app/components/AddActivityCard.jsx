import React, { act, useState } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native'
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import CalendarInput from './CalendarInput';
import TimeInput from './TimeInput';
import PressableButton from './PressableButton';
import { writeToDB } from '../Firebase/firebaseHelper';
import { useNavigation } from '@react-navigation/native';


export default function AddActivityCard() {
  const navigation = useNavigation();
  const [activityName, setActivityName] = useState('');
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

  function handleSave() {
    const newActivity = {
      activityName: activityName,
      venue: venue,
      date: date,
      time: time,
      peopleGoing: 1,  // default to 1
      totalMembers: totalMembers,
      description: description,
    }
    writeToDB(newActivity, "activities");
    navigation.goBack();
  }
  return (
    < View style={styles.cardContainer}>
            <Text style={styles.textInfo}>Activity Name</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setActivityName}
                value={activityName}
                placeholder="Badminton at Bonsor"
            />
        
            <Text style={styles.textInfo}>Venue</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setVenue}
                value={venue}
                placeholder="123 Main Street, Burnaby"
            />
            <Text style={styles.textInfo}>Date</Text>
            <CalendarInput date={date} setDate={handleDate} datePicker={showDatePicker} datePickerHandler={handleDatePicker}/>
            <Text style={styles.textInfo}>Time</Text>
            <TimeInput time={time} setTime={handleTime} timePicker={showTimePicker} timePickerHandler={handleTimePicker}/>
            <Text style={styles.textInfo}>Total Members</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setTotalMembers}
                value={totalMembers}
                keyboardType="numeric"
            />
            <Text style={styles.textInfo}>Description</Text>
            <TextInput 
                style={styles.inputDescription}
                onChangeText={setDescription}
                value={description}
                placeholder="Please bring your own racket..."
                multiline={true}
                numberOfLines={4} 
            />
            <Text style={styles.textInfo}>Select Photo</Text>
            <PressableButton 
            componentStyle={styles.button}
            pressedFunction={handleSave} >
                <Text style={styles.buttonText}>Submit</Text>
            </PressableButton>
    </View>
  )
}

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.background,
        borderRadius: ROUNDED.default,
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
        marginTop: SPACING.xsmall,
        marginBottom: SPACING.medium,
        borderBottomWidth: 1,
        borderColor: COLORS.secondaryText,
        padding: SPACING.xsmall,
        backgroundColor: COLORS.inputArea,
        borderRadius: ROUNDED.small,
        fontSize: FONTSIZE.body,
        color: COLORS.foreground,
      },
      inputDescription: {
        height: 100,
        marginTop: SPACING.small,
        marginBottom: SPACING.medium,
        borderWidth: 1,
        borderColor: COLORS.secondaryText,
        padding: SPACING.small,
        borderRadius: ROUNDED.small,
        fontSize: FONTSIZE.body,
        color: COLORS.foreground,
      },
      textInfo: {
        fontSize: FONTSIZE.body,
        fontWeight: 'bold',
        color: COLORS.foreground,
      },
      buttonText: {
        color: COLORS.background,
        fontSize: FONTSIZE.body,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.small,
        borderRadius: ROUNDED.default,
        alignSelf: 'flex-end',
      },
    });
