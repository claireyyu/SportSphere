import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { writeToDB } from '../Firebase/firebaseHelper';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';
import Logo from './Logo';

export default function SignUpForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

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
      if (password.length < 15) {
        Alert.alert('Password should be at least 15 characters long!');
        return;
      }
      if (username.length > 20) { 
        Alert.alert('Username should be less than 20 characters');
        return;
      }
      if (bio.length > 20) {
        Alert.alert('Bio should be less than 20 words');
        return;
      }
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCred.user);

      // Add user profile to Firestore
      const userProfile = {
        uid: userCred.user.uid,
        username: username ? username : 'Anonymous',
        email: email,
        bio: bio ? bio : '',
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={50}>
      <SafeAreaView>
        <ScrollView>
          <View style={{marginTop: SPACING.xl}}>
            <Logo />
          </View>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholder="Username (less than 20 characters)" 
            style={styles.input}
          />
          <View style={styles.requiredContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              style={styles.inputRequired}
            />
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.requiredContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password (at least 15 characters)"
              style={styles.inputRequired}
            />
            <Text style={styles.required}>*</Text>
          </View>
          <View style={styles.requiredContainer}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm Password"
              style={styles.inputRequired}
            />
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio (less than 20 words)"
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PressableButton
            pressedFunction={signupHandler}
            componentStyle={styles.btn}
          >
            <Text style={styles.btnText}>CREATE ACCOUNT</Text>
          </PressableButton>
          <PressableButton
            pressedFunction={handleToLogin}
            componentStyle={styles.registerButton}
          >
            <Text style={styles.btnText}>ALREADY HAVE AN ACOOUNT?</Text>
            <Text style={[styles.btnText, {marginLeft: SPACING.xs, color: COLORS.secondary}]}>SIGN IN</Text>
          </PressableButton>
          </View>
          </ ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
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
  inputRequired: {
    flex: 1,
    padding: SPACING.m,
    borderRadius: ROUNDED.xs,
    backgroundColor: COLORS.inputBg,
    color: COLORS.theme,
    fontSize: FONTSIZE.body,
  },
  buttonContainer: {
    marginTop: SPACING.s,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.l,
    marginBottom: SPACING.xs,
  },
  registerButton: {
    padding: SPACING.s,
    borderRadius: ROUNDED.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: FONTSIZE.small,
    textAlign: 'center',
    color: COLORS.theme,
    fontFamily: 'Rubik_500Medium',
  },
  requiredContainer: {
    marginVertical: SPACING.s,
  },
  required: {
    color: COLORS.required,
    fontSize: FONTSIZE.tiny,
    marginLeft: SPACING.s,
    alignSelf: 'flex-end',
  },
});
