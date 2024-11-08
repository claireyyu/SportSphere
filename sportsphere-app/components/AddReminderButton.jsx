import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SIZE, COLORS } from '../constants';

export default function AddReminderButton() {
  function handleOpenAddReminder() {
    console.log("Add Reminder Button Pressed");
  }
  
  return (
    <PressableButton pressedFunction={handleOpenAddReminder}>
      <Ionicons name="add-circle-outline" size={SIZE.pressableIcon} color={COLORS.background} />
    </PressableButton>
  )
}

const styles = StyleSheet.create({})