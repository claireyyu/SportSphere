import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator'
import { COLORS, FONTSIZE, SIZE } from './global';
import db from './Firebase/firebaseSetup';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import ReminderScreen from './screens/ReminderScreen';
import AddReminderButton from './components/AddReminderButton';
import { QueryProvider } from './context/QueryProvider';
import EditActivityScreen from './screens/EditActivityScreen';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import { useEffect, useState } from 'react';
import { UserProvider } from './context/UserProvider';
import MessageScreen from './screens/MessageScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import * as Notifications from 'expo-notifications';
import JoinedActivitiesScreen from './screens/JoinedActivitiesScreen';
import { NotificationProvider } from './context/NotificationProvider';
Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true }) });

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Welcome" component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Login" component={LoginForm}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="ResetPassword" component={ResetPasswordForm}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="SignUp" component={SignUpForm}
      options={{
        headerShown: false,
      }}
    />
  </>
)

const AppStack = (
  <>
    <Stack.Screen
      name="TabNavigator"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ActivityDetails"
      component={ActivityDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditActivity"
      component={EditActivityScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Reminder"
      component={ReminderScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="JoinedActivities"
      component={JoinedActivitiesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Message"
      component={MessageScreen}
      options={{ headerShown: false }}
    />
    </>
    )

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Checking user status", user);
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const getBackgroundColor = (stackName) => {
    switch (stackName) {
      case 'AuthStack':
        return COLORS.background;
      default:
        return COLORS.defaultBackground;
    }
  };


  return (
    <View style={styles.container}>
        <UserProvider>
          <NotificationProvider>
            <QueryProvider>
              <NavigationContainer>
                <Stack.Navigator>
                {isUserLoggedIn ? AppStack : AuthStack}
                </Stack.Navigator>
              </NavigationContainer>
            </QueryProvider>
          </NotificationProvider>
        </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeLight,
  },
});
