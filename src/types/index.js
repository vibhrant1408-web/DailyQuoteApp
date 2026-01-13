/**
 * @typedef {Object} Quote
 * @property {string} _id - Unique identifier for the quote
 * @property {string} content - The quote text
 * @property {string} author - Author name
 * @property {string[]} tags - Associated tags
 * @property {string} authorSlug - URL-friendly author name
 * @property {number} length - Length of quote
 * @property {string} dateAdded - Date added to database
 * @property {string} dateModified - Date last modified
 */

/**
 * @typedef {Quote & {favoritedAt: number}} FavoriteQuote
 */

/**
 * @typedef {Object} QuoteApiResponse
 * @property {string} _id
 * @property {string} content
 * @property {string} author
 * @property {string[]} tags
 * @property {string} authorSlug
 * @property {number} length
 * @property {string} dateAdded
 * @property {string} dateModified
 */

/**
 * @typedef {Object} RandomQuoteResponse
 * @property {Quote[]} results
 * @property {number} count
 * @property {number} totalCount
 */

export {};
