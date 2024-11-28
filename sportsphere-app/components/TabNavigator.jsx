import { StyleSheet, View, Text } from 'react-native';
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActivityScreen from '../screens/ActivityScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS, ROUNDED, SPACING, SHADOW, SIZE } from '../global';
import ActivityStack from './ActivityStack';
import { useState } from 'react';
import LocationManager from './LocationManager';
import { UserContext } from '../context/UserProvider';
import { QueryContext } from '../context/QueryProvider';
import Entypo from '@expo/vector-icons/Entypo';
import AddActivityScreen from '../screens/AddActivityScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  function handleModalVisible() {
    setModalVisible(!modalVisible);
  }

  return (
    <>
    <LocationManager currentLocation={currentLocation} handleCurrentLocation={setCurrentLocation}/>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Activity') {
            iconName = 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Map') {
            iconName = 'map-outline';
          } else if (route.name === 'AddActivity') {
            iconName = 'add-circle';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // Conditional styling for focused (active) tab
          return (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              
              <View style={iconName == "add-circle" ? {position: 'relative', bottom: SPACING.m} : {}}>
                <Ionicons
                  name={iconName}
                  size={iconName == "add-circle" ? SIZE.addIcon : SIZE.tabIcon}
                  color={[focused ? COLORS.theme : COLORS.unfocused, iconName == "add-circle" && COLORS.theme]}
                />
              </View>
              {focused && <Entypo name="dot-single" size={SIZE.tabDot} color={SIZE.theme} />}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen
          name="Activity"
          options={{ headerShown: false }}
          >
        {() => (
          <ActivityScreen modalVisible={modalVisible} modalHandler={handleModalVisible} currentLocation={currentLocation} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
        />
      <Tab.Screen
        name="AddActivity"
          options={{ headerShown: false }}
          children={() => <AddActivityScreen currentLocation={currentLocation} />}
          // component={AddActivityScreen}
        >
      </Tab.Screen>
      <Tab.Screen
        name="Map"
        // component={MapScreen}
        children ={() => <MapScreen currentLocation={currentLocation} />}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
    </>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    minHeight: SIZE.tabBar,
    // borderRadius: ROUNDED.default,
    // marginBottom: SPACING.medium,
    // marginHorizontal: SPACING.medium,
    // backgroundColor: COLORS.themeLight,

    // Shadow properties
    // shadowColor: SHADOW.color,
    // shadowOffset: SHADOW.offset,
    // shadowOpacity: SHADOW.opacity,
    // shadowRadius: SHADOW.radius,
    // elevation: SHADOW.elevation,
    borderTopColor: COLORS.themeLight,
    paddingVertical: SPACING.small,
    justifyContent: 'center',
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
    // width: '100%',
    // backgroundColor: COLORS.primary,
    // borderRadius: ROUNDED.default,
  },
});
