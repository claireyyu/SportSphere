import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, ROUNDED, SPACING, FONTSIZE, SIZE } from '../global';

const SearchBar = ({ placeholder, value, onChangeText }) => {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.border}
        value={value}
        onChangeText={onChangeText}
      >
      </TextInput>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: SIZE.searchBox,
    marginTop: SPACING.xl,
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.body,
    color: COLORS.theme,
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: ROUNDED.m,
    paddingHorizontal: SPACING.m,
    // padding: SPACING.m,s
  },
});
