import {create} from 'zustand'

export const useChatmsgStore = create ((set)=>({
    chatMsgs: [],
    updateChatMsgs: (chatMsgs)=>set({chatMsgs})
}))