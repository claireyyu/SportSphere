import React from 'react'
import { updateDB, findUserByUid } from '../Firebase/firebaseHelper';
import { TextInput } from 'react-native';
import { set } from 'date-fns';
import PressableButton from './PressableButton';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { COLORS, FONTSIZE, SPACING, ROUNDED, SHADOW } from '../global';
import { doc } from 'firebase/firestore';
 

export default function UserInfoForm({ route, navigation }) {
  const userProfile = route?.params.userProfile || {username: "", bio: "", uid: ""};
  console.log("User profile: ", userProfile);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  function handleUserName(myUserName) {
    setUserName(myUserName);
  }

  function handleBio(myBio) {
    setBio(myBio);
  }

  function handleUpdateInfo() {

    userProfile.username = userName;
    userProfile.bio = bio;
    const userDoc = findUserByUid(userProfile.uid);
    console.log("User doc: ", userDoc);
    const docId = userDoc.id;
    console.log("Doc id: ", docId);
    updateDB(docId, userProfile, "users");
    navigation.navigate('TabNavigator', {docId});
    
  }
  return (
    <View style={styles.cardContainer}>
        <Text style={styles.textInfo}>Enter your user name: </Text>
        <TextInput style={styles.input} value={userName} onChangeText={handleUserName} />
        <Text style={styles.textInfo}>Enter your bio: </Text>
        <TextInput style={styles.input} value={bio} onChangeText={handleBio} />
        <Text style={styles.textInfo}>Select your profile photo:</Text>
        <PressableButton
            componentStyle={styles.button} 
            pressedFunction={handleUpdateInfo}>
            <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
    </View>
  )
}
export const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.small,
        paddingHorizontal: SPACING.small,
        borderRadius: ROUNDED.default,
        alignSelf: 'center',
    },
    buttonText: {
        color: COLORS.background,
        fontSize: FONTSIZE.small,
        fontWeight: 'bold',
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
    textInfo: {
        fontSize: FONTSIZE.body,
        fontWeight: 'bold',
        color: COLORS.foreground,
    },
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
})