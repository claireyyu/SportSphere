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
import ConfirmEditProfileButton from './components/ConfirmEditProfileButton';
import ReminderScreen from './screens/ReminderScreen';
import AddReminderButton from './components/AddReminderButton';
import ChatDetailScreen from './screens/ChatDetailScreen';
import { QueryProvider } from './context/QueryProvider';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <CustomStatusBar statusBgColor={COLORS.primary} barStyle="light-content">
        <QueryProvider>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ActivityDetails"
            component={ActivityDetailScreen}
            options={{title: "Activity Details", 
              header: () => <TitleScreenHeader title="Activity Details" />
              }
            }
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
              headerRight: () => <ConfirmEditProfileButton />,
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
        </Stack.Navigator>
          </NavigationContainer>
        </QueryProvider>
      </CustomStatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
