import {create} from 'zustand'

export const useUserStore = create((set)=>({
    users: [],
    updateUsers: (users)=>(set({users: users}))
}))