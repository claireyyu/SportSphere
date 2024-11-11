// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Firebase/firebaseSetup';
// import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
// import PressableButton from './PressableButton';

// export default function LoginForm({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function handleToSignup() {
//     navigation.replace('SignUp');
//   }

//   const loginHandler = async () => {
//     try {
//       if (email.length === 0 || password.length === 0) {
//         Alert.alert('Please fill out all fields');
//         return;
//       }
//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       console.log(userCred.user);
//     } catch (error) {
//       if (error.code === "auth/wrong-password") {
//         Alert.alert('Incorrect password');
//       } else if (error.code === "auth/user-not-found") {
//         Alert.alert('No user found with this email');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//       console.log(error);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <View style={styles.subInputContainer}>
//           <TextInput 
//             value={email} 
//             onChangeText={setEmail} 
//             autoCapitalize="none"
//             keyboardType="email-address"
//             placeholder='Email'
//             style={styles.input}
//             />
//         </View>

//         <View style={styles.subInputContainer}>
//           <TextInput 
//             value={password} 
//             onChangeText={setPassword} 
//             secureTextEntry
//             placeholder='Password'
//             style={styles.input}
//           />
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         <PressableButton
//           pressedFunction={loginHandler}
//           componentStyle={styles.button}
//         >
//           <Text style={styles.btnLoginText}>Log in</Text>
//         </PressableButton>
//         <PressableButton
//           pressedFunction={handleToSignup}
//           PressableButton={styles.button}
//         >
//           <Text style={styles.btnRegisterText}>New User? Create an account</Text>
//         </PressableButton>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: SPACING.medium,
//     backgroundColor: COLORS.background,
//   },
//   inputContainer: {
//     justifyContent: 'center',
//     alignItems: 'stretch',
//   },
//   subInputContainer: {
//     flex: 1,
//   },
//   label: {
//     fontSize: FONTSIZE.body,
//     color: COLORS.foreground,
//     marginBottom: SPACING.xsmall,
//     fontWeight: 'bold',
//   },
//   input: {
//     // minWidth: 200,
//     padding: SPACING.small,
//     marginVertical: SPACING.xsmall,
//     borderWidth: 1,
//     borderColor: COLORS.foreground,
//     borderRadius: ROUNDED.small,
//     backgroundColor: COLORS.background,
//     color: COLORS.foreground,
//   },

//   buttonContainer: {
//     marginTop: SPACING.medium,
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: SPACING.small,
//     borderRadius: ROUNDED.small,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: SPACING.default,
//   },
//   btnLoginText: {
//     fontSize: FONTSIZE.body,
//     textAlign: 'center',
//     color: COLORS.background,
//     fontWeight: 'bold'
//   },
//   btnRegisterText: {
//     fontSize: FONTSIZE.body,
//     textAlign: 'center',
//     color: COLORS.foreground,
//   },
// });

import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';
import { COLORS, FONTSIZE, SPACING, ROUNDED } from '../global';
import PressableButton from './PressableButton';

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
          <Text style={styles.btnLoginText}>Log in</Text>
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