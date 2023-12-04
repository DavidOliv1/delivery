import { create } from "zustand";

type PlaceModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const usePlaceModal = create<PlaceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlaceModal;
