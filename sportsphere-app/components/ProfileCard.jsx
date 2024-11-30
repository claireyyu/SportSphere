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
    const updatedProfile = {
      username: nameInput,
      bio: bioInput,
      profilePicture: newProfilePicture,
      
    };
    await updateUserProfile(uid, updatedProfile);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username: nameInput,
      bio: bioInput,
    }));
    Alert.alert("Profile Updated", "Your profile has been updated successfully.");
    navigation.navigate("Profile");
  };

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
