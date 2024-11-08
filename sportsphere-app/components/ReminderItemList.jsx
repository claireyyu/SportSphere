import React from 'react';
import { StyleSheet, Text, View, Switch, FlatList } from 'react-native';
import { COLORS, FONTSIZE, SPACING, ROUNDED, SHADOW } from '../global';

export default function ReminderItemList() {
  const data = [
    { id: '1', title: 'Badminton', time: '10:00', date: 'Aug 20, 2024' },
    { id: '2', title: 'Football', time: '15:20', date: 'Aug 24, 2024' },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReminderItem title={item.title} time={item.time} date={item.date} />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

function ReminderItem({ title, time, date }) {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Switch
        trackColor={{ false: COLORS.background, true: COLORS.primary }}
        thumbColor={isEnabled ? COLORS.background : COLORS.background}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: SPACING.large,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: ROUNDED.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: SHADOW.color,
    shadowOffset: SHADOW.offset,
    shadowOpacity: SHADOW.opacity,
    shadowRadius: SHADOW.radius,
    elevation: SHADOW.elevation,
  },
  title: {
    fontSize: FONTSIZE.body,
    fontWeight: 'bold',
    marginBottom: SPACING.xsmall,
    color: COLORS.foreground,
  },
  time: {
    fontSize: FONTSIZE.h1,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  date: {
    fontSize: FONTSIZE.body,
    color: COLORS.secondaryText,
  },
});