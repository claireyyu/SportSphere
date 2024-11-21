import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileActivityCardList from '../components/ProfileActivityCardList'
import { COLORS, SPACING } from '../global'
import OrganizerProfileScreenHeader from '../components/OrganizerProfileScreenHeader'

export default function OrganizerProfileScreen({ route }) {
  const [uid, setUid] = useState(route.params.uid);

  return (
    <View style={styles.container}>
      <OrganizerProfileScreenHeader uid={uid} />
      <ProfileActivityCardList uid={uid} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})