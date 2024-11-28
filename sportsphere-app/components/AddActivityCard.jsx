import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Platform, ScrollView } from 'react-native';
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
import ImageManager from './ImageManager';
import { ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

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
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState(null);
  //const [imageUrls, setImageUrls] = useState([]);


  function handleExistingImages(urls) {
    setExistingImages(urls);
  }

  function handleImagesChange({ newImages, deletedImages }) {
    setNewImages(newImages);
    setDeletedImages(deletedImages);
    
  }

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
      const { id, activityName, venue, date, time, totalMembers, description, venuePosition, images, downloadURLs } = route.params;
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
      setImages(images);
      setDownloadURLs(downloadURLs);

      if (images) {
        const combinedImages = images.map((storagePath, index) => ({
          storagePath,
          downloadURL: downloadURLs[index],
        }));
        setExistingImages(combinedImages); // Set existingImages with both storage paths and download URLs
      }

    }
  }, [route?.params]);

  async function deleteImagesFromStorage(imageStoragePaths) {
    try {
      await Promise.all(
        imageStoragePaths.map(async (path) => {
          const imageRef = ref(storage, path);
          await deleteObject(imageRef);
        })
      );
    } catch (err) {
      console.error("Error deleting images from storage:", err);
    }
  }
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
  async function handleMultipleImageData(uriList) {
    try {
      const uploadUrls = await Promise.all(
        uriList.map(async (uri) => {
          // Fetch the image data
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error(`Fetch error with status ${response.status} for URI: ${uri}`);
          }
          const blob = await response.blob();
  
          // Generate a unique image name to prevent overwriting
          const imageName = `${Date.now()}_${uri.substring(uri.lastIndexOf("/") + 1)}`;
          const imageRef = ref(storage, `images/${imageName}`);
  
          // Upload the image blob
          const uploadResult = await uploadBytesResumable(imageRef, blob);
          const uploadUrl = uploadResult.metadata.fullPath;
          return uploadUrl;
        })
      );
      return uploadUrls;
    } catch (err) {
      console.error("Error in handleMultipleImageData:", err);
      throw err; // Re-throw the error to be handled by the caller
    }
  }
  async function handleNewActivity() {

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

      if (deletedImages.length > 0) {
        await deleteImagesFromStorage(deletedImages);
      }
      
      let imageUploadUrls = [];
      if (newImages.length > 0) {
        imageUploadUrls = await handleMultipleImageData(newImages);
        console.log("Image URLs for newly added images: ", imageUploadUrls);
      }
      
      const updatedImages = [
        ...existingImages.filter((image) => !deletedImages.includes(image.storagePath)).map((image) => image.storagePath),// convert existingImages to storage paths
        ...imageUploadUrls,
      ];
      //const updatedImages = [...existingImages.filter((url)=> !deletedImages.includes(url)), ...imageUploadUrls];
      console.log("Updated images: ", updatedImages);

      const newActivity = {
        activityName: activityName,
        venue: venue,
        date: date || new Date(),
        time: time || new Date(),
        totalMembers: totalMembers,
        description: description,
        owner: userProfile.uid,
        peopleGoing: [userProfile.uid],
        venuePosition: venuePosition,
        images: updatedImages || null,

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
        setActivityName('');
        setVenue('');
        setDate(new Date());
        setTime(new Date());
        setTotalMembers(0);
        setDescription('');
        setImages([]);
        setNewImages([]);
        setIsEditMode(false);

        navigation.navigate('Activity');
      }
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={isEditMode && { paddingBottom: SIZE.tabBar }}
        keyboardShouldPersistTaps='always' 
      >
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
              keepResultAfterBlur={true} // Keep the result after blur
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
          keyboardType="numeric"
        />

        <Text style={styles.textInfo}>Description</Text>
        <TextInput
          style={styles.inputDescription}
          onChangeText={setDescription}
          value={description}
          placeholder="Please bring your own racket..."
          multiline={true}
        />
        {/* <ImageManager images={images} imagesHandler={handleImages} downloadURLs={downloadURLs}
                      newImages={newImages} newImagesHandler={setNewImages}/> */}
        <ImageManager existingImages={existingImages} onImagesChange={handleImagesChange} />
        <PressableButton
          componentStyle={styles.button}
          pressedFunction={submitActivity}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </PressableButton>
        <Text style={styles.erroText}>{error}</Text>
        </View>
        </ ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    padding: SPACING.medium,
    margin: SPACING.xs,
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
    backgroundColor: COLORS.theme,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    borderRadius: ROUNDED.default,
    // alignSelf: 'flex-end',
    marginTop: SPACING.medium,
    alignItems: 'center',
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