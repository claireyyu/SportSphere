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


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </CustomStatusBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
