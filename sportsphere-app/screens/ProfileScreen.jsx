// // import { StyleSheet, Text, View } from 'react-native'
// // import React, { useEffect, useState, useContext } from 'react'
// // import ProfileActivityCardList from '../components/ProfileActivityCardList'
// // import { COLORS, SPACING, FONTSIZE, SIZE } from '../global'
// // import { UserContext } from '../context/UserProvider'
// // import { Avatar } from '@rneui/themed';


// // export default function ProfileScreen() {

// //   const { userProfile } = useContext(UserContext)

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Profile</Text>
// //       <View style={styles.profileContainer}>
// //         <Avatar
// //           size={SIZE.avatar}
// //           rounded
// //           source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
// //         />
// //         <View style={styles.profileInfo}>
// //           <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
// //           <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
// //           <Text style={styles.bio}>{userProfile?.bio || 'User Bio'}</Text>
// //         </View>
// //       </View>
// //       {/* <ProfileActivityCardList /> */}
// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     // marginHorizontal: SPACING.medium,
// //     backgroundColor: COLORS.themeLight,
// //     padding: SPACING.l,
// //     fontFamily: 'Montserrat_400Regular',
// //   },

// //   title: {
// //     fontFamily: 'Montserrat_700Bold',
// //     fontSize: FONTSIZE.h0,
// //     marginTop: SPACING.xxl,
// //   },

// //   profileContainer: {
// //     alignItems: 'center',
// //     marginHorizontal: SPACING.default,
// //     marginTop: SPACING.xl,
// //   },
// //   profileInfo: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginLeft: SPACING.default,
// //   },
// //   username: {
// //     color: COLORS.theme,
// //     fontSize: FONTSIZE.h1,
// //     fontWeight: 'bold',
// //     marginTop: SPACING.l,
// //   },
// //   email: {
// //     color: COLORS.unfocused,
// //     fontSize: FONTSIZE.tiny,
// //     fontFamily: 'Poppins_600SemiBold',
// //   },
// //   bio: {
// //     color: COLORS.theme,
// //     fontSize: FONTSIZE.body,
// //     marginTop: SPACING.xs,
// //   },
// // })

// import { StyleSheet, Text, View } from 'react-native';
// import React, { useContext } from 'react';
// import { Avatar } from '@rneui/themed';
// import { COLORS, SPACING, FONTSIZE, SIZE, ROUNDED } from '../global';
// import { UserContext } from '../context/UserProvider';
// import PressableButton from '../components/PressableButton';


// export default function ProfileScreen({ navigation }) {
//   const { userProfile } = useContext(UserContext);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       <View style={styles.profileContainer}>
//         <Avatar
//           size={SIZE.avatar}
//           rounded
//           source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
//         />
//         <View style={styles.profileInfo}>
//           <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
//           <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
//         </View>
//       </View>

//       <View style={styles.buttonsContainer}>
//         <PressableButton
//           componentStyle={styles.button}
//           pressedFunction={() => navigation.navigate('EditProfile')}
//         >
//           <Text style={styles.buttonText}>Profile Details</Text>
//         </PressableButton>
//         <PressableButton
//           componentStyle={styles.button}
//           pressedFunction={() => navigation.navigate('JoinedActivities')}
//         >
//           <Text style={styles.buttonText}>Joined Activities</Text>
//         </PressableButton>
//         <PressableButton
//           componentStyle={styles.button}
//           pressedFunction={() => navigation.navigate('Reminder')}
//         >
//           <Text style={styles.buttonText}>Reminders</Text>
//         </PressableButton>
//         <PressableButton
//           componentStyle={styles.button}
//           pressedFunction={() => {
//             console.log('User logged out');
//             // Add actual logout logic here
//           }}
//         >
//           <Text style={styles.buttonText}>Logout</Text>
//         </PressableButton>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.themeLight,
//     padding: SPACING.l,
//   },

//   title: {
//     fontFamily: 'Montserrat_700Bold',
//     fontSize: FONTSIZE.h0,
//     marginTop: SPACING.xxl,
//   },

//   profileContainer: {
//     alignItems: 'center',
//     marginTop: SPACING.xl,
//   },

//   profileInfo: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: SPACING.default,
//   },

//   username: {
//     color: COLORS.theme,
//     fontSize: FONTSIZE.h1,
//     fontWeight: 'bold',
//     marginTop: SPACING.l,
//   },

//   email: {
//     color: COLORS.unfocused,
//     fontSize: FONTSIZE.tiny,
//   },

//   buttonsContainer: {
//     marginTop: SPACING.l,
//   },

//   button: {
//     backgroundColor: COLORS.profileBtn,
//     padding: SPACING.m,
//     borderRadius: ROUNDED.s,
//     marginVertical: SPACING.s,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: COLORS.theme,
//     fontSize: FONTSIZE.body,
//     fontFamily: 'Poppins_600SemiBold',
//   },
// });

import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from '@rneui/themed';
import { COLORS, SPACING, FONTSIZE, SIZE, ROUNDED } from '../global';
import { UserContext } from '../context/UserProvider';
import PressableButton from '../components/PressableButton';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and Ionicons

export default function ProfileScreen({ navigation }) {
  const { userProfile } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{ uri: "https://avatar.iran.liara.run/public/girl" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userProfile?.username || 'User Name'}</Text>
          <Text style={styles.email}>{userProfile?.email || 'User Email'}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="person-circle-outline" size={24} color={COLORS.theme} />
              <Text style={styles.buttonText}>Profile Details</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={24} color={COLORS.theme} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('JoinedActivities')}
        >
          <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="flag-outline" size={SIZE.tabDot} color={COLORS.theme} />
              <Text style={styles.buttonText}>Joined Activities</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.theme} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => navigation.navigate('Reminder')}
        >
          <View style={styles.buttonContent}>
            <View style={styles.leftContainer}>
              <Ionicons name="notifications-outline" size={SIZE.tabDot} color={COLORS.theme} />
              <Text style={styles.buttonText}>Reminders</Text>
            </View>
            <View style={{flex: 1}}>
              <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.theme} />
            </View>
          </View>
        </PressableButton>

        <PressableButton
          componentStyle={styles.button}
          pressedFunction={() => {
            console.log('User logged out');
          }}
        >
        <View style={styles.buttonContent}>
          <View style={styles.leftContainer}>
            <Ionicons name="log-out-outline" size={SIZE.tabDot} color={COLORS.theme} />
            <Text style={styles.buttonText}>Logout</Text>
          </View>
          <View style={{flex: 1}}>
            <Ionicons name="chevron-forward-outline" size={SIZE.tabDot} color={COLORS.theme} />
          </View>
        </View>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeLight,
    padding: SPACING.l,
  },

  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: FONTSIZE.h0,
    marginTop: SPACING.xxl,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },

  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.m,
  },

  username: {
    color: COLORS.theme,
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    marginTop: SPACING.l,
  },

  email: {
    color: COLORS.unfocused,
    fontSize: FONTSIZE.tiny,
  },

  buttonsContainer: {
    flex: 1,
    marginTop: SPACING.l,
  },

  button: {
    minHeight: SIZE.welcomeLogo,
    backgroundColor: COLORS.profileBtn,
    padding: SPACING.m,
    borderRadius: ROUNDED.s,
    marginVertical: SPACING.s,
  },

  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.theme,
    fontSize: FONTSIZE.h3,
    marginLeft: SPACING.m,
    fontWeight: 'semibold',
  },

  leftContainer: {
    flex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
