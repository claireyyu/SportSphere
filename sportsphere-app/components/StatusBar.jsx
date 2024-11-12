// statusBar.js
import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../global';

export default function CustomStatusBar({
  children,
  statusBgColor,
  barStyle,
  backgroundColor
}) {
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor || COLORS.defaultBackground}}>
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
