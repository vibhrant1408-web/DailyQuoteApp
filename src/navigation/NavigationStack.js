/**
 * Navigation Configuration
 * Sets up bottom tab navigation between Home and Favorites screens
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { HomeScreen, FavoritesScreen } from '../screens';
import { storageService } from '../services/storageService';
import { Colors, FontSizes, Spacing } from '../styles/theme';

const Tab = createBottomTabNavigator();

/**
 * Tab configuration
 */
const TAB_CONFIG = {
  Home: {
    icon: 'house',
    label: 'Home',
  },
  Favorites: {
    icon: 'heart',
    label: 'Favorites',
  },
};

/**
 * Custom tab bar with icon, label, and badge
 */
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  const loadFavoritesCount = useCallback(async () => {
    try {
      const favorites = await storageService.getFavorites();
      setFavoritesCount(favorites.length);
    } catch (err) {
      console.error('Error loading favorites count:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavoritesCount();
    }, [loadFavoritesCount])
  );

  const handleTabPress = useCallback((route, isFocused, navigation) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      preventDefault: false,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  }, []);

  const getTabConfig = useCallback((routeName) => {
    return TAB_CONFIG[routeName] || { icon: '', label: '' };
  }, []);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = getTabConfig(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(route, isFocused, navigation)}
              style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
            >
              <View style={styles.tabContent}>
                <Image 
                  source={require('../assets/icons/house.png')}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor: isFocused ? '#F472B6' : Colors.textSecondary,
                      display: route.name === 'Home' ? 'flex' : 'none',
                    }
                  ]}
                />
                <Image 
                  source={require('../assets/icons/heart.png')}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor: isFocused ? '#F472B6' : Colors.textSecondary,
                      display: route.name === 'Favorites' ? 'flex' : 'none',
                    }
                  ]}
                />
                <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                  {config.label}
                </Text>
                {route.name === 'Favorites' && favoritesCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{favoritesCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export function NavigationStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: styles.header,
          headerTintColor: Colors.primary,
          headerTitleStyle: styles.headerTitle,
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Daily Quote',
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'My Favorites',
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
  },
  tabButtonFocused: {
    opacity: 1,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    position: 'relative',
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabLabelFocused: {
    color: '#F472B6',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 10,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: FontSizes.xs,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: Colors.surface,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    shadowColor: 'transparent',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
});
