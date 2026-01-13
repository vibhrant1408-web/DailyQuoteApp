/**
 * Quote API Service
 * Uses the Zenquotes API (https://zenquotes.io) to fetch random quotes
 */

import axios from 'axios';

const API_BASE_URL = 'https://zenquotes.io/api';

class QuoteService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * Transform Zenquotes API response to app format
   * @param {Object} zenquoteData - Raw data from Zenquotes API
   * @returns {Object} Formatted quote object
   */
  formatQuoteData(zenquoteData) {
    return {
      _id: Math.random().toString(36).substr(2, 9),
      content: zenquoteData.q,
      author: zenquoteData.a.replace(/, type.+/, ''),
      tags: ['Famous Quotes'],
      authorSlug: zenquoteData.a.toLowerCase().replace(/\s+/g, '-'),
      length: zenquoteData.q.length,
      dateAdded: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
    };
  }

  /**
   * Fetch a single random quote
   * @returns {Promise<Object>} A random quote object
   */
  async getRandomQuote() {
    try {
      const response = await this.apiClient.get('/random');
      // Zenquotes returns an array with one object
      const quoteData = response.data[0];
      return this.formatQuoteData(quoteData);
    } catch (error) {
      console.error('Error fetching random quote:', error);
      throw new Error('Failed to fetch quote. Please check your internet connection and try again.');
    }
  }

  /**
   * Fetch random quotes (multiple)
   * @param {number} limit - Number of quotes to fetch
   * @returns {Promise<Object[]>} Array of quote objects
   */
  async getRandomQuotes(limit = 5) {
    try {
      const promises = [];
      for (let i = 0; i < limit; i++) {
        promises.push(this.getRandomQuote());
      }
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw new Error('Failed to fetch quotes. Please check your internet connection and try again.');
    }
  }

  /**
   * Search for quotes by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise<Object[]>} Array of matching quotes
   */
  async searchQuotes(keyword) {
    try {
      const response = await this.apiClient.get(`/quotes?query=${encodeURIComponent(keyword)}`);
      // Zenquotes returns an array of quotes matching the search
      return response.data.map(quote => this.formatQuoteData(quote));
    } catch (error) {
      console.error('Error searching quotes:', error);
      throw new Error('Failed to search quotes.');
    }
  }
}

export const quoteService = new QuoteService();
