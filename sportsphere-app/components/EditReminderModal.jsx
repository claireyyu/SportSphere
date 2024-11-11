import React from 'react'
import AddReminder from './AddReminder'

export default function EditReminderModal({modalVisible, handleModalVisible, route}) {

  return (
    <AddReminder modalVisible={modalVisible} handleModalVisible={handleModalVisible} route={route} />
  )
}
