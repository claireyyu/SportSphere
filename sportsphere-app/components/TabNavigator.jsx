import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ActivityScreen from '../screens/ActivityScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, ROUNDED, SPACING, SHADOW } from '../constants';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Activity') {
            iconName = 'badminton';
          } else if (route.name === 'Chat') {
            iconName = 'chat-outline';
          } else if (route.name === 'Map') {
            iconName = 'map-marker-outline';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle-outline';
          }

          // Conditional styling for focused (active) tab
          return (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <MaterialCommunityIcons
                name={iconName}
                size={28}
                color={focused ? 'white' : COLORS.foreground}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.background,
    minHeight: 80,
    borderRadius: ROUNDED.default,
    marginBottom: SPACING.medium,
    marginHorizontal: SPACING.medium,
    // Shadow properties
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: ROUNDED.default,
  },
});
