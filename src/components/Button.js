/**
 * Button Component
 * Reusable button with different variants and sizes
 */

import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../styles/theme';

/**
 * @param {Object} props
 * @param {string} props.label - Button label text
 * @param {() => void} props.onPress - Function to call on press
 * @param {'primary' | 'secondary' | 'outline'} props.variant - Button style variant
 * @param {'small' | 'medium' | 'large'} props.size - Button size
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Show loading indicator
 * @param {Object} props.style - Additional styles
 * @param {string} props.testID - Test ID
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  testID,
  icon,
}) {
  const [pressed, setPressed] = useState(false);

  const buttonStyle = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    pressed && styles.pressedButton,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? Colors.surface : Colors.primary} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyle}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  // Variants
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  // Sizes
  smallButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  mediumButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  largeButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  // Text sizes
  smallText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
  },
  mediumText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
  },
  largeText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  text: {
    color: Colors.surface,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.7,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  // Override text color for outline variant
  outlineText: {
    color: Colors.primary,
  },
});
