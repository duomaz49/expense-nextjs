import { create } from "zustand";

export interface EditingCategory {
    id: string;
    name: string;
}

interface CategoryFormModalStoreState {
    isOpen: boolean;
    editing: EditingCategory | null;
    openAdd: () => void;
    openEdit: (category: EditingCategory) => void;
    closeModal: () => void;
}

export const useCategoryFormModalStore = create<CategoryFormModalStoreState>((set) => ({
    isOpen: false,
    editing: null,
    openAdd: () => set({ isOpen: true, editing: null }),
    openEdit: (category) => set({ isOpen: true, editing: category }),
    closeModal: () => set({ isOpen: false, editing: null }),
}));
