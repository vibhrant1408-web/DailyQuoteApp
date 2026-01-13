/**
 * Custom hook for managing favorites count
 */

import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { AppState } from 'react-native';

export function useFavoritesCount(refreshInterval = 1000) {
  const [count, setCount] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  const loadCount = useCallback(async () => {
    try {
      const favorites = await storageService.getFavorites();
      setCount(favorites.length);
    } catch (err) {
      console.error('Error loading favorites count:', err);
    }
  }, []);

  useEffect(() => {
    loadCount();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Set up interval to periodically refresh count
    const interval = setInterval(loadCount, refreshInterval);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [loadCount, refreshInterval]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (nextAppState === 'active') {
        loadCount();
      }
      setAppState(nextAppState);
    },
    [loadCount]
  );

  return count;
}
