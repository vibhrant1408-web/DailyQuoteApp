/**
 * Icon Action Button Component
 * Reusable circular button for actions (favorite, share, delete, refresh)
 */

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

/**
 * @param {Object} props
 * @param {number} props.iconSource - Icon image source
 * @param {() => void} props.onPress - Function to call on press
 * @param {string} props.tintColor - Icon color
 * @param {string} props.backgroundColor - Button background color
 * @param {boolean} props.isActive - Whether button is in active state
 * @param {string} props.testID - Test ID
 */
export function IconActionButton({
  iconSource,
  onPress,
  tintColor = '#9CA3AF',
  backgroundColor = '#F3F4F6',
  isActive = false,
  testID,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isActive ? '#FCE7F3' : backgroundColor }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      <Image
        source={iconSource}
        style={[
          styles.icon,
          { tintColor }
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
