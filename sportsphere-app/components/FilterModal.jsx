import React from 'react'
import { Modal, View, StyleSheet, Text } from 'react-native'
import { Pressable } from 'react-native'
import { COLORS, FONTSIZE, ROUNDED, SPACING } from '../global'
import Checkbox from 'expo-checkbox';

export default function FilterModal({modalVisible, modalHandler}) {
    const [isDateSelected, setDateSelection] = React.useState(true);
    const [isDistanceSelected, setDistanceSelection] = React.useState(false);
    
  return (
    <Modal animationType='none' transparent={true} visible={modalVisible}>
        <View style={styles.card}>
            <View style={styles.modal}>
                <Text style={styles.modalText}>Sort by:</Text>
                <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isDateSelected}
                    onValueChange={setDateSelection}
                    style={styles.checkbox}
                    color={COLORS.primary}
                />
                <Text style={styles.selectionText}>Latest Event</Text>
                </View>
                <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isDistanceSelected}
                    onValueChange={setDistanceSelection}
                    style={styles.checkbox}
                    color={COLORS.primary}
                />
                <Text style={styles.selectionText}>Distance</Text>
                </View>
                <Pressable style={styles.button} onPress={modalHandler}>
                <Text style={styles.buttonText}>Confirm</Text>
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
        backgroundColor: COLORS.background,
        padding: 20,
        borderRadius: ROUNDED.default,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: FONTSIZE.h2,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.small,
        alignItems: 'center',
        marginTop: SPACING.xsmall,
        borderRadius: ROUNDED.default,
    },
    buttonText: {
        color: COLORS.background,
        fontSize: FONTSIZE.body,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    selectionText: {
        fontSize: FONTSIZE.body,
    },
    })
