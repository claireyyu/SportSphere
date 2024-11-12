// import React, { useEffect, useState } from 'react'
// import { View, Modal, StyleSheet, Button, TextInput, Text, Alert } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { COLORS, ROUNDED, SPACING } from '../global'
// import { updateDB, writeToDB } from '../Firebase/firebaseHelper';
// import PressableButton from './PressableButton';
// import { parse, format } from 'date-fns';

// export default function AddReminder({ modalVisible, handleModalVisible, route }) {
//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   function handleClearDate() { 
//     setDate(null);
//     setTime(null);
//     setTitle('');
//   }

//   function handleToggleDatePicker() {
//     handleClearDate();
//     handleModalVisible();
//   }
//   useEffect(() => {
//     if (route?.params) {
//       const { title, date, time, id } = route.params;
//       const dateObj = parse(date, 'MMM dd, yyyy', new Date());
//       const formattedDate = format(dateObj, 'yyyy-MM-dd');
//       const dateTimeString = `${formattedDate}T${time}:00`;
//       const timeObj = new Date(dateTimeString);
//       setTitle(title);
//       setDate(dateObj);
//       setTime(timeObj);
//       setIsEditMode(true);
//       console.log("Passed id: ", id);
//     }
//   }, [route?.params]);

//   function handleNewReminder() {
//     try {
//       const newReminder = {
//         title: title,
//         date: date || new Date(),
//         time: time || new Date(),
//         turnedOn: true,
//       };
//       if (isEditMode) {
//         updateDB(route.params.id, newReminder, "reminders");
//         setIsEditMode(false);
//       } else {
//       writeToDB(newReminder, "reminders");
//       }
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   } 
//   return (
//     <SafeAreaView>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           handleModalVisible()
//         }}
//       >
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.pickerContainer}>
//           <DateTimePicker
//               value={time || new Date()}
//               mode="time"
//               display="spinner"
//               onChange={(event, selectedTime) => {
//                 console.log('Time picked:', selectedTime);
//                 if (selectedTime) {
//                   const now = new Date();
//                   const selectedDateTime = new Date(date);
//                   selectedDateTime.setHours(selectedTime.getHours());
//                   selectedDateTime.setMinutes(selectedTime.getMinutes());
//                   if (selectedDateTime < now) {
//                     Alert.alert("Invalid Time", "Time cannot be earlier than the current time.");
//                     setTime(now);
//                   } else {
//                     setTime(selectedTime); // Update temporary time state
//                   }
//                 }
//               }}
//             />
//             <DateTimePicker
//               value={date || new Date()}
//               mode="date"
//               display="calendar"
//               onChange={(event, selectedDate) => {
//                 console.log('Date picked:', selectedDate);
//                 if (selectedDate) {
//                   const now = new Date();
//                   if (selectedDate < now) {
//                     Alert.alert("Invalid Date", "Date cannot be earlier than today.");
//                     setDate(now);
//                   } else {
//                     setDate(selectedDate); // Update temporary date state
//                   }
//                 }
//               }}
//             />
//             <TextInput 
//               placeholder="Badminton with friends"
//               value={title}
//               onChangeText={setTitle}
//               style={styles.titleInput}
//             />
//             <View style={styles.btnContainer}>
//               <PressableButton
//                 pressedFunction={handleToggleDatePicker}
//                 componentStyle={styles.button}
//               >
//                 <Text style={styles.btnText}>Cancel</Text>
//               </PressableButton>
//               <PressableButton
//                 pressedFunction={() => {
//                   // setTime(time); // Confirm the time when button is pressed
//                   handleNewReminder();
//                   handleToggleDatePicker();
//                 }}
//                 componentStyle={styles.button}
//               >
//                 <Text style={styles.btnText}>Confirm</Text>
//               </PressableButton>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Modal>
//     </SafeAreaView>
//   )
// }

// export const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//   },
//   btnContainer: {
//     marginTop: SPACING.medium,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   pickerContainer: {
//       backgroundColor: COLORS.background,
//       width: 250,
//       padding: 20,
//       borderRadius: ROUNDED.small,
//       alignItems: 'center',
//       shadowColor: 'black',
//       shadowOffset: {
//           width: 0,
//           height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   titleInput: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.border,
//     padding: 5,
//     marginTop: SPACING.medium,
//     alignSelf: 'stretch',
//     marginHorizontal: SPACING.medium,
//     textAlign: 'center',
//   },
//   button: {
//     marginHorizontal: SPACING.small,
//     padding: SPACING.small,
//     borderRadius: ROUNDED.small,
//     backgroundColor: COLORS.primary,
//   },
//   btnText: {
//     color: COLORS.background,
//     fontWeight: 'bold',
//   },
// })

import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TextInput, Text, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../global';
import { updateDB, writeToDB } from '../Firebase/firebaseHelper';
import PressableButton from './PressableButton';
import { parse, format } from 'date-fns';

export default function AddReminder({ modalVisible, handleModalVisible, route }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function handleClearDate() { 
    setDate(new Date());
    setTime(new Date());
    setTitle('');
  }

  function handleToggleDatePicker() {
    handleClearDate();
    handleModalVisible();
  }

  useEffect(() => {
    if (route?.params) {
      const { title, date, time, id } = route.params;
      const dateObj = parse(date, 'MMM dd, yyyy', new Date());
      const formattedDate = format(dateObj, 'yyyy-MM-dd');
      const dateTimeString = `${formattedDate}T${time}:00`;
      const timeObj = new Date(dateTimeString);
      setTitle(title);
      setDate(dateObj);
      setTime(timeObj);
      setIsEditMode(true);
      console.log("Passed id: ", id);
    }
  }, [route?.params]);

  function handleNewReminder() {
    try {
      const newReminder = {
        title: title || 'Untitled',
        date: date || new Date(),
        time: time || new Date(),
        turnedOn: true,
      };
      if (isEditMode) {
        updateDB(route.params.id, newReminder, "reminders");
        setIsEditMode(false);
      } else {
        writeToDB(newReminder, "reminders");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleModalVisible();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            {Platform.OS === 'ios' ? (
              <>
                <DateTimePicker
                  value={time || new Date()}
                  mode="time"
                  display="spinner"
                  onChange={(event, selectedTime) => {
                    console.log('Time picked:', selectedTime);
                    if (selectedTime) {
                      const now = new Date();
                      const selectedDateTime = new Date(date);
                      selectedDateTime.setHours(23);
                      selectedDateTime.setMinutes(59);
                      if (selectedDateTime < now) {
                        Alert.alert("Invalid Time", "Time cannot be earlier than the current time.");
                        setTime(now);
                      } else {
                        setTime(selectedTime); // Update temporary time state
                      }
                    }
                  }}
                />
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    console.log('Date picked:', selectedDate);
                    if (selectedDate) {
                      const now = new Date();
                      if (selectedDate < now) {
                        Alert.alert("Invalid Date", "Date cannot be earlier than today.");
                        setDate(now);
                      } else {
                        setDate(selectedDate); // Update temporary date state
                      }
                    }
                  }}
                />
              </>
            ) : (
              <>
                <PressableButton
                  pressedFunction={() => setShowDatePicker(true)}
                  componentStyle={styles.inputButton}
                >
                  <TextInput
                    style={styles.input}
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
                      console.log('Date picked:', selectedDate);
                      if (selectedDate) {
                        const now = new Date();
                        const selectedDateTime = new Date(date);
                        selectedDateTime.setHours(23);
                        selectedDateTime.setMinutes(59);
                        if (selectedDateTime < now) {
                          Alert.alert("Invalid Date", "Date cannot be earlier than today.");
                          setDate(now);
                        } else {
                          setDate(selectedDate); // Update temporary date state
                        }
                      }
                    }}
                  />
                )}
                <PressableButton
                  pressedFunction={() => setShowTimePicker(true)}
                  componentStyle={styles.inputButton}
                >
                  <TextInput
                    style={styles.input}
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
                      console.log('Time picked:', selectedTime);
                      if (selectedTime) {
                        const now = new Date();
                        const selectedDateTime = new Date(date);
                        selectedDateTime.setHours(selectedTime.getHours());
                        selectedDateTime.setMinutes(selectedTime.getMinutes());
                        if (selectedDateTime < now) {
                          Alert.alert("Invalid Time", "Time cannot be earlier than the current time.");
                          setTime(now);
                        } else {
                          setTime(selectedTime); // Update temporary time state
                        }
                      }
                    }}
                  />
                )}
              </>
            )}
            <TextInput 
              placeholder="Badminton with friends"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
            <View style={styles.btnContainer}>
              <PressableButton
                pressedFunction={handleToggleDatePicker}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </PressableButton>
              <PressableButton
                pressedFunction={() => {
                  handleNewReminder();
                  handleToggleDatePicker();
                }}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Confirm</Text>
              </PressableButton>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  btnContainer: {
    marginTop: SPACING.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: COLORS.background,
    width: 250,
    padding: 20,
    borderRadius: ROUNDED.small,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
    marginTop: SPACING.medium,
    alignSelf: 'stretch',
    marginHorizontal: SPACING.medium,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: SPACING.small,
    padding: SPACING.small,
    borderRadius: ROUNDED.small,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    marginTop: SPACING.xsmall,
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryText,
    padding: 5,
    backgroundColor: COLORS.inputArea,
    borderRadius: ROUNDED.small,
    fontSize: FONTSIZE.body,
    color: COLORS.text,
  },
  inputButton: {
    width: '100%',
    alignItems: 'center',
  },
});
