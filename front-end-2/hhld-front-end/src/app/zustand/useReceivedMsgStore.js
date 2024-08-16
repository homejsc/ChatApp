import { create} from "zustand";

export const useReceivedMsgStore = create((set)=>({
    receivedMsgs: [],
    updateReceivedMsg : (receivedMsgs) => set({receivedMsgs})
})) 