import { create } from "zustand";

interface NewTransactionModalStore {
    isOpen: boolean
    openNewTransactionModal: () => void
    closeModal: () => void
}

export const useNewTransactionModalStore = create<NewTransactionModalStore>((set) => ({
    isOpen: false,
    openNewTransactionModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))