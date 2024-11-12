import React, { act, useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert } from 'react-native'
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import CalendarInput from './CalendarInput';
import TimeInput from './TimeInput';
import PressableButton from './PressableButton';
import { writeToDB } from '../Firebase/firebaseHelper';
import { useNavigation } from '@react-navigation/native';
import { parse, format } from 'date-fns';
import { updateDB } from '../Firebase/firebaseHelper';
import { UserContext } from '../context/UserProvider';

export default function AddActivityCard({ route }) {
  const { userProfile } = useContext(UserContext);

  const [id, setId] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [activityName, setActivityName] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [totalMembers, setTotalMembers] = useState(0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (activityName.split(" ").length > 5) {
      setError("Activity name should be no more than five words!");
    } else if (venue.split(" ").length > 20) {
      setError("Venue should be no more than twenty words!");
    } else {
      setError('');
    }
  }, [activityName, venue]);

  useEffect(() => {
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight to compare only the date part
      if (date < today) {
        Alert.alert("Invalid Date", "Date cannot be earlier than today.");
        setDate(today);
      } else {
        setError('');
      }
    }
  }, [date]);  

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
    if (!activityName || !venue || !date || !time || !totalMembers || !description) {
      setError("Please fill in all fields!");
      return;
    }
    
    if (activityName.split(" ").length > 5) {
      setError("Activity name should be no more than five words!");
      return;
    }

    if (venue.split(" ").length > 20) {
      setError("Venue should be no more than twenty words!");
      return;
    }
    
    const newActivity = {
      activityName: activityName,
      venue: venue,
      date: date,
      time: time,
      totalMembers: totalMembers,
      description: description,
      owner: userProfile.uid,
      peopleGoing: [userProfile.uid],
    } 
    
    if (isEditMode) {
    updateDB(id, newActivity, "activities");
    
    //Ensure date and time are converted to Date objects
    console.log("New Activity: ", newActivity);
    const dtDate = new Date(newActivity.date);
    console.log("Date: ", dtDate);
    const date = dtDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    console.log("Date: ", date);

    const dtTime = new Date(newActivity.time);
    const time = dtTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

    console.log("PeopleGoing: ", newActivity.peopleGoing);
    navigation.navigate('ActivityDetails', {
      id,
      activityName,
      venue,
      date,
      time,
      peopleGoing: newActivity.peopleGoing,
      totalMembers,
      description,
      owner: newActivity.owner,
    });
} else {
    writeToDB(newActivity, "activities");
    navigation.goBack();
}
  }

  useEffect(() => {
    if (route?.params) {
      console.log("Route Params: ", route.params);
      const { id, activityName, venue, date, time, totalMembers, description } = route.params;
      const dateObj = parse(date, 'MMM dd, yyyy', new Date());
      const formattedDate = format(dateObj, 'yyyy-MM-dd');
      const dateTimeString = `${formattedDate}T${time}:00`;
      const timeObj = new Date(dateTimeString);
      setActivityName(activityName);
      setVenue(venue);
      setDate(dateObj);
      setTime(timeObj);
      setTotalMembers(totalMembers);
      setDescription(description);
      setIsEditMode(true);
      console.log("Passed ID: ", id);
      setId(id);
    }
  }, [route?.params]);

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
      <Text style={styles.erroText}>{error}</Text>
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
        fontSize: FONTSIZE.small,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.small,
        borderRadius: ROUNDED.default,
        alignSelf: 'flex-end',
  },
  erroText: {
    color: COLORS.delete,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
    marginTop: SPACING.small,
    textAlign: 'center',
  },
  });
