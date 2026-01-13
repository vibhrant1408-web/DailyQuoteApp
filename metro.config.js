/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
