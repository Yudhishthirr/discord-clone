import { create } from 'zustand'

export type ModelType = "createServer" | "invite" | "members" | "edit_server" | "messageFile" | "delete" | "createChannel" | "deleteMessage";


interface ModalData {
    server?:any;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModelStore{
    type: ModelType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModelType,data?:ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) =>{
        // console.log("Opening modal with:", { type, data });
        set({ isOpen: true, type, data })
    },
    onClose: () => set({isOpen: false, type: null}),
}));

