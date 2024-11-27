import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';
import Logo from './Logo';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleToSignup() {
    navigation.replace('SignUp');
  }

  const resetHandler = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={60}>
      <SafeAreaView>
      <Logo />
      <Text style={styles.title}>RESET PASSWORD</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder='Email'
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={resetHandler}
          componentStyle={styles.loginButton}
        >
          <Text style={styles.btnLoginText}>SUBMIT</Text>
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
    marginTop: SPACING.xxl,
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  registerButton: {
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLoginText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.theme,
    fontWeight: 'bold'
  },
  btnRegisterText: {
    fontSize: FONTSIZE.small,
    textAlign: 'center',
    color: COLORS.theme,
    fontFamily: 'Rubik_500Medium',
  },
});