import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZE, SPACING, ROUNDED, FONTSIZE, SHADOW } from '../constants';
import {useState} from 'react';
  
export default function ProfileCard({ name, email, bio }) {
  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [bioInput, setBioInput] = useState(bio);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Name</Text>
        <TextInput style={styles.infoText} value={nameInput} onChangeText={setNameInput} placeholder={name}></TextInput>
      </View>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Email</Text>
        <TextInput style={styles.infoText} value={emailInput} onChangeText={setEmailInput} placeholder={email}></TextInput>
      </View>
      <View style={styles.profileCardRow}>
        <Text style={styles.title}>Bio</Text>
        <TextInput style={styles.infoText} value={bioInput} onChangeText={setBioInput} placeholder={bio}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.medium,
    padding: SPACING.large,
    marginVertical: SPACING.medium,
    marginHorizontal: SPACING.large,
    // Shadow properties
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  profileCardRow: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    marginBottom: SPACING.small,
  },
  title: {
    fontSize: FONTSIZE.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    width: '40%',
  },
  infoText: {
    fontSize: FONTSIZE.medium,
    color: COLORS.secondaryText,
    width: '60%',
  },
});
