import ActivityCard from "./ActivityCard";
import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { SPACING } from '../global'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseSetup";
import { useEffect, useState, useContext } from 'react';
import { useActivity, ActivityContext } from "../context/ActivityProvider";
import FilterModal from "./FilterModal";
import ActivityScreenHeader from "./ActivityScreenHeader";

export default function ActivityCardList({modalVisible, modalHandler}) {
  const {activityItems, setActivityItems} = useContext(ActivityContext);
  // const [modalVisible, setModalVisible] = useState(false);

  // function handleModalVisible() {
  //   setModalVisible(!modalVisible);
  // }

  return (
    <View>
    <FilterModal modalVisible={modalVisible} modalHandler={modalHandler}/>
    <FlatList
      data={activityItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ActivityCard
          activityName={item.activityName}
          venue={item.venue}
          date={item.date}
          time={item.time}
          peopleGoing={item.peopleGoing}
          totalMembers={item.totalMembers}
          description={item.description}
          id={item.id}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
})