import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useContext } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, SIZE } from '../global';
import SearchBar from './SearchBar';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityContext } from '../context/ActivityProvider';


export default function ActivityScreenHeader({navigation}) {
  const { activityItems, searchQuery, setSearchQuery } = useContext(ActivityContext);
  const [search, setSearch] = useState("");

  const updateSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <DefaultScreenHeaderWrapper>
      <SafeAreaView style={styles.view}>
        <SearchBar
          placeholder="Explore activities..."
          value={searchQuery}
          onChangeText={updateSearch}
        />
        <View style={styles.buttons}>
          <PressableButton pressedFunction={()=>navigation.navigate("AddActivity")}>
            <Ionicons name="add-circle-outline" size={SIZE.pressableIcon} color={COLORS.background} />
          </PressableButton>
          <PressableButton>
            <Ionicons name="filter" size={SIZE.pressableIcon} color={COLORS.background} />
          </PressableButton>
        </View>
      </SafeAreaView>
    </DefaultScreenHeaderWrapper>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: SPACING.default,
    paddingHorizontal: SPACING.default,
    paddingVertical: SPACING.xsmall,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.default,
    marginLeft: SPACING.default,
  },
});
