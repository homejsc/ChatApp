

'use client'
import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import { useAuthStore } from '../zustand/useAuthStore';
import axios from 'axios';
import { useUserStore } from '../zustand/useUserStore';
import ChatUsers from '../_components/chatUsers';
import { useChatReceiverStore } from '../zustand/useChatReceiver';
import { useChatmsgStore } from '../zustand/useChatmsgStore';
import { useReceivedMsgStore } from '../zustand/useReceivedMsgStore';

const Chat = () => {


   const [msg, setMsg] = useState([]);
   const [socket, setSocket] = useState(null);
   const [msgs,setMsgs]=useState([])
   const {authname} = useAuthStore()
   const {updateUsers }= useUserStore()
   const {chatReceiver}= useChatReceiverStore()
   const {chatMsgs,updateChatMsgs} = useChatmsgStore()
   const {receivedMsgs,updateReceivedMsg} = useReceivedMsgStore()

   const getUsers = async ()=>{
    const res = await axios (`${process.env.NEXT_PUBLIC_HOST}:5000/users`,{
            withCredentials: true
    })
    updateUsers(res.data)
}
   useEffect(() => {
        // Establish WebSocket connection
       const newSocket = io(`${process.env.NEXT_PUBLIC_HOST}:8080`,{
        query: {
            username: authname
       }});
       setSocket(newSocket);
       newSocket.on('chat msg',(msg)=>{
        console.log(chatMsgs);
            //updateChatMsgs([...chatMsgs,msg])
            updateReceivedMsg([...receivedMsgs,msg])
            console.log('received msg from client: '+msg.msg);
            //setMsgs(prevMsgs=>[...prevMsgs,{text:msg.msg,SentMsg: false}])
            
       })
       getUsers()

       // Clean up function
       return () => newSocket.close();
},[chatMsgs,receivedMsgs]);


   const sendMsg = (e) => {
       e.preventDefault();
       if(socket) {
           socket.emit('chat msg',{msg: msg,sender: authname, receiver: chatReceiver} );
           updateChatMsgs([...chatMsgs,{msg: msg,sender: authname, receiver: chatReceiver}])
           //setMsgs([...msgs,{text:msg,SentMsg: true}])
       }

   }
 
 return (
   <div className='h-screen flex divide-x-4'>
    {chatReceiver?(
        <div className=' w-1/5'>
            <ChatUsers/>
        </div>):(<div className='w-full'>
            <ChatUsers/>
        </div>)
}
        {chatReceiver ? (
        <div className='w-4/5 flex flex-col'>
            <div className=' items-center justify-center p-3 bg-green-500'>
                    <span className='relative ml-40'> {chatReceiver}</span>
            </div>
            <div className='msgs-container h-3/5 '>
                {chatMsgs.map((msg, index) => (
                    <div key={index} className={`p-5 m-3 ${msg.sender === authname? 'text-right' : 'text-left'}`}>
                        <span className={`p-5 ${msg.sender === authname? 'rounded-full text-center bg-white text-black' : 'rounded-full text-center bg-green-600 text-white'}`}> {msg.msg}</span>
                    </div>
                ))}
            </div>
            <div className='h-1/5 item-center justify-center '>
            <form onSubmit={sendMsg} className="w-max mx-auto my-10">  
                <div className=" w-max relative">  
                    <input type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Type your text here"
                            required
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Send
                    </button>
                </div>
            </form>
            </div>
        </div>): null
}
   </div>
 )
}


export default Chat


