import { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useTrackingStore } from '../store/useTrackingStore';

export function useLocation() {
  const { isTracking, addCoordinate, incrementElapsed } = useTrackingStore();
  const locationSub = useRef<Location.LocationSubscription | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }
    return () => stopTracking();
  }, [isTracking]);

  async function startTracking() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    locationSub.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 2,
      },
      (location) => {
        addCoordinate({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );

    timerRef.current = setInterval(() => {
      incrementElapsed();
    }, 1000);
  }

  function stopTracking() {
    if (locationSub.current) {
      locationSub.current.remove();
      locationSub.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }
}