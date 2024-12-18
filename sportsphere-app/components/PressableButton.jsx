import { View, Pressable, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { COLORS } from '../global';

export default function PressableButton({ children, pressedFunction, componentStyle, pressedStyle, childrenStyle, onLongPress }) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        if (Platform.OS === 'ios') {
          return [
            styles.defaultStyle, 
            componentStyle, 
            pressed && styles.defaultIOSPressedStyle, 
            pressed && pressedStyle
          ];
        }
        return [styles.defaultStyle, componentStyle];
      }}
      android_ripple={Platform.OS === 'android' ? { color: 'grey', radius: 10 } : null}
      onLongPress={onLongPress}
    >
      <View style={[styles.defaultChildrenStyle, childrenStyle]}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    // padding: paddings.xs,
    // margin: margins.s,
    // borderRadius: rounded.s,
    // backgroundColor: COLORS.primary,
  },
  defaultIOSPressedStyle: {
    opacity: 0.5,
  },
  defaultChildrenStyle: {
    flexDirection: 'row',
  },
});
