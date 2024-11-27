import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik'
import Logo from './Logo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleToSignup() {
    navigation.replace('SignUp');
  }

  function handleToResetPassword() {
    navigation.replace('ResetPassword');
  }

  const loginHandler = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Please fill out all fields');
        return;
      }
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred.user);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert('Incorrect password');
      } else if (error.code === "auth/user-not-found") {
      } else {
        Alert.alert('Error', error.message);
      }
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={60}>
      <SafeAreaView>
        <Logo />
        <Text style={styles.title}>SIGN IN</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder='Email'
            style={styles.input}
          />
          <TextInput 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
            placeholder='Password'
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={loginHandler}
            componentStyle={styles.loginButton}
          >
            <Text style={styles.btnLoginText}>LOGIN</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={handleToResetPassword}
            componentStyle={[styles.registerButton, {marginTop: SPACING.xxl}]}
          >
            <Text style={styles.btnRegisterText}>FORGOT YOUR PASSWORD?</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={handleToSignup}
            componentStyle={styles.registerButton}
          >
            <Text style={styles.btnRegisterText}>DON'T HAVE AN ACCOUNT?</Text>
            <Text style={[styles.btnRegisterText, {marginLeft: SPACING.xs, color: COLORS.secondary}]}>SIGN UP</Text>
          </PressableButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.m,
    paddingTop: SPACING.xxl,
    backgroundColor: COLORS.themeLight,
    fontFamily: 'Rubik_400Regular',
  },
  title: {
    fontSize: FONTSIZE.h2,
    fontFamily: 'Rubik_500Medium',
    marginTop: SPACING.l,
  },
  inputContainer: {
    marginTop: SPACING.xxl,
    alignItems: 'stretch',
  },
  input: {
    padding: SPACING.m,
    marginVertical: SPACING.m,
    borderRadius: ROUNDED.xs,
    backgroundColor: COLORS.inputBg,
    color: COLORS.theme,
    fontSize: FONTSIZE.body,
  },
  buttonContainer: {
    marginTop: SPACING.m,
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  registerButton: {
    backgroundColor: COLORS.background,
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLoginText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.theme,
    fontFamily: 'Rubik_500Medium',
  },
  btnRegisterText: {
    fontSize: FONTSIZE.small,
    textAlign: 'center',
    color: COLORS.foreground,
    fontFamily: 'Rubik_500Medium',
  },
});