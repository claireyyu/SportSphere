import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ActivityCard from '../components/ActivityCard'
import { COLORS, FONTSIZE, SPACING } from '../global'
import ActivityCardList from '../components/ActivityCardList'
import SearchBar from '../components/SearchBar';
import { QueryContext } from '../context/QueryProvider';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function ActivityScreen({ modalVisible, modalHandler, currentLocation }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const { searchQuery, setSearchQuery, setSortPreference } = useContext(QueryContext);

  const updateSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.welcome}>Hi, Merida</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Vancouver</Text>
          <Text style={[styles.location, {marginLeft: SPACING.s}]}>7°C</Text>
        </View>
        <SearchBar
            placeholder="Explore activities"
            value={searchQuery}
            onChangeText={updateSearch}
        />
          {/* <ActivityCardList modalVisible={modalVisible} modalHandler={modalHandler} currentLocation={currentLocation}/> */}
      </View>
      <View style={styles.bottom}>
      
      </View>
      
    </SafeAreaView>
  )
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
})