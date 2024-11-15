import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MessageScreenHeader from '../components/MessageScreenHeader'
import { useState } from 'react'

export default function MessageScreen({ route }) {
  const [uid, setUid] = useState(route.params.uid);

  return (
    <View>
      <MessageScreenHeader uid={uid} />
      <Text>MessageScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})