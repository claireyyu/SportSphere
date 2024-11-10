import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, ROUNDED, SPACING, FONTSIZE } from '../global';

const SearchBar = ({ placeholder, value, onChangeText }) => {

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={26} color={COLORS.primary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.border}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.defaultBackground,
    borderRadius: ROUNDED.default, 
    paddingVertical: SPACING.small,
  },
  icon: {
    marginHorizontal: SPACING.xsmall,
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.body,
    color: COLORS.black,
  },
});
