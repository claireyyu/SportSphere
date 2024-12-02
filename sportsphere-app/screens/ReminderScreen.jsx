import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component, useState, useLayoutEffect } from 'react'
import { COLORS, SPACING, ROUNDED, SIZE, FONTSIZE } from '../global'
import ReminderItemList from '../components/ReminderItemList'
import AddReminder from '../components/AddReminder'
import AddReminderButton from '../components/AddReminderButton'
import PressableButton from '../components/PressableButton'
import { Ionicons } from '@expo/vector-icons'

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
      <PressableButton
        pressedFunction={() => navigation.goBack()}
        componentStyle={{marginTop: SPACING.xxl}}
      >
        <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.theme} />
      </PressableButton>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reminders</Text>
          <PressableButton
            pressedFunction={handleModalVisible}
          >
          <View style={{marginTop: SPACING.m}}>
            <Ionicons
              name='add-circle'
              size={SIZE.logo}
              color={COLORS.theme}
              />
            </View>
          </PressableButton>
        </View>
        <Text style={styles.subtitle}>Schedule your workout today!</Text>
      </View>
        <ReminderItemList />
        <AddReminder modalVisible={modalVisible} handleModalVisible={handleModalVisible} />
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: SPACING.medium,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l, 
    },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.header,
    marginTop: SPACING.l,
  },
  subtitle: {
    fontFamily: 'Rubik_400Regular',
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
    marginBottom: SPACING.l,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})