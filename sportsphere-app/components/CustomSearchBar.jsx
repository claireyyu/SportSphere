import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../constants';

const CustomSearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={26} color={COLORS.primary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.lightGray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputArea,
    borderRadius: ROUNDED.small, 
    paddingVertical: SPACING.small,
  },
  icon: {
    marginHorizontal: SPACING.xsmall,
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.medium,
    color: COLORS.black,
  },
});
