//Code for MapTiler
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StatusBar, Alert } from 'react-native';
// // import MapView, { Polyline, Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { useTrackingStore } from '../store/useTrackingStore';
// import { useLocation } from '../hooks/useLocation';
// import { StatsBar } from '../components/StatsBar';
// import { TrackingButton } from '../components/TrackingButton';
// import { PermissionDenied } from '../components/PermissionDenied';
// import { saveActivity } from '../database/db';
// import { haversineDistance } from '../utils/distance';
// import { Colors } from '../constants/colors';

// import MapView, { Polyline, Marker, UrlTile } from 'react-native-maps';
// const MAPTILER_KEY = 'o5uVIsPXFPeqAbkviNmQ';
// export function MapScreen() {
//   const mapRef = useRef<MapView>(null);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   const {
//     isTracking,
//     coordinates,
//     elapsedSeconds,
//     setIsTracking,
//     setStartTime,
//     resetTracking,
//   } = useTrackingStore();

//   useLocation();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setPermissionDenied(true);
//         return;
//       }
//       const location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//     })();
//   }, []);

//   useEffect(() => {
//     if (coordinates.length > 0 && mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude: coordinates[coordinates.length - 1].latitude,
//         longitude: coordinates[coordinates.length - 1].longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       });
//     }
//   }, [coordinates]);

//   function handleStart() {
//     setStartTime(Date.now());
//     setIsTracking(true);
//   }

//   function handleStop() {
//     if (coordinates.length < 2) {
//       Alert.alert('Too Short', 'Record a longer route before saving.');
//       resetTracking();
//       return;
//     }
//     const distance = haversineDistance(coordinates);
//     const date = new Date().toISOString();
//     saveActivity(date, distance, elapsedSeconds, coordinates);
//     Alert.alert('Saved!', 'Your activity has been saved.', [
//       { text: 'OK', onPress: resetTracking },
//     ]);
//   }

//   if (permissionDenied) return <PermissionDenied />;

//   const region = currentLocation
//     ? {
//         latitude: currentLocation.latitude,
//         longitude: currentLocation.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       }
//     : {
//         latitude: 41.9981,
//         longitude: 21.4254,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       };

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.background }}>
//       <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

//       <View style={{
//         paddingTop: 52,
//         paddingBottom: 16,
//         paddingHorizontal: 20,
//         backgroundColor: Colors.background,
//       }}>
//         <Text style={{ color: Colors.text, fontSize: 28, fontWeight: 'bold' }}>
//           PathFinder
//         </Text>
//         <Text style={{ color: Colors.textMuted, fontSize: 14 }}>
//           {isTracking ? '🔴 Recording...' : 'Ready to track'}
//         </Text>
//       </View>

//       <View style={{ flex: 1, marginHorizontal: 16, borderRadius: 20, overflow: 'hidden' }}>
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={region}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           mapType="none"
//         >
//            <UrlTile
//     urlTemplate={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
//     maximumZ={19}
//     flipY={false}
//     zIndex={1}
//     tileSize={256}
//   /> 
//           {coordinates.length > 1 && (
//             <Polyline
//               coordinates={coordinates}
//               strokeColor={Colors.primary}
//               strokeWidth={4}
//             />
//           )}
//           {coordinates.length > 0 && (
//             <Marker
//               coordinate={coordinates[0]}
//               title="Start"
//               pinColor="green"
//             />
//           )}
//         </MapView>
//       </View>

//       <View style={{ backgroundColor: Colors.background, paddingTop: 16 }}>
//         {isTracking && <StatsBar />}
//         <TrackingButton
//           isTracking={isTracking}
//           onStart={handleStart}
//           onStop={handleStop}
//         />
//       </View>
//     </View>
//   );
// }

//Code for Google
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTrackingStore } from '../store/useTrackingStore';
import { useLocation } from '../hooks/useLocation';
import { StatsBar } from '../components/StatsBar';
import { TrackingButton } from '../components/TrackingButton';
import { PermissionDenied } from '../components/PermissionDenied';
import { saveActivity } from '../database/db';
import { haversineDistance } from '../utils/distance';
import { Colors } from '../constants/colors';

export function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const {
    isTracking,
    coordinates,
    elapsedSeconds,
    setIsTracking,
    setStartTime,
    resetTracking,
  } = useTrackingStore();

  useLocation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coordinates[coordinates.length - 1].latitude,
        longitude: coordinates[coordinates.length - 1].longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [coordinates]);

  function handleStart() {
    setStartTime(Date.now());
    setIsTracking(true);
  }

  function handleStop() {
    if (coordinates.length < 2) {
      Alert.alert('Too Short', 'Record a longer route before saving.');
      resetTracking();
      return;
    }
    const distance = haversineDistance(coordinates);
    const date = new Date().toISOString();
    saveActivity(date, distance, elapsedSeconds, coordinates);
    Alert.alert('Saved!', 'Your activity has been saved.', [
      { text: 'OK', onPress: resetTracking },
    ]);
  }

  if (permissionDenied) return <PermissionDenied />;

  const region = currentLocation
    ? {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 41.9981,
        longitude: 21.4254,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={{
        paddingTop: 52,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
      }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: 'bold' }}>
          PathFinder
        </Text>
        <Text style={{ color: Colors.textMuted, fontSize: 14 }}>
          {isTracking ? '🔴 Recording...' : 'Ready to track'}
        </Text>
      </View>

      <View style={{ flex: 1, marginHorizontal: 16, borderRadius: 20, overflow: 'hidden' }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType="standard"
        >
          {coordinates.length > 1 && (
            <Polyline
              coordinates={coordinates}
              strokeColor={Colors.primary}
              strokeWidth={4}
            />
          )}
          {coordinates.length > 0 && (
            <Marker
              coordinate={coordinates[0]}
              title="Start"
              pinColor="green"
            />
          )}
        </MapView>
      </View>

      <View style={{ backgroundColor: Colors.background, paddingTop: 16 }}>
        {isTracking && <StatsBar />}
        <TrackingButton
          isTracking={isTracking}
          onStart={handleStart}
          onStop={handleStop}
        />
      </View>
    </View>
  );
}