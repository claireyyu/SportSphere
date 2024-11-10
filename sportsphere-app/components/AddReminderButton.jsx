import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZE, COLORS } from '../global';
import AddReminder from './AddReminder';


export default function AddReminderButton({modalVisible, handleModalVisible}) {
  
  function handleOpenAddReminder() {
    if (!modalVisible) {
      handleModalVisible(true)
    }
  }
  
  return (
    <PressableButton pressedFunction={handleOpenAddReminder}>
      <Ionicons name="add-circle-outline" size={SIZE.pressableIcon} color={COLORS.background} />
    </PressableButton>
  )
}

const styles = StyleSheet.create({})