import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator'
import { COLORS } from './constants';
import CustomStatusBar from './components/StatusBar';

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
