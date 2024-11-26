import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import PressableButton from './PressableButton';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import { useNavigation } from '@react-navigation/native';
import { parse, format, set } from 'date-fns';
import { UserContext } from '../context/UserProvider';
import DateInputer from './DateInputer';
import TimeInputer from './TimeInputer';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { Timestamp } from 'firebase/firestore';

export default function AddActivityCard({ route, currentLocation }) {
  const { userProfile } = useContext(UserContext);
  const googlePlacesRef = useRef(null); 
  //const currentLocation = currentLocation;
  const myLocation = currentLocation || { latitude: 0, longitude: 0 }; // Default to (0, 0)

  const [id, setId] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [activityName, setActivityName] = useState('');
  const [venue, setVenue] = useState('');
  const [venuePosition, setVenuePosition] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [totalMembers, setTotalMembers] = useState(0);
  const [description, setDescription] = useState('');
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
    if (route?.params) {
      const { id, activityName, venue, date, time, totalMembers, description, venuePosition } = route.params;
      console.log('route.params to edit activity:', route.params);
      const dateObj = parse(date, 'MMM dd, yyyy', new Date());
      const formattedDate = format(dateObj, 'yyyy-MM-dd');
      const dateTimeString = `${formattedDate}T${time}:00`;
      const timeObj = new Date(dateTimeString);

      setActivityName(activityName);
      setVenue(venue);
      setVenuePosition(venuePosition);
      setDate(dateObj);
      setTime(timeObj);
      setTotalMembers(totalMembers);
      setDescription(description);
      setIsEditMode(true);
      setId(id);
    }
  }, [route?.params]);

  function submitActivity() {
    if (isEditMode) {
      handleNewActivity();
      return;
    }
    Alert.alert("Submit Activity", "Submit this activity? The venue cannot be changed later.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Submit",
        onPress: () => handleNewActivity(),
      }
    ]);
  }

  function handleNewActivity() {

    try {
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
      
      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(time.getHours());
      selectedDateTime.setMinutes(time.getMinutes());
      const now = new Date();
      if (selectedDateTime < now) {
        setError("Date and time cannot be earlier than now!");
        setDate(now);
        setTime(now);
        return;
      }

      const newActivity = {
        activityName: activityName,
        venue: venue,
        date: date || new Date(),
        time: time || new Date(),
        totalMembers: totalMembers,
        description: description,
        owner: userProfile.uid,
        peopleGoing: [userProfile.uid],
        venuePosition: venuePosition || null,
      };
      const strNewDate = format(newActivity.date, 'MMM dd, yyyy');
      const strNewTime = format(newActivity.time, 'HH:mm');
      const passToDetail = {
        ...newActivity,
        date: strNewDate,
        time: strNewTime,
        id: id,
      };

      if (isEditMode) {
        updateDB(id, newActivity, "activities");
        setIsEditMode(false);
        navigation.navigate('ActivityDetails', passToDetail);
      } else {
        writeToDB(newActivity, "activities");
        navigation.goBack();
      }
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  
  // function handlePlaceSelected(data, details) {
  //   console.log('data:', data);
  //   console.log('details:', details);
  //   setVenue(data.description);
  //   setVenuePosition({
  //     latitude: details.geometry.location.lat,
  //     longitude: details.geometry.location.lng,
  //   });
  // }

  return (
    <SafeAreaView>
      <View style={styles.cardContainer}>
        <Text style={styles.textInfo}>Activity Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setActivityName}
          value={activityName}
          placeholder="Badminton at Bonsor"
        />

        <Text style={styles.textInfo}>Venue</Text>
        {isEditMode ?
          <Text style={styles.venueText}>{venue}</Text> :
          <GooglePlacesAutocomplete
            ref={googlePlacesRef}
            placeholder={isEditMode ? venue : "410 W Georgia St"} // Add 和 Edit 模式的 placeholder
            fetchDetails={true}
            disableScroll={true} // Prevent nested scrolling issues
            onPress={(data, details = null) => {
              console.log('Selected Data:', data, details);
              setVenue(data.description); // 更新选中地址到 venue
              setVenuePosition({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            textInputProps={{
              value: venue, // 始终绑定到 venue
              onChangeText: (text) => {
                setVenue(text); // 用户输入时更新 venue
                googlePlacesRef.current?.setAddressText(text); // 同步 GooglePlacesAutocomplete 的值
              },
            }}
            query={{
              key: process.env.EXPO_PUBLIC_mapApiKey,
              language: 'en',
              location: myLocation ? `${myLocation.latitude},${myLocation.longitude}` : null, // current location
              components: 'country:ca',
            }}
            styles={{
              textInput: styles.input,
            }}
          />}
        {/* <GooglePlacesAutocomplete
          placeholder={venue ? venue : "123 Main Street, Burnaby"}
          // defaultValue={venue ? venue : ""}
          onPress={(data, details) => handlePlaceSelected(data, details)}
          fetchDetails={true}
          disableScroll={true} // Prevent nested scrolling issues
          // listViewDisplayed={false}
          GooglePlacesSearchQuery={
            {
              rankby: 'distance',
              type: 'establishment',
            }
          }
          query={{
            key: process.env.EXPO_PUBLIC_mapApiKey,
            language: 'en',
            location: myLocation ? `${myLocation.latitude},${myLocation.longitude}`: null, // current location
            components: 'country:ca',
            //radius: 5000,
          }}
          styles={{
            textInput: styles.input,
          }}
        /> */}

        <Text style={styles.textInfo}>Date</Text>
        <View style={Platform.OS == 'ios' && styles.iosDatePicker}>
          <DateInputer date={date} setDate={setDate} />
        </View>

        <Text style={styles.textInfo}>Time</Text>
        <TimeInputer time={time} setTime={setTime} />

        <Text style={styles.textInfo}>Total Members</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTotalMembers}
          value={totalMembers}
          //keyboardType="numeric"
        />

        <Text style={styles.textInfo}>Description</Text>
        <TextInput
          style={styles.inputDescription}
          onChangeText={setDescription}
          value={description}
          placeholder="Please bring your own racket..."
          multiline={true}
        />

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={submitActivity}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </PressableButton>
        <Text style={styles.erroText}>{error}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    padding: SPACING.medium,
    margin: SPACING.medium,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  iosDatePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 35,
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
  venueText: {
    flex: 1,
    minHeight: 35,
    marginTop: SPACING.xsmall,
    marginBottom: SPACING.medium,
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
  inputButton: {
    width: '100%',
    alignItems: 'center',
  },
});