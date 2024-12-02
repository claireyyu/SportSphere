import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../global';
import { useState, useEffect, useRef, useContext } from 'react';
import { updateUserProfile } from '../Firebase/firebaseHelper';
import PressableButton from './PressableButton';
import { auth } from '../Firebase/firebaseSetup';
import { Alert } from 'react-native';
import { UserContext } from '../context/UserProvider';
import { useNavigation } from '@react-navigation/native';
import { uploadBytesResumable, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

  
export default function ProfileCard({ name, email, bio, newProfilePicture }) {
  const { setUserProfile } = useContext(UserContext);
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [bioInput, setBioInput] = useState(bio);
  const navigation = useNavigation();
  const nameInputRef = useRef(null);

  const handleUpdateProfile = async () => {
    if (nameInput.length > 20) { 
      Alert.alert('Username should be less than 20 characters');
      return;
    }
    if (bioInput.length > 20) {
      Alert.alert('Bio should be less than 20 words');
      return;
    }
    const uid = auth.currentUser.uid;
    const profileUploadurl = await handleImageData(newProfilePicture);
    const updatedProfile = {
      username: nameInput,
      bio: bioInput,
      //profilePicture: profileUploadurl,
    };
    if (profileUploadurl) {
      updatedProfile.profilePicture = profileUploadurl;
    }
    await updateUserProfile(uid, updatedProfile);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username: nameInput,
      bio: bioInput,
      ...(profileUploadurl && { profilePicture: profileUploadurl }),
    }));
    Alert.alert("Profile Updated", "Your profile has been updated successfully.");
    navigation.navigate("Profile", {profileUploadurl});
  };

  async function handleImageData(uri) {
    if (!uri) {
      return null;
    }
    try {
      let uploadURl = "";
      //fetch the image data
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`fetch error happened with status ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      uploadURl = uploadResult.metadata.fullPath;
      return uploadURl;
    } catch (err) {
      console.log("handle Image data ", err);
      return null;
    }
  }

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Name</Text>
        <TextInput ref={nameInputRef} style={styles.infoText} value={nameInput} onChangeText={setNameInput} placeholder={name} ></TextInput>
      </View>
      {/* <View style={styles.profileCardRow}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.infoText}>{email}</Text>
      </View> */}
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Bio</Text>
        <TextInput style={styles.infoText} value={bioInput} onChangeText={setBioInput} placeholder={bio}></TextInput>
      </View>
      <PressableButton 
        pressedFunction={handleUpdateProfile}
        componentStyle={styles.button}  
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    padding: SPACING.large,
    marginVertical: SPACING.medium,
    marginHorizontal: SPACING.s,
    // Shadow properties
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  profileCardRow: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    marginBottom: SPACING.medium,
  },
  title: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    color: COLORS.text,
    width: '40%',
  },
  infoText: {
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
    width: '60%',
  },
  button: {
    backgroundColor: COLORS.theme,
    borderRadius: ROUNDED.small,
    padding: SPACING.xsmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.default,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
  },
});
