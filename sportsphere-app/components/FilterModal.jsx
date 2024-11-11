import React from 'react'
import { Modal, View, StyleSheet, Text } from 'react-native'
import { Pressable } from 'react-native'

export default function FilterModal({modalVisible, modalHandler}) {
  return (
    <Modal animationType='none' transparent={true} visible={modalVisible}>
        <View style={styles.card}>
            <View style={styles.modal}>
                <Text style={styles.modalText}>Filter by:</Text>
                <Pressable style={styles.button} onPress={() => modalHandler(!modalVisible)}>
                <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>
        </View>

    </Modal>
  )
}
export const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    })
