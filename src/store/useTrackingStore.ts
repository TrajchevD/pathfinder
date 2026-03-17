import { create } from 'zustand';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface TrackingState {
  isTracking: boolean;
  coordinates: Coordinate[];
  startTime: number | null;
  elapsedSeconds: number;
  setIsTracking: (val: boolean) => void;
  addCoordinate: (coord: Coordinate) => void;
  setStartTime: (time: number) => void;
  incrementElapsed: () => void;
  resetTracking: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  isTracking: false,
  coordinates: [],
  startTime: null,
  elapsedSeconds: 0,
  setIsTracking: (val) => set({ isTracking: val }),
  addCoordinate: (coord) =>
    set((state) => ({ coordinates: [...state.coordinates, coord] })),
  setStartTime: (time) => set({ startTime: time }),
  incrementElapsed: () =>
    set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),
  resetTracking: () =>
    set({ isTracking: false, coordinates: [], startTime: null, elapsedSeconds: 0 }),
}));