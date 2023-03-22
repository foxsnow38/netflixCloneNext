import { create } from "zustand";

export interface InfoModalState {
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
  movieId?: string;
}

const useInfoModal = create<InfoModalState>((set) => ({
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  movieId: undefined,
}));

export default useInfoModal;
