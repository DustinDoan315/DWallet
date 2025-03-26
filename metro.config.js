const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push("html");
  return config;
})();
