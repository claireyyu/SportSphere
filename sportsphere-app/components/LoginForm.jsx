import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleToSignup() {
    navigation.replace('SignUp');
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
        Alert.alert('No user found with this email');
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
        <Button title="Log in" onPress={loginHandler} />
        <Button title="New User? Create an account" onPress={handleToSignup} />
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