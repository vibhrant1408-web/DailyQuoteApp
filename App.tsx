/**
 * Daily Quote App
 * A mobile application for displaying, saving, and sharing daily quotes
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationStack } from './src/navigation/NavigationStack';
import { Colors } from './src/styles/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const statusBarColor = isDarkMode ? '#1a202c' : Colors.background;

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarColor}
      />
      <NavigationStack />
    </SafeAreaProvider>
  );
}

export default App;
