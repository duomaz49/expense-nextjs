import { create } from "zustand";

interface NewTransactionModalStoreState {
    isOpen: boolean
    openNewTransactionModal: () => void
    closeModal: () => void
}

export const useNewTransactionModalStore = create<NewTransactionModalStoreState>((set) => ({
    isOpen: false,
    openNewTransactionModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))