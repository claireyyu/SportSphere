import { Pressable, StyleSheet, Text, View, Alert, Image } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, SIZE, SPACING } from '../global';
import PressableButton from '../components/PressableButton';
import ProfileCard from '../components/ProfileCard';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { QueryContext } from '../context/QueryProvider';
import * as ImagePicker from 'expo-image-picker';



export default function EditProfileScreen({route}) {
  const { userProfile } = useContext(UserContext);
  const navigation = useNavigation();

  const [profilePicture, setProfilePicture] = React.useState(null);
  const profileDownloadURL = route.params.profileDownloadurl;
  const [imageResponse, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();

  
  async function verifyImagePermissions() {
    try {
        if (imageResponse.granted) {
            return true;
        }
        const permissionRequest = await requestImagePermission();
        return permissionRequest.granted;
      } catch (error) {
        console.log("verifying library access permission", error);
        return false;
      }
    }


  async function changeProfilePicture() {
    try {
      const hasPermission = await verifyImagePermissions();
      if (!hasPermission) {
        Alert.alert("Permission required", "You need to grant permission to access your library to pick an image.");
            return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        });
        console.log(result);
        if (!result.canceled) {
        console.log("Image uri", result.assets[0].uri);
        setProfilePicture(result.assets[0].uri);
        }
    } catch (error) {
        console.log("Error picking image", error);
      } 
  }
  
  return (
    <View style={styles.container}>
      <PressableButton
        pressedFunction={() => navigation.goBack()}
        componentStyle={{marginTop: SPACING.xxl}}
      >
        <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.themeDark} />
      </PressableButton>
      <View>
        <Text style={styles.title}>Profile Detail</Text>
      </View>
      <View style={styles.avatarContainer}>
        <PressableButton pressedFunction={changeProfilePicture}>
        {
          profilePicture ? (
            <Avatar
              size={SIZE.avatar}
              rounded
              containerStyle={{ borderWidth: 5, borderColor: COLORS.theme }}
              source={{
                uri: profilePicture
              }}
            />
          ) : (
            profileDownloadURL ? (
              <Avatar
                size={SIZE.avatar}
                rounded
                containerStyle={{ borderWidth: 5, borderColor: COLORS.theme }}
                source={{
                  uri: profileDownloadURL
                }}
              />
            ) : (
              <Avatar
                size={SIZE.avatar}
                rounded
                containerStyle={{ borderWidth: 5, borderColor: COLORS.theme }}
                source={{
                  uri: "https://avatar.iran.liara.run/public/girl"
                }}
              />
            )
          )
        }
        </PressableButton>
        {/* <PressableButton>
          <Text style={styles.editProfile}>Change Profile Photo</Text>
        </PressableButton> */}
      </View>
      <View style={styles.editProfileContainer}>
        <ProfileCard name={userProfile.username} email={userProfile.email} bio={userProfile.bio} newProfilePicture={profilePicture}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l, 
    },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.header,
    marginTop: SPACING.l,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: SPACING.l,
  },
  editProfile: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    marginTop: SPACING.small,
  },
})