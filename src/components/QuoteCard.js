/**
 * Quote Card Component
 * Displays a quote with author information
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius } from '../styles/theme';

/**
 * @param {Object} props
 * @param {Object} props.quote - Quote object to display
 * @param {string} props.quote._id - Quote ID
 * @param {string} props.quote.content - Quote content
 * @param {string} props.quote.author - Quote author
 * @param {React.ReactNode} props.children - Action buttons/elements
 */
export function QuoteCard({ quote, children }) {
  // Handle null quote
  if (!quote) {
    return null;
  }

  // Extract author name (remove " (from source)" if present)
  const authorName = quote.author.replace(/ \(.*\)/, '').trim();

  return (
    <View style={styles.container}>
      <Text style={styles.content} testID="quote-content">
        "{quote.content}"
      </Text>
      <Text style={styles.author} testID="quote-author">
        — {authorName}
      </Text>
      {children && <View style={styles.actionContainer}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  content: {
    fontSize: 20,
    lineHeight: 32.5,
    fontWeight: '400',
    color: '#000000'
  },
  author: {
    fontSize: 14,
    lineHeight: 17.5,
    fontWeight: '400',
    color: '#6B7280'
  },
  actionContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
