import { create } from "zustand";

interface ConfirmationModalStore {
    isOpen: boolean
    title: string
    description: string
    onConfirm: () => void
    openConfirmModal: (opts: { onConfirm: () => void; title?: string; description?: string }) => void
    closeModal: () => void
}

export const useConfirmationModalStore = create<ConfirmationModalStore>((set) => ({
    isOpen: false,
    title: "Are you sure?",
    description: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    onConfirm: () => { },
    openConfirmModal: ({ onConfirm, title, description }) =>
        set((state) => ({
            isOpen: true,
            onConfirm,
            title: title ?? state.title,
            description: description ?? state.description,
        })),
    closeModal: () => set({ isOpen: false }),
}))