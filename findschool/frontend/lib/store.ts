import { create } from 'zustand';
import { User, GeoLocation } from '@/types';

interface AppStore {
  user: User | null;
  userLocation: GeoLocation | null;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setUserLocation: (location: GeoLocation) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  userLocation: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  setUserLocation: (location) => set({ userLocation: location }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null }),
}));
