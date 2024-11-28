import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed';
import { COLORS, FONTSIZE, SIZE, SPACING } from '../global';
import PressableButton from '../components/PressableButton';
import ProfileCard from '../components/ProfileCard';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function EditProfileScreen() {
  const { userProfile } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <PressableButton
        pressedFunction={() => navigation.goBack()}
        componentStyle={{marginTop: SPACING.xxl}}
      >
        <Ionicons name="chevron-back-sharp" size={SIZE.pressableIcon} color={COLORS.theme} />
      </PressableButton>
      <View>
        <Text style={styles.title}>Profile Detail</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar
          size={SIZE.avatar}
          rounded
          source={{
            uri: "https://avatar.iran.liara.run/public/girl"
          }}
        />
        {/* <PressableButton>
          <Text style={styles.editProfile}>Change Profile Photo</Text>
        </PressableButton> */}
      </View>
      <View style={styles.editProfileContainer}>
        <ProfileCard name={userProfile.username} email={userProfile.email} bio={userProfile.bio}/>
      </View>
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: SPACING.l,
  },
  editProfile: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    marginTop: SPACING.small,
  },
})