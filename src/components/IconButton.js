/**
 * Icon Button Component
 * Circular button for icon-only actions
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../styles/theme';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {() => void} props.onPress - Function to call on press
 * @param {'small' | 'medium' | 'large'} props.size - Button size
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {Object} props.style - Additional styles
 * @param {string} props.testID - Test ID
 */
export function IconButton({
  icon,
  onPress,
  size = 'medium',
  disabled = false,
  style,
  testID,
}) {
  const buttonStyle = [
    styles.button,
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
  },
  smallButton: {
    width: 40,
    height: 40,
  },
  mediumButton: {
    width: 50,
    height: 50,
  },
  largeButton: {
    width: 60,
    height: 60,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
