/**
 * Home Screen
 * Displays a random quote with options to favorite and share
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
  useColorScheme,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { storageService } from '../services/storageService';
import { QuoteCard, LoadingSpinner, ErrorDisplay } from '../components';
import { Colors, Spacing, FontSizes } from '../styles/theme';
import { quotes } from '../data/quotes';

export function HomeScreen() {
  const [quote, setQuote] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';

  /**
   * Fetch a new random quote
   */
  const loadQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get random quote from local data
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const newQuote = quotes[randomIndex];
      setQuote(newQuote);
      
      // Check if this quote is already favorited
      const favorite = await storageService.isFavorite(newQuote._id);
      setIsFavorited(favorite);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load quote:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle favorite status of current quote
   */
  const toggleFavorite = async () => {
    if (!quote) return;

    try {
      if (isFavorited) {
        await storageService.removeFavorite(quote._id);
        setIsFavorited(false);
        Alert.alert('Removed', 'Quote removed from favorites');
      } else {
        await storageService.addFavorite(quote);
        setIsFavorited(true);
        Alert.alert('Saved', 'Quote added to favorites');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  /**
   * Share the current quote
   */
  const shareQuote = async () => {
    if (!quote) return;

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

  // Load initial quote on component mount
  useEffect(() => {
    loadQuote();
  }, []);

  // Debug: Log the state
  useEffect(() => {
    console.log('HomeScreen State:', { quote: !!quote, loading, error });
  }, [quote, loading, error]);

  if (loading && !quote) {
    return <LoadingSpinner message="Fetching quote..." />;
  }

  if (error && !quote) {
    return <ErrorDisplay message={error} onRetry={loadQuote} />;
  }

  if (!quote) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: FontSizes.base, color: Colors.textSecondary }}>
            No quote available. Tap the button below to load one.
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={loadQuote}
            disabled={loading}
          >
            <Text style={styles.refreshButtonText}>Get New Quote</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {quote && (
            <QuoteCard quote={quote}>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[
                    styles.iconButton, 
                    isFavorited && styles.iconButtonActive
                  ]} 
                  onPress={toggleFavorite}
                >
                  <Image 
                    source={require('../assets/icons/heart.png')}
                    style={[
                      styles.iconImage,
                      { tintColor: isFavorited ? '#F472B6' : '#9CA3AF' }
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={shareQuote}>
                  <Image 
                    source={require('../assets/icons/share-2.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={loadQuote}>
                  <Image 
                    source={require('../assets/icons/refresh-cw.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </QuoteCard>
          )}
        </View>

        {/* <View style={styles.footer}>
          <Button
            label="Get New Quote"
            onPress={loadQuote}
            variant="primary"
            size="large"
            loading={loading}
            style={styles.newQuoteButton}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.lg,
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
  iconButtonActive: {
    backgroundColor: '#FCE7F3',
  },
  refreshButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
  favoriteButtonText:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  favoriteButtonTextActive: {
    color: 'white',
    fontSize: 14,
  },
  favoriteButtonTextInactive: {
    color: '#E91E63',
    fontSize: 14,
  },
  shareButtonText: {
    color: 'white',
  },
  footer: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  newQuoteButton: {
    width: '100%',
  },
});
