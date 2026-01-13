/**
 * Favorites Screen
 * Displays list of favorite quotes with ability to remove them
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Share,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { storageService } from '../services/storageService';
import { QuoteCard, LoadingSpinner } from '../components';
import { Colors, Spacing, FontSizes } from '../styles/theme';

export function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Load all favorite quotes
   */
  const loadFavorites = async () => {
    setLoading(true);
    try {
      const saved = await storageService.getFavorites();
      // Sort by most recently favorited first
      const sorted = saved.sort((a, b) => b.favoritedAt - a.favoritedAt);
      setFavorites(sorted);
    } catch (err) {
      Alert.alert('Error', 'Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove a quote from favorites
   */
  const removeFavorite = async (quoteId, quoteContent) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this quote?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            try {
              await storageService.removeFavorite(quoteId);
              await loadFavorites();
              Alert.alert('Removed', 'Quote removed from favorites');
            } catch (err) {
              Alert.alert('Error', 'Failed to remove quote');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  /**
   * Share a favorite quote
   */
  const shareQuote = async (quote) => {
    try {
      const authorName = quote.author.replace(/ \(.*\)/, '').trim();
      const shareMessage = `"${quote.content}"\n\n— ${authorName}`;

      await Share.share({
        message: shareMessage,
        title: 'Share Quote',
        url: 'https://quotable.io',
      });
    } catch (err) {
      console.error('Error sharing quote:', err);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  // Load favorites when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  if (loading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🤍</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyDescription}>
            Tap the heart icon on quotes you love to save them here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <QuoteCard quote={item}>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => shareQuote(item)}
              >
                <Image 
                  source={require('../assets/icons/share-2.png')}
                  style={styles.iconImage}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: '#FEF2F2' }]}
                onPress={() => removeFavorite(item._id, item.content)}
              >
                <Image 
                  source={require('../assets/icons/trash-2.png')}
                  style={[styles.iconImage, { tintColor: '#F87171' }]}
                />
              </TouchableOpacity>
            </View>
          </QuoteCard>
        )}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.md,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    elevation: 1
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#9CA3AF'
  },
});
