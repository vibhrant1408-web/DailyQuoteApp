/**
 * Loading Spinner Component
 * Displays a loading indicator with optional text
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '../styles/theme';

/**
 * @param {Object} props
 * @param {string} props.message - Optional message to display
 * @param {string} props.size - Size of spinner ('small', 'large')
 */
export function LoadingSpinner({ message = 'Loading...', size = 'large' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={Colors.primary} />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: Spacing.lg,
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
});
