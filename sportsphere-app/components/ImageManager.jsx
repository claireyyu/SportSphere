import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './PressableButton';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'

export default function ImageManager() {
  return (
    <View style={styles.buttonContainer}>
        <Text style={styles.textInfo}>Add Photos for your activity: </Text>
        <PressableButton>
            <Feather name="camera" size={24} color="black" />
        </PressableButton>
        <PressableButton>
            <AntDesign name="picture" size={24} color="black" />
        </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    marginLeft: 0,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
