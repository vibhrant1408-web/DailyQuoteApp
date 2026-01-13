/**
 * Quote utilities
 * Helper functions for quote operations
 */

/**
 * Extract author name from quote author string
 * @param {string} author - Author string (may contain source in parentheses)
 * @returns {string} Clean author name
 */
export const getAuthorName = (author) => {
  if (!author) return 'Unknown';
  return author.replace(/ \(.*\)/, '').trim();
};

/**
 * Create share message for a quote
 * @param {Object} quote - Quote object
 * @param {string} quote.content - Quote text
 * @param {string} quote.author - Author name
 * @returns {string} Formatted share message
 */
export const createShareMessage = (quote) => {
  if (!quote) return '';
  const authorName = getAuthorName(quote.author);
  return `"${quote.content}"\n\n— ${authorName}`;
};

/**
 * Get random item from array
 * @param {Array} array - Array to select from
 * @returns {any} Random item from array
 */
export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
