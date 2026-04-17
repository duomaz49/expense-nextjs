import { create } from "zustand";

export type StagedRow = {
    date: string;
    amount: string;
    description: string;
    categoryId: string | null;
}

interface ImportPreviewStoreState {
    isOpen: boolean
    rows: StagedRow[]
    openImportPreview: (rows: StagedRow[]) => void
    closeModal: () => void
}

export const useImportPreviewStore = create<ImportPreviewStoreState>((set) => ({
    isOpen: false,
    rows: [],
    openImportPreview: (rows) => set({ isOpen: true, rows }),
    closeModal: () => set({ isOpen: false, rows: [] }),
}))
