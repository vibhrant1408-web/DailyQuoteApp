/**
 * Storage Service
 * Handles persistence of favorite quotes using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@DailyQuoteApp_favorites';

class StorageService {
  /**
   * Save a quote to favorites
   * @param {Object} quote - Quote object to favorite
   * @returns {Promise<void>}
   */
  async addFavorite(quote) {
    try {
      const favorites = await this.getFavorites();

      // Check if already favorited
      const alreadyFavorited = favorites.some(fav => fav._id === quote._id);
      if (alreadyFavorited) {
        throw new Error('Quote already in favorites');
      }

      const favoriteQuote = {
        ...quote,
        favoritedAt: Date.now(),
      };

      favorites.push(favoriteQuote);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  /**
   * Remove a quote from favorites
   * @param {string} quoteId - ID of quote to remove
   * @returns {Promise<void>}
   */
  async removeFavorite(quoteId) {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(fav => fav._id !== quoteId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  /**
   * Get all favorite quotes
   * @returns {Promise<Object[]>} Array of favorite quotes
   */
  async getFavorites() {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  /**
   * Check if a quote is in favorites
   * @param {string} quoteId - ID of quote to check
   * @returns {Promise<boolean>} True if quote is favorited
   */
  async isFavorite(quoteId) {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav._id === quoteId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }

  /**
   * Clear all favorites
   * @returns {Promise<void>}
   */
  async clearFavorites() {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
      throw error;
    }
  }

  /**
   * Get total count of favorites
   * @returns {Promise<number>} Number of favorites
   */
  async getFavoritesCount() {
    try {
      const favorites = await this.getFavorites();
      return favorites.length;
    } catch (error) {
      console.error('Error getting favorites count:', error);
      return 0;
    }
  }
}

export const storageService = new StorageService();
