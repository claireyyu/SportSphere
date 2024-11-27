import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, ROUNDED, SPACING, SIZE } from '../global'
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableButton from '../components/PressableButton'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function handleToLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.logo}>
        <MaterialCommunityIcons name="badminton" size={SIZE.logo} color={COLORS.theme} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SportSphere</Text>
          <Text style={styles.subtitle}>Join local sports groups today</Text>
        </View>
        <View style={styles.btnContainer}>
          <PressableButton
            componentStyle={styles.btn}
            pressedFunction={handleToLogin}
          >
            <Text style={styles.btnText}>GET STARTED</Text>
          </PressableButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeLight,
  },
  logo: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.xl,
    borderRadius: ROUNDED.m,
    alignSelf: 'center',
    position: 'relative',
    top: -50,
  },
  top: {
    flex: 1,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: ROUNDED.medium,
    borderBottomRightRadius: ROUNDED.medium,
  },
  bottom: {
    flex: 1.7,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Rubik_500Medium',
    fontSize: FONTSIZE.huge,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Rubik_400Regular',
    fontSize: FONTSIZE.body,
    color: COLORS.theme,
    textAlign: 'center',
    marginTop: SPACING.s,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  btn: {
    backgroundColor: COLORS.theme,
    padding: SPACING.s,
    paddingHorizontal: SPACING.xl,
    borderRadius: ROUNDED.m,
    marginHorizontal: SPACING.xl,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: FONTSIZE.body,
    color: COLORS.themeLight,
  },
})