import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityScreen from '../screens/ActivityScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import AddActivityScreen from '../screens/AddActivityScreen';

const stack = createNativeStackNavigator();
export default function ActivityStack() {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen 
            name="ActivityHome" 
            component={ActivityScreen}
        />
        <stack.Screen
            name="ActivityDetails"
            component={ActivityDetailScreen}
            options={{title: "Activity Details"}}
        />
        <stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{title: "New Activity"}}
        />
    </stack.Navigator>
  )
}
