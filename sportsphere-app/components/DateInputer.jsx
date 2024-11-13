import React, { useState } from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from './PressableButton';
import { format } from 'date-fns';
import { COLORS, SPACING, ROUNDED, FONTSIZE } from '../global';

export default function DateInputer({ date, setDate, inputerStyle }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      ) : (
        <>
          <PressableButton
            pressedFunction={() => setShowDatePicker(true)}
            componentStyle={styles.inputButton}
          >
            <TextInput
              style={[styles.input, inputerStyle]}
              value={format(date, 'MMM dd, yyyy')}
              editable={false}
            />
          </PressableButton>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 35,
    marginTop: SPACING.xsmall,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
    padding: SPACING.xsmall,
    borderRadius: ROUNDED.small,
    fontSize: FONTSIZE.body,
    color: COLORS.foreground,
  },
  inputButton: {
    width: '100%',
    alignItems: 'center',
  },
});