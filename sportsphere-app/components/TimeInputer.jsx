import React, { useState } from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from './PressableButton';
import { format } from 'date-fns';
import { COLORS, SPACING, ROUNDED, FONTSIZE } from '../global';

export default function TimeInputer({ time, setTime, inputerStyle }) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="spinner"
          themeVariant="light"
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      ) : (
        <>
          <PressableButton
            pressedFunction={() => setShowTimePicker(true)}
            componentStyle={styles.inputButton}
          >
            <TextInput
              style={[styles.input, inputerStyle]}
              value={format(time, 'HH:mm')}
              editable={false}
            />
          </PressableButton>
          {showTimePicker && (
            <DateTimePicker
              value={time || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setTime(selectedTime);
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