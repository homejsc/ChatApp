
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuthStore } from './zustand/useAuthStore'


const Auth = () => {
    const router = useRouter()
    const [ username , setUsername] = useState('')
    const [password ,setPassword] = useState('')
    const {updateAuthname} = useAuthStore()

    const singup = async (e)=>{
        e.preventDefault()

        updateAuthname(username)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}:5000/auth/signup`,{
            username: username,
            password: password
            },
            {
                withCredentials: true
            }
        )

        if(res.data.message === "Username aldready exists!!"){
            alert(res.data.message)
        }
        else{
            router.replace('/chat')
        }
    }


   const login = async(e)=>{
        e.preventDefault()
        updateAuthname(username)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}:5000/auth/login`,{
                username: username,
                password: password
        },
        {
            withCredentials:true
        }
    )

        if(res.data.message ==="Login credentials are wrong!!"){
            alert(message)
        }
        else{
            router.replace('/chat')
        }

    }
  return (
    <div>
        <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                <input type="user" onChange={(e)=>{setUsername(e.target.value)}} value={username}  id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}  id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className='flex '>
                <button onClick={(e)=>{singup(e)}}  type="submit" className=" m-5 flex flex-col text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                <button onClick={(e)=> {login(e)}} type="submit" className="m-5 flex flex-col text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
            </div>
        
        </form>
    </div>
  )
}

    export default Auth
