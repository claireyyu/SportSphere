import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';

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
    <View style={styles.container}>
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
          <Text style={styles.btnLoginText}>Confirm</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={handleToSignup}
          componentStyle={styles.registerButton}
        >
          <Text style={styles.btnRegisterText}>New User? Create an account!</Text>
        </PressableButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {
    width: '100%',
    padding: SPACING.small,
    marginVertical: SPACING.default,
    borderWidth: 2,
    borderColor: COLORS.secondaryText,
    borderRadius: ROUNDED.small,
    backgroundColor: COLORS.background,
    color: COLORS.foreground,
  },
  buttonContainer: {
    marginTop: SPACING.medium,
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xsmall,
  },
  registerButton: {
    backgroundColor: COLORS.background,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLoginText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.background,
    fontWeight: 'bold'
  },
  btnRegisterText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.foreground,
    fontStyle: 'italic',
    'textDecorationLine': 'underline',
  },
});