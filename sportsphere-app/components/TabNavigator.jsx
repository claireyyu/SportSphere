import { StyleSheet, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityScreen from '../screens/ActivityScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, ROUNDED, SPACING, SHADOW, SIZE } from '../global';
import ActivityScreenHeader from './ActivityScreenHeader';
import TitleScreenHeader from './TitleScreenHeader';
import ProfileScreenHeader from './ProfileScreenHeader';
import ActivityStack from './ActivityStack';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const [modalVisible, setModalVisible] = useState(false);

  function handleModalVisible() {
    setModalVisible(!modalVisible);
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Activity') {
            iconName = 'basketball-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Map') {
            iconName = 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // Conditional styling for focused (active) tab
          return (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={SIZE.tabIcon}
                color={focused ? COLORS.background : COLORS.foreground}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen
        name="Activity"
        // component={ActivityScreen}
        options={{
          header: () => <ActivityScreenHeader modalHandler={handleModalVisible} />,
        }}
      >
        {() => (
          <ActivityScreen modalVisible={modalVisible} modalHandler={handleModalVisible} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: () => <TitleScreenHeader title="Chat" />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => <TitleScreenHeader title="Map" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <ProfileScreenHeader />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    minHeight: SIZE.tabBar,
    borderRadius: ROUNDED.default,
    marginBottom: SPACING.medium,
    marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.background,

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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: ROUNDED.default,
  },
});
