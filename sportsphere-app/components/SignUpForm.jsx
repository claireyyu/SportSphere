import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { writeToDB } from '../Firebase/firebaseHelper';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';

export default function SignUpForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleToLogin() {
    navigation.replace('Login');
  }

  const signupHandler = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }
      if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
        Alert.alert('Please fill out all fields');
        return;
      }
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCred.user);

      // Add user profile to Firestore
      const userProfile = {
        uid: userCred.user.uid,
        username: email,
        email: email,
        bio: 'Nothing yet',
      };
      await writeToDB(userProfile, 'users');

      Alert.alert('User registered successfully');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        Alert.alert('Your password should be at least 6 characters');
      } else {
        Alert.alert('Error', error.message);
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm Password"
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton
          pressedFunction={signupHandler}
          componentStyle={styles.registerButton}
        >
          <Text style={styles.btnRegisterText}>Register</Text>
        </PressableButton>
        <PressableButton
          pressedFunction={handleToLogin}
          componentStyle={styles.loginButton}
        >
          <Text style={styles.btnLoginText}>Already Registered? Login</Text>
        </PressableButton>
      </View>
    </View>
  );
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
    backgroundColor: COLORS.background,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xsmall,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLoginText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.foreground,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  btnRegisterText: {
    fontSize: FONTSIZE.body,
    textAlign: 'center',
    color: COLORS.background,
    fontWeight: 'bold',
  },
});