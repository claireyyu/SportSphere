import React from 'react'
import { View } from 'react-native'
import AddActivityCard from '../components/AddActivityCard'

export default function EditActivityScreen({ route }) {
  return (
    <View>
      <AddActivityCard route={route}/>
    </View>

  )
}
