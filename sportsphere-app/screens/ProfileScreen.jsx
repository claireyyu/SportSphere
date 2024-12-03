import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from '@rneui/themed';
import { COLORS, SPACING, FONTSIZE, SIZE, ROUNDED } from '../global';
import { UserContext } from '../context/UserProvider';
import PressableButton from '../components/PressableButton';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and Ionicons
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

export default function ProfileScreen({ navigation, route }) {
  const { userProfile } = useContext(UserContext);
  const [profileDownloadurl, setProfileDownloadurl] = React.useState(null);

  async function signOutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: signOutUser },
    ]);
    
  }
  // useEffect(() => {
  //   async function getProfileDownloadURL() {
  //     try {
  //       if (route.params && route.params.profileUploadurl) {
  //         const imageRef = ref(storage, route.params.profileUploadurl);
  //         const downloadURL = await getDownloadURL(imageRef);
  //         console.log(downloadURL);
  //         setProfileDownloadURL(downloadURL);
  //       }
  //     } catch (err) {
  //       console.log("get download image URL ", err);
  //     }
  //   }
  //   getProfileDownloadURL();
  // }, [route.params]);

  useEffect(() => {
    async function getProfileDownloadURL() {
      try {
        let storagePath = null;

        if (route.params && route.params.profileUploadURL) {
          storagePath = route.params.profileUploadurl;
        } else if (userProfile.profilePicture) {
          storagePath = userProfile.profilePicture;
        }

        if (storagePath) {
          const imageRef = ref(storage, storagePath);
          const downloadURL = await getDownloadURL(imageRef);
          console.log("Profile picture URL:", downloadURL);
          setProfileDownloadurl(downloadURL);
        }
      } catch (err) {
        console.log("Error getting profile picture URL: ", err);
      }
    }
    getProfileDownloadURL();
  }, [route.params, userProfile.profilePicture]);

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        {profileDownloadurl ? (
          <Avatar
            size={SIZE.avatar}
            rounded
            source={{ uri: profileDownloadurl }}
          />
        ) : (
          <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />)}
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
          <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('EditProfile', {profileDownloadurl})}
        >
          <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="person-circle-outline" size={24} color={COLORS.themeDark} />
              <Text style={styles.buttonText}>Profile Details</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={24} color={COLORS.themeDark} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('JoinedActivities')}
        >
          <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="flag-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
              <Text style={styles.buttonText}>Joined Activities</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('Reminder')}
        >
          <View style={styles.buttonContent}>
            <View style={styles.leftContainer}>
              <Ionicons name="notifications-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
              <Text style={styles.buttonText}>Reminders</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={handleSignOut}
        >
        <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="log-out-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
          <View style={{flex: 1}}>
            <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.themeDark} />
          </View>
        </View>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l,
  },

  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.xxl,
  },

  profileContainer: {
    alignItems: 'center',
    // marginTop: SPACING.xl,
  },

  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },

  username: {
    color: COLORS.themeDark,
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    marginTop: SPACING.l,
  },

  email: {
    color: COLORS.unfocused,
    fontSize: FONTSIZE.tiny,
  },

  buttonsContainer: {
    flex: 1,
    marginTop: SPACING.l,
  },

  button: {
    minHeight: SIZE.welcomeLogo,
    backgroundColor: COLORS.profileBtn,
    padding: SPACING.m,
    borderRadius: ROUNDED.s,
    marginVertical: SPACING.s,
  },

  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.themeDark,
    fontSize: FONTSIZE.h3,
    marginLeft: SPACING.m,
    fontWeight: 'semibold',
  },

  leftContainer: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
