import { create } from "zustand";

export interface EditingBudget {
    id?: string;
    categoryId: string;
    categoryName: string;
    month: string;
    amount?: string;
}

interface BudgetFormModalStoreState {
    isOpen: boolean;
    editing: EditingBudget | null;
    open: (editing: EditingBudget) => void;
    closeModal: () => void;
}

export const useBudgetFormModalStore = create<BudgetFormModalStoreState>((set) => ({
    isOpen: false,
    editing: null,
    open: (editing) => set({ isOpen: true, editing }),
    closeModal: () => set({ isOpen: false, editing: null }),
}));
