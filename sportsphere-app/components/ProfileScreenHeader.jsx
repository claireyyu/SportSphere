// import { StyleSheet, Text, View, SafeAreaView, Alert, Button } from 'react-native';
// import React, { useState } from 'react';
// import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
// import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global';
// import SearchBar from './SearchBar';
// import PressableButton from './PressableButton';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Avatar } from '@rneui/themed';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { signOut } from 'firebase/auth';
// import { auth } from '../Firebase/firebaseSetup';
// import { useEffect, useContext } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../context/UserProvider';
// import * as Location from 'expo-location'

// export default function ProfileScreenHeader() {
//   const { userProfile } = useContext(UserContext);
//   const navigation = useNavigation();
//   const [response, requestPermission] = Location.useForegroundPermissions();
//   const [location, setLocation] = useState(null);
//   const [weather, setWeather] = useState(null);

//   async function verifyPermission() {
//     try {
//       if (!response.granted) {
//         const granted = await requestPermission();
//         return granted.granted;
//       }
//       return true;
//     } catch {
//       console.log("Permission denied");
//       return false;
//     }
//   }

//   async function locateUserHandler() {
//     try {
//       const hadPermission = await verifyPermission();
//       if (!hadPermission) {
//         Alert.alert("You need to give location permissions to use this feature.");
//         return;
//       }
//       const result = await Location.getCurrentPositionAsync();
//       setLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude });
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     if (location) {
//       console.log("location: ", location);
//     }
//   }, [location]);

  
//   async function signOutUser() {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function handleSignOut() {
//     try {
//       Alert.alert("Sign Out", "Are you sure you want to sign out?", [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: "OK", onPress: () => signOutUser() }
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function handleOpenEditProfile() {
//     navigation.navigate("EditProfile");
//   }

//   function handleOpenReminder() {
//     navigation.navigate("Reminder");
//   }

//   async function weatherHandler() {
//     try {
//       await locateUserHandler();
//       if (location) {
//         const { latitude: lat, longitude: lon } = location;
//         const part = "minutely,hourly,daily,alerts";
//         const APIkey = process.env.EXPO_PUBLIC_weatherApiKey;
//         const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}`);
//         const data = await response.json();
//         console.log("weather!!!!!: ", data);
//         // setWeather({temp: data., description: data.current.weather[0].main});
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <SafeAreaView style={styles.view}>
//       <View style={styles.topBtnContainer}>
//       <View style={styles.logoutContainer}>
//         <PressableButton
//             pressedFunction={handleSignOut}
//           >
//           <MaterialIcons name="logout" size={24} color="white" />
//         </PressableButton>
//       </View>
//         <View style={styles.alarmContainer}>
//           <PressableButton
//             pressedFunction={handleOpenReminder}
//           >
//             <Ionicons name="notifications-outline" size={SIZE.pressableIcon} color={COLORS.background} />
//           </PressableButton>
//         </View>
//       </View>

//       <View style={styles.profileContainer}>
//         <Avatar
//           size={SIZE.avatar}
//           rounded
//           source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
//         />
//         <View style={styles.profileInfo}>
//           <View style={styles.firstLineContainer}>
//           <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
//             <PressableButton
//               componentStyle={styles.weather}
//               pressedFunction={weatherHandler}
//             >
//               <Text style={styles.weatherText}>{weather || "Weather"}</Text>
//             </PressableButton>
//           </View>
//           <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
//           <Text style={styles.bio}>{userProfile?.bio || 'User Bio'}</Text>
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         <PressableButton
//           componentStyle={styles.editButton}
//           pressedFunction={handleOpenEditProfile}
//         >
//           <Text style={styles.buttonStyle}>Edit Profile</Text>
//         </PressableButton>
//       </View>
//     </SafeAreaView>
//   );
// }

import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '@rneui/themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserProvider';
import * as Location from 'expo-location';

export default function ProfileScreenHeader() {
  const { userProfile } = useContext(UserContext);
  const navigation = useNavigation();
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  async function verifyPermission() {
    if (!response?.granted) {
      const granted = await requestPermission();
      return granted.granted;
    }
    return true;
  }

  async function locateUserHandler() {
    try {
      const hadPermission = await verifyPermission();
      if (!hadPermission) {
        Alert.alert("You need to give location permissions to use this feature.");
        return;
      }
      const result = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting location:", error);
    }
  }

  async function fetchWeather(lat, lon) {
    try {
      const APIkey = process.env.EXPO_PUBLIC_weatherApiKey;
      const response = await fetch(
        `https://my.meteoblue.com/packages/current?apikey=${APIkey}&lat=${lat}&lon=${lon}&asl=49&format=json`
      );
      const data = await response.json();
      console.log("Weather data:", data);
      setWeather({
        temp: Math.floor(data.data_current.temperature),
        description: matchWeatherCode(data.data_current.pictocode),
      });
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  }

  function matchWeatherCode(code) {
    if (code === 1) {
      return "Clear sky";
    }
    if (code === 2) {
      return "Mostly clear";
    }
    if (code === 3) {
      return "Partly cloudy";
    }
    if (code === 4) {
      return "Cloudy";
    }
  }

  useEffect(() => {
    // Fetch location and weather on mount
    (async () => {
      await locateUserHandler();
    })();
  }, []);

  useEffect(() => {
    // Fetch weather after location is updated
    if (location) {
      fetchWeather(location.latitude, location.longitude);
    }
  }, [location]);

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

  function handleOpenEditProfile() {
    navigation.navigate("EditProfile");
  }

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.topBtnContainer}>
        <View style={styles.logoutContainer}>
          <PressableButton pressedFunction={handleSignOut}>
            <MaterialIcons name="logout" size={24} color="white" />
          </PressableButton>
        </View>
        <View style={styles.alarmContainer}>
          <Ionicons name="notifications-outline" size={SIZE.pressableIcon} color={COLORS.background} />
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
        <View style={styles.profileInfo}>
          <View style={styles.firstLineContainer}>
            <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
            <View style={styles.weather}>
              <Text style={styles.weatherText}>
                {weather ? `${weather.temp}°C, ${weather.description}` : "Loading weather..."}
              </Text>
            </View>
          </View>
          <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
          <Text style={styles.bio}>{userProfile?.bio || 'User Bio'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          componentStyle={styles.editButton}
          pressedFunction={handleOpenEditProfile}
        >
          <Text style={styles.buttonStyle}>Edit Profile</Text>
        </PressableButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    minHeight: SIZE.profileHeader,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: ROUNDED.default,
    borderBottomRightRadius: ROUNDED.default,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  topBtnContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.default,
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: SPACING.default,
  },
  alarmContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.default,
  },
  firstLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    justifyContent: 'center',
    marginLeft: SPACING.default,
  },
  username: {
    color: COLORS.background,
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
  },
  weather: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.small,
    padding: SPACING.xsmall,
    marginLeft: SPACING.default,
  },
  weatherText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: FONTSIZE.tiny,
  },
  email: {
    color: COLORS.defaultBackground,
    fontSize: FONTSIZE.tiny,
    fontStyle: 'italic',
  },
  bio: {
    color: COLORS.background,
    fontSize: FONTSIZE.body,
    marginTop: SPACING.default,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.default,
  },
  editButton: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.default,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  buttonStyle: {
    color: COLORS.primary,
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
  },
});
