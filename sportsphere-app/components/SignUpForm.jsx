import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';

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
    } catch (error) {
      if (error.code === "auth/weak-password") {
        Alert.alert('Your password should be at least 6 characters');
      } else {
        Alert.alert('Error', error.message);
      }
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Email Address</Text>
        <TextInput 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View>
        <Text>Password</Text>
        <TextInput 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View>
        <Text>Confirm Password</Text>
        <TextInput 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry
          style={styles.input}
        />
      </View>

      <View>
        <Button title="Register" onPress={signupHandler} />
        <Button title="Already Registered? Login" onPress={handleToLogin} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    minWidth: 200,
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
});