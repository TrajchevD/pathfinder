# PathFinder 🗺️

A React Native (Expo) mobile application that allows users to track their physical movements in real-time, save their routes, and review past activities. Built as part of the Intertec AI Native Internship technical assessment.

---

## How to Run

### Prerequisites
- Node.js v18+
- Android Studio with an Android emulator (Pixel 7, API 34 recommended)
- Java 17 (required for native build)
- A free MapTiler API key from [maptiler.com](https://maptiler.com)
- A Google Maps API key from [console.cloud.google.com](https://console.cloud.google.com)

### Setup

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_USERNAME/pathfinder.git
   cd pathfinder
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root of the project:
```
   EXPO_PUBLIC_MAPTILER_KEY=your_maptiler_key_here
```

4. Add your Google Maps API key to `app.json` under:
```json
   "android": {
     "config": {
       "googleMaps": {
         "apiKey": "your_google_maps_api_key_here"
       }
     }
   }
```

5. Make sure your Android emulator is running in Android Studio, then build and run:
```bash
   npx expo run:android
```

> **Note:** This project requires a native development build (`npx expo run:android`) rather than Expo Go. This is because Expo Go does not support custom Google Maps API keys or certain native modules required for GPS tracking.

---

## Features Implemented

### 1. Real-Time Map Integration
- Integrated `react-native-maps` to display a high-quality map
- Shows the user's current location with a live blue dot
- **Two map providers implemented:**
  - **MapTiler** via `UrlTile` component — satisfies the assignment requirement. MapTiler tiles are loaded on top of the base map using the `UrlTile` component with `mapType="none"` to show only MapTiler styling
  - **Google Maps** — used as the working default since MapTiler `UrlTile` rendering has known limitations in Expo Go but works correctly in native builds

### 2. Activity Tracking
- "Start Tracking" button begins recording GPS coordinates via `expo-location`
- Draws a live polyline on the map as the user moves
- Displays live stats: Duration (formatted as MM:SS) and Estimated Distance (in meters or km) using the Haversine formula

### 3. Persistence
- "Stop & Save" button ends the session and saves the activity
- Stores Date, Distance, Duration, and full Coordinate Array locally using Expo SQLite
- Edge case handled: if the route is too short (less than 2 points), the user is prompted and the session is discarded

### 4. History & Details
- History screen lists all previous recordings with date, distance, and duration
- Detail view re-renders the recorded path on a static map with start (green) and end (red) markers
- Empty state shown when no activities have been recorded yet

### 5. Edge Case Handling
- If the user denies location permissions, a friendly `PermissionDenied` screen is shown with a button to open device settings

---

## Architecture
```
src/
├── constants/
│   └── colors.ts          — centralized color palette
├── store/
│   └── useTrackingStore.ts — Zustand global state
├── database/
│   └── db.ts              — SQLite setup and queries
├── utils/
│   └── distance.ts        — Haversine formula + formatters
├── hooks/
│   └── useLocation.ts     — GPS subscription + timer logic
├── components/
│   ├── StatsBar.tsx        — live stats (styled-components)
│   ├── TrackingButton.tsx  — start/stop button (styled-components)
│   └── PermissionDenied.tsx — permission fallback screen
└── screens/
    ├── MapScreen.tsx       — main tracking screen
    ├── HistoryScreen.tsx   — list of saved activities
    └── DetailScreen.tsx    — single activity detail view
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Expo (Development Build) | Framework |
| React Native Maps | Map rendering |
| MapTiler | Map tile provider (via UrlTile) |
| Google Maps | Fallback map provider |
| Zustand | State management |
| Expo SQLite | Local data persistence |
| Expo Location | GPS tracking |
| Styled Components | Styling library |
| React Navigation | Bottom tabs + stack navigation |

---

## AI Tools Used

- **Claude (Anthropic)** — Primary AI tool used throughout the entire project. Used for full project architecture design, generating all component and screen code, setting up SQLite database schema and queries, implementing the Haversine distance formula, wiring up Expo Location permissions and GPS subscriptions, debugging native build issues (Java version, ANDROID_HOME, Gradle errors), and converting components to styled-components. Claude was particularly valuable for diagnosing the difference between Expo Go limitations and native build capabilities when debugging the map tile rendering issue.

---

## Biggest Challenge

The biggest challenge during the vibe coding process was the **map tile rendering pipeline**. The assignment requires MapTiler integration, which works via the `UrlTile` component in `react-native-maps`. However, Expo Go intercepts network requests in a way that prevents custom tile URLs from loading correctly on Android.

The solution was to switch from `npx expo start` (Expo Go) to `npx expo run:android` which creates a true native development build. This required setting up Java 17, configuring `ANDROID_HOME`, and resolving several Gradle build issues — all of which were debugged iteratively using Claude.

Both map provider implementations are present in the codebase to demonstrate the MapTiler integration attempt and the working Google Maps fallback.