import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS, FONTSIZE, SPACING, ROUNDED, SIZE } from '../global'
import ActivityCardList from '../components/ActivityCardList'
import SearchBar from '../components/SearchBar';
import { QueryContext } from '../context/QueryProvider';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import PressableButton from '../components/PressableButton'
import { UserContext } from '../context/UserProvider'
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'
import { set } from 'date-fns'

export default function ActivityScreen({ modalVisible, modalHandler, currentLocation }) {
  const { userProfile } = useContext(UserContext);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Poppins_600SemiBold,
  });
  // Use all hooks unconditionally
  const { searchQuery, setSearchQuery, setSortPreference } = useContext(QueryContext);

  const [isDateSelected, setDateSelection] = React.useState(true);
  const [isDistanceSelected, setDistanceSelection] = React.useState(false);

  function selectDate() {
    setDateSelection(true);
    setDistanceSelection(false);
    setSortPreference('date');
  }
  function selectDistance() {
    setDistanceSelection(true);
    setDateSelection(false);
    setSortPreference('distance');
  }

  
  const updateSearch = (text) => {
    setSearchQuery(text);
  };

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
      return <Ionicons name="sunny-outline" size={14} color={COLORS.theme} />;
    } else if (code === 2 || code === 3) {
      return <Ionicons name="partly-sunny-outline" size={14} color={COLORS.theme}  />;
    } else if (code === 4 || code == 5) {
      return <Ionicons name="cloudy-outline" size={14} color={COLORS.theme}  />;
    } else {
      return <Ionicons name="rainy-outline" size={14} color={COLORS.theme}  />;
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

  // Conditional render logic
  if (!fontsLoaded) {
    return null; // Only return early AFTER all hooks have been called
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.welcome}>Hi, {userProfile?.username || 'Welcome!'}</Text>
        {/* <View style={styles.locationContainer}>
          <Text style={styles.location}>{cityName}</Text> 
          <Text style={[styles.location, { marginLeft: SPACING.s }]}>7°C</Text>
        </View>*/}
        <View style={styles.weather}>
          <Text style={styles.weatherText}>
            {weather && weather.description}
          </Text>
          <Text style={styles.weatherText}>
            {weather ? `${weather.temp}°C ` : "Loading weather..."}
          </Text>
        </View>
        <SearchBar
          placeholder="Explore activities"
          value={searchQuery}
          onChangeText={updateSearch}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Popular Activities</Text>
        <View style={styles.btnContainer}>
          <PressableButton
            pressedFunction={()=>selectDate()}
            componentStyle={[styles.btn, { backgroundColor: isDateSelected ? COLORS.theme : COLORS.unfocusedBg }]}
          >
            <Text style={[styles.btnText, { color: isDateSelected? COLORS.themeLight: COLORS.border }]}>Latest</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={()=>selectDistance()}
            componentStyle={[styles.btn, { marginLeft: SPACING.s, backgroundColor: isDistanceSelected ? COLORS.theme : COLORS.unfocusedBg }]}
          >
            <Text style={[styles.btnText, { color: isDistanceSelected? COLORS.themeLight : COLORS.border }]}>Nearby</Text>
          </PressableButton>
        </View>
        <ActivityCardList modalVisible={modalVisible} modalHandler={modalHandler} currentLocation={currentLocation} isDateSelected={isDateSelected} isDistanceSelected={isDistanceSelected}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l,
  },
  top: {
    flex: 1,
  },
  welcome: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.m,
  },
  bottom: {
    flex: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
  },
  location: {
    color: COLORS.unfocused,
    fontSize: FONTSIZE.small,
    fontFamily: 'Poppins_400Regular',
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: FONTSIZE.h1,
    marginTop: SPACING.xxl,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
  },
  btn: {
    backgroundColor: COLORS.theme,
    padding: SPACING.m,
    paddingHorizontal: SPACING.xl,
    borderRadius: SPACING.m,
  },
  btnText: {
    color: COLORS.themeLight,
    fontSize: FONTSIZE.body,
  },
  weather: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.small,
    padding: SPACING.xsmall,
    marginRight: SPACING.xsmall,
  },
  weatherText: {
    color: COLORS.theme,
    fontWeight: 'bold',
    fontSize: FONTSIZE.tiny,
    marginRight: SPACING.xsmall,
  },
})
