// import React, { useEffect, useState } from 'react';
// import { View, Modal, StyleSheet, TextInput, Text, Alert, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../global';
// import { updateDB, writeToDB } from '../Firebase/firebaseHelper';
// import PressableButton from './PressableButton';
// import { parse, format } from 'date-fns';

// export default function AddReminder({ modalVisible, handleModalVisible, route }) {
//   const [error, setError] = useState('');
//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   function handleClearDate() { 
//     setDate(new Date());
//     setTime(new Date());
//     setTitle('');
//     setError('');
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
//       const selectedDateTime = new Date(date);
//       selectedDateTime.setHours(time.getHours());
//       selectedDateTime.setMinutes(time.getMinutes());
//       const now = new Date();
//       if (selectedDateTime < now) {
//         setError("Date and time cannot be earlier than now!");
//         setDate(now);
//         setTime(now);
//         return;
//       }

//       const newReminder = {
//         title: title || 'Untitled',
//         date: date || new Date(),
//         time: time || new Date(),
//         turnedOn: true,
//       };
//       if (isEditMode) {
//         updateDB(route.params.id, newReminder, "reminders");
//         setIsEditMode(false);
//       } else {
//         writeToDB(newReminder, "reminders");
//       }
//       handleToggleDatePicker();
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
//           handleModalVisible();
//         }}
//       >
//         <SafeAreaView style={styles.modalContainer}>
//           <View style={styles.pickerContainer}>
//             {Platform.OS === 'ios' ? (
//               <>
//                 <DateTimePicker
//                   value={time || new Date()}
//                   mode="time"
//                   display="spinner"
//                   onChange={(event, selectedTime) => {
//                     console.log('Time picked:', selectedTime);
//                     if (selectedTime) {
//                       setTime(selectedTime); // Update temporary time state
//                       }
//                   }}
//                 />
//                 <DateTimePicker
//                   value={date || new Date()}
//                   mode="date"
//                   display="calendar"
//                   onChange={(event, selectedDate) => {
//                     console.log('Date picked:', selectedDate);
//                     if (selectedDate) {
//                       setDate(selectedDate); // Update temporary date state
//                       }
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 <PressableButton
//                   pressedFunction={() => setShowDatePicker(true)}
//                   componentStyle={styles.inputButton}
//                 >
//                   <TextInput
//                     style={styles.input}
//                     value={format(date, 'MMM dd, yyyy')}
//                     editable={false}
//                   />
//                 </PressableButton>
//                 {showDatePicker && (
//                   <DateTimePicker
//                     value={date || new Date()}
//                     mode="date"
//                     display="calendar"
//                     onChange={(event, selectedDate) => {
//                       setShowDatePicker(false);
//                       console.log('Date picked:', selectedDate);
//                       if (selectedDate) {
//                         setDate(selectedDate); // Update temporary date state
//                         }
//                     }}
//                   />
//                 )}
//                 <PressableButton
//                   pressedFunction={() => setShowTimePicker(true)}
//                   componentStyle={styles.inputButton}
//                 >
//                   <TextInput
//                     style={styles.input}
//                     value={format(time, 'HH:mm')}
//                     editable={false}
//                   />
//                 </PressableButton>
//                 {showTimePicker && (
//                   <DateTimePicker
//                     value={time || new Date()}
//                     mode="time"
//                     display="spinner"
//                     onChange={(event, selectedTime) => {
//                       setShowTimePicker(false);
//                       console.log('Time picked:', selectedTime);
//                       if (selectedTime) {
//                         setTime(selectedTime); // Update temporary time state
//                         }
//                     }}
//                   />
//                 )}
//               </>
//             )}
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
//                   handleNewReminder();
//                 }}
//                 componentStyle={styles.button}
//               >
//                 <Text style={styles.btnText}>Confirm</Text>
//               </PressableButton>
//             </View>
//             <Text style={styles.erroText}>{error}</Text>

//           </View>
//         </SafeAreaView>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
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
//     backgroundColor: COLORS.background,
//     width: 250,
//     padding: 20,
//     borderRadius: ROUNDED.small,
//     alignItems: 'center',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
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
//   input: {
//     height: 35,
//     marginTop: SPACING.xsmall,
//     marginBottom: SPACING.medium,
//     borderBottomWidth: 1,
//     borderColor: COLORS.secondaryText,
//     padding: 5,
//     backgroundColor: COLORS.inputArea,
//     borderRadius: ROUNDED.small,
//     fontSize: FONTSIZE.body,
//     color: COLORS.text,
//   },
//   inputButton: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   erroText: {
//     color: COLORS.delete,
//     fontSize: FONTSIZE.small,
//     fontWeight: 'bold',
//     marginTop: SPACING.small,
//     textAlign: 'center',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, TextInput, Text, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../global';
import { updateDB, writeToDB } from '../Firebase/firebaseHelper';
import PressableButton from './PressableButton';
import { parse, format } from 'date-fns';
import DateInputer from './DateInputer';
import TimeInputer from './TimeInputer';

export default function AddReminder({ modalVisible, handleModalVisible, route }) {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);

  function handleClearDate() { 
    setDate(new Date());
    setTime(new Date());
    setTitle('');
    setError('');
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
      const selectedDateTime = new Date(date);
      selectedDateTime.setHours(time.getHours());
      selectedDateTime.setMinutes(time.getMinutes());
      const now = new Date();
      if (selectedDateTime < now) {
        setError("Date and time cannot be earlier than now!");
        setDate(now);
        setTime(now);
        return;
      }

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
      handleToggleDatePicker();
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
            <DateInputer date={date} setDate={setDate} inputerStyle={styles.reminderInput} />
            <TimeInputer time={time} setTime={setTime}inputerStyle={styles.reminderInput} />
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
                }}
                componentStyle={styles.button}
              >
                <Text style={styles.btnText}>Confirm</Text>
              </PressableButton>
            </View>
            <Text style={styles.erroText}>{error}</Text>
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
    marginHorizontal: SPACING.large,
    backgroundColor: COLORS.background,
    padding: SPACING.small,
    paddingVertical: SPACING.medium,
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
  reminderInput: {
    textAlign: 'center',
    borderColor: COLORS.border,
    marginHorizontal: SPACING.small,
    marginTop: SPACING.medium,
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
  erroText: {
    color: COLORS.delete,
    fontSize: FONTSIZE.small,
    fontWeight: 'bold',
    marginTop: SPACING.small,
    textAlign: 'center',
  },
});