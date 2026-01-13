# Daily Quote App - Setup Guide 🚀

Complete step-by-step guide to get the Daily Quote App running on your machine.

## System Requirements

- **Node.js**: v20 or higher
- **npm** or **yarn**: Latest version
- **React Native CLI**: `npm install -g @react-native-community/cli`

### Platform-Specific Requirements

**For Android:**
- Android Studio (latest version)
- Android SDK (API level 30+)
- Java Development Kit (JDK 11 or higher)

**For iOS:**
- macOS 12+
- Xcode 13+
- CocoaPods

## Installation Steps

### 1. Clone/Download Project

```bash
cd path/to/DailyQuoteApp
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### 3. Install Platform-Specific Dependencies

**For Android:**
```bash
# Usually automatic, but if needed:
npm run android:setup
```

**For iOS:**
```bash
cd ios
pod install
cd ..
```

## Running the App

### Development Server

Start the Metro bundler:
```bash
npm start
```

### Android

In a new terminal:
```bash
npm run android
```

Or manually:
```bash
npx react-native run-android
```

### iOS

```bash
npm run ios
```

Or manually:
```bash
npx react-native run-ios
```

## Testing Setup

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

## Troubleshooting

### Common Issues

**Issue: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Issue: Pod install fails (iOS)**
```bash
cd ios
rm -rf Pods
pod repo update
pod install
cd ..
```

**Issue: Android build fails**
```bash
# Clear build cache
cd android
./gradlew clean
cd ..
npm run android
```

**Issue: Port 8081 already in use**
```bash
# Run on different port
npm start -- --port 8082
```

**Issue: "Cannot find module" after npm install**
```bash
# Reset cache
npm install --legacy-peer-deps
```

## Project Structure Verification

After installation, verify this structure exists:

```
DailyQuoteApp/
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── navigation/
├── android/
├── ios/
├── App.tsx
├── app.json
├── package.json
└── README.md
```

## Environment Setup

### Create .env file (Optional)

```
# .env
API_BASE_URL=https://api.quotable.io
STORAGE_KEY=@DailyQuoteApp_favorites
```

## Metro Configuration

The project uses a custom metro configuration. If you encounter bundling issues:

1. Clear Metro cache:
```bash
npm start -- --reset-cache
```

2. Update `metro.config.js` if needed for custom modules

## Development Tips

### Hot Reload
Changes to JavaScript are automatically reloaded. For native changes:
```bash
npm start -- --reset-cache
```

### Debugging
Use React Native Debugger or built-in debugging:
- Android: Shake device and select "Debug"
- iOS: Cmd+D to open developer menu

### Performance Testing
Use React Native Profiler in developer menu to measure performance

## Building for Production

### Android

```bash
cd android
./gradlew assembleRelease
cd ..
```

APK location: `android/app/build/outputs/apk/release/`

### iOS

```bash
cd ios
xcodebuild -workspace DailyQuoteApp.xcworkspace -scheme DailyQuoteApp -configuration Release
cd ..
```

## Scripts Reference

```json
{
  "start": "react-native start",
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "test": "jest"
}
```

## Next Steps After Setup

1. **Verify the app runs** - Try the home screen
2. **Test quote fetching** - Tap "Get New Quote"
3. **Test favorites** - Save a few quotes
4. **Test share** - Share a quote to another app
5. **Close and reopen app** - Verify persistence

## Getting Help

### Resources

- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Quotable API Docs](https://quotable.io)

### Debug Logs

Enable debug logging:
```bash
DEBUG=* npm start
```

## Performance Checklist

After setup, verify:
- [ ] App launches in < 5 seconds
- [ ] Quote loads in < 2 seconds
- [ ] Favorites list scrolls smoothly
- [ ] No console errors on startup
- [ ] Memory usage is stable

---

**Successfully set up? Start building! 🎉**
