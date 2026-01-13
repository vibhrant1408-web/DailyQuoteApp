/**
 * Error Display Component
 * Shows error message with retry option
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius } from '../styles/theme';
import { Button } from './Button';

/**
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {() => void} props.onRetry - Function to call on retry
 * @param {boolean} props.showRetry - Whether to show retry button
 */
export function ErrorDisplay({ message, onRetry, showRetry = true }) {
  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.message}>{message}</Text>
        {showRetry && (
          <Button
            label="Retry"
            onPress={onRetry}
            variant="primary"
            size="medium"
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  errorBox: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSizes.base,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  button: {
    marginTop: Spacing.md,
  },
});
