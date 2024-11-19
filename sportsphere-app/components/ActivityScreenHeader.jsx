import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useContext } from 'react';
import DefaultScreenHeaderWrapper from './DefaultScreenHeaderWrapper';
import { COLORS, SPACING, SIZE } from '../global';
import SearchBar from './SearchBar';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryContext } from '../context/QueryProvider';
import { useNavigation } from '@react-navigation/native';
import FilterModal from './FilterModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ActivityScreenHeader({ currentLocation }) {
  const { searchQuery, setSearchQuery } = useContext(QueryContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [sort, setSort] = useState('date');

  const updateSearch = (text) => {
    setSearchQuery(text);
  };

  const modalHandler = (isDateSelected, isDistanceSelected) => {
    setModalVisible(!modalVisible);
    if (isDateSelected) {
      setSort('date');
    } else if (isDistanceSelected) {
      setSort('distance');
    }
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
          <PressableButton pressedFunction={()=>navigation.navigate("AddActivity", {currentLocation})}>
            <Ionicons name="add-circle-outline" size={SIZE.pressableIcon} color={COLORS.background} />
          </PressableButton>
          <PressableButton pressedFunction={modalHandler}>
            <MaterialCommunityIcons name="sort" size={SIZE.pressableIcon} color={COLORS.background} />
          </PressableButton>
        </View>
        <FilterModal modalVisible={modalVisible} modalHandler={modalHandler}/>
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
