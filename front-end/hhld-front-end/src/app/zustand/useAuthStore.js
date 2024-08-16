import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authname:'',
    updateAuthname: (name)=>{set({authname:name})}
}))
