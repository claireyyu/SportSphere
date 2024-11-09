import { StyleSheet, View, Text, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { COLORS } from "../global";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableButton from "./PressableButton";

export default function DatePicker({ date, setDate, showDatePicker, setShowDatePicker }) {

  const handlePressDatePicker = () => {
    if (!date) {
      setDate(new Date()); // Set current date when opening picker for the first time
      setShowDatePicker(true);
    } else {
      setShowDatePicker(!showDatePicker);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate);
    // setShowDatePicker(false);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.label}>Date *</Text>
        {/* <TextInput
          style={styles.input}
          value={date ? date.toDateString() : ''}
          editable={true}
          onPressIn={handlePressDatePicker}
        /> */}
        <PressableButton pressedFunction={handlePressDatePicker}>
          <MaterialCommunityIcons name="calendar-blank" size={24} color={COLORS.primary} />
        </PressableButton>
      </View>


      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    zIndex: 1000,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    // backgroundColor: COLORS.border,
    padding: 5,
    color: COLORS.foreground,
  },
});