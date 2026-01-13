/**
 * Type definitions for the Daily Quote App
 */

export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface FavoriteQuote extends Quote {
  favoritedAt: number; // timestamp when it was favorited
}

export interface QuoteApiResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface RandomQuoteResponse {
  results: Quote[];
  count: number;
  totalCount: number;
}

export interface StorageError {
  message: string;
  code: string;
}
