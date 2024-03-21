import { create } from 'zustand';

type UiStore = {
  topLoadingBarProgress: number;
  setTopLoadingBarProgress: (progress: number) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  topLoadingBarProgress: 0,
  setTopLoadingBarProgress: (progress) => set({ topLoadingBarProgress: progress })
}));
