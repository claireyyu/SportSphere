import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component, useState, useLayoutEffect } from 'react'
import { COLORS } from '../global'
import ReminderItemList from '../components/ReminderItemList'
import AddReminder from '../components/AddReminder'
import AddReminderButton from '../components/AddReminderButton'

export default function ReminderScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)

    function handleModalVisible() {
      setModalVisible(!modalVisible)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <AddReminderButton
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
          />
        ),
      });
    }, [navigation, modalVisible]); // ensure that the effect runs only when the navigation or modalVisible changes
    
  return (
      <View style={styles.container}>
        <ReminderItemList />
        <AddReminder modalVisible={modalVisible} handleModalVisible={handleModalVisible} />
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})