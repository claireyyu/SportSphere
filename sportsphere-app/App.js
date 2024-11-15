import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator'
import { COLORS, FONTSIZE, SIZE } from './global';
import CustomStatusBar from './components/StatusBar';
import db from './Firebase/firebaseSetup';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import TitleScreenHeader from './components/TitleScreenHeader';
import EditProfileScreen from './screens/EditProfileScreen';
import ReminderScreen from './screens/ReminderScreen';
import AddReminderButton from './components/AddReminderButton';
import ChatDetailScreen from './screens/ChatDetailScreen';
import { QueryProvider } from './context/QueryProvider';
import EditActivityScreen from './screens/EditActivityScreen';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import { useEffect, useState } from 'react';
import AuthScreenHeader from './components/AuthScreenHeader';
import { UserProvider } from './context/UserProvider';
import OrganizerProfileScreen from './screens/OrganizerProfileScreen';

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={LoginForm}
      options={{
        header: AuthScreenHeader,
      }}
    />
    <Stack.Screen name="SignUp" component={SignUpForm}
      options={{
        header: AuthScreenHeader,
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
      options={{title: "Activity Details", 
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          fontSize: FONTSIZE.h3,
          color: COLORS.background,
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerTintColor: COLORS.background,
      }}
    />
    <Stack.Screen
      name="AddActivity"
      component={AddActivityScreen}
      options={{
        title: "New Activity",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          fontSize: FONTSIZE.h3,
          color: COLORS.background,
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerTintColor: COLORS.background,
      }}
    />
    <Stack.Screen
      name="EditActivity"
      component={EditActivityScreen}
      options={{
        title: "Edit Activity",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          fontSize: FONTSIZE.h3,
          color: COLORS.background,
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerTintColor: COLORS.background,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: "Edit Profile",
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          fontSize: FONTSIZE.h3,
          color: COLORS.background,
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerTintColor: COLORS.background,
      }}
      />
      <Stack.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{
          title: "Schedule Your Workout",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            fontSize: FONTSIZE.h3,
            color: COLORS.background,
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
          headerTintColor: COLORS.background,
        }}
        />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{
          title: "Chat Detail",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleStyle: {
            fontSize: FONTSIZE.h3,
            color: COLORS.background,
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
          headerTintColor: COLORS.background,
        }}
    />
    <Stack.Screen
      name="OrganizerProfile"
      component={OrganizerProfileScreen}
      options={{
        headerShown: false,
      }}
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
      <CustomStatusBar
        statusBgColor={COLORS.primary}
        barStyle="light-content"
        backgroundColor={getBackgroundColor(isUserLoggedIn ? 'AppStack' : 'AuthStack')}
      >
        <UserProvider>
          <QueryProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {isUserLoggedIn ? AppStack : AuthStack}
              </Stack.Navigator>
            </NavigationContainer>
          </QueryProvider>
        </UserProvider>
      </CustomStatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
