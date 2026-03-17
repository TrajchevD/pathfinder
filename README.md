# PathFinder

A React Native (Expo) app to track your physical movements in real-time, save routes, and review past activities.

## How to Run

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root and add your MapTiler API key:
```
   EXPO_PUBLIC_MAPTILER_KEY=your_key_here
```
4. Start the development server:
```bash
   npx expo start
```
5. Press `A` to open on Android emulator (make sure Android Studio emulator is running)

## AI Tools Used

- **Claude (Anthropic)** — Used for full project scaffolding, architecture decisions, and generating all component/screen code. Particularly helpful for wiring up expo-location permissions, SQLite database setup, and MapTiler UrlTile integration.
- **GitHub Copilot** — Used for inline suggestions while editing and debugging.

## Biggest Challenge

The trickiest part of the vibe coding process was correctly integrating MapTiler with `react-native-maps` using the `UrlTile` component instead of the default Google Maps tiles, while ensuring the coordinate system and zoom levels rendered correctly on Android.

## Tech Stack

- Expo (Managed Workflow)
- React Native Maps + MapTiler
- Zustand (state management)
- Expo SQLite (local persistence)
- Expo Location (GPS tracking)
- NativeWind / Tailwind (styling)
- React Navigation (bottom tabs + stack)