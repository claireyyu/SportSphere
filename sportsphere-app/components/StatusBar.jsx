// statusBar.js
import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';

export default function CustomStatusBar({
  children,
  statusBgColor,
  barStyle,
}) {
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.defaultBackground}}>
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
