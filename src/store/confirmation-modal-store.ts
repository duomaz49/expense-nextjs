import { create } from "zustand";

interface ConfirmationModalStoreState {
    isOpen: boolean
    title: string
    description: string
    onConfirm: () => void
    openConfirmModal: (opts: { onConfirm: () => void; title?: string; description?: string }) => void
    closeModal: () => void
}

export const useConfirmationModalStore = create<ConfirmationModalStoreState>((set) => ({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => { },
    openConfirmModal: ({ onConfirm, title, description }) =>
        set({
            isOpen: true,
            onConfirm,
            title: title ?? "",
            description: description ?? "",
        }),
    closeModal: () => set({ isOpen: false }),
}))
