import { create } from "zustand";

interface NewTransactionModalStore {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export const useNewTransactionModalStore = create<NewTransactionModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))