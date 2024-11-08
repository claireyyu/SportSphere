import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator'
import { COLORS, FONTSIZE } from './constants';
import CustomStatusBar from './components/StatusBar';
import db from './Firebase/firebaseSetup';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import TitleScreenHeader from './components/TitleScreenHeader';
import EditProfileScreen from './screens/EditProfileScreen';
import ConfirmEditProfileButton from './components/ConfirmEditProfileButton';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
    <CustomStatusBar statusBgColor={COLORS.primary} barStyle="light-content">
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
          {/* <Stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{title: "New Activity",
              header: () => <TitleScreenHeader title="New Activity" />
            }}
          /> */}
          <Stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{
              title: "New Activity",
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTitleStyle: {
                fontSize: FONTSIZE.large,
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
                fontSize: FONTSIZE.default,
                color: COLORS.background,
                fontWeight: 'bold',
              },
              headerBackTitleVisible: false,
              headerTintColor: COLORS.background,
              headerRight: () => <ConfirmEditProfileButton />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </CustomStatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
