import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING } from '../constants';
import CustomSearchBar from './CustomSearchBar';

export default function ActivityScreenHeader() {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <DefaultScreenHeaderWrapper>
      <View style={styles.view}>
        <CustomSearchBar
          placeholder="Search Activities"
          value={search}
          onChangeText={updateSearch}
        />
      </View>
    </DefaultScreenHeaderWrapper>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
});
