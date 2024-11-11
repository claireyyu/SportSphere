import React from 'react'
import { View, Text } from 'react-native'
import ActivityDetailCard from '../components/ActivityDetailCard'

export default function ActivityDetailScreen({ route }) {
  return (
    <View>
        <ActivityDetailCard route={route}/>
    </View>
  )
}
