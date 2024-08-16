import React, { useEffect, useState } from 'react'
import { useUserStore } from '../zustand/useUserStore'
import { useAuthStore } from '../zustand/useAuthStore';
import { useChatReceiverStore } from '../zustand/useChatReceiver';
import { useChatmsgStore } from '../zustand/useChatmsgStore';
import axios from 'axios';
import { useReceivedMsgStore } from '../zustand/useReceivedMsgStore';


const ChatUsers = () => {


  const { users } = useUserStore()
  const { authname } = useAuthStore()
  const { chatReceiver, updateChatReceiver } = useChatReceiverStore()
  const [color, setColor] = useState()
  const { chatMsgs, updateChatMsgs } = useChatmsgStore()
  const { receivedMsgs, updateReceivedMsg } = useReceivedMsgStore()

  const setChatReceiver = (receiver, index) => {
    updateChatReceiver(receiver)
    const result = color.map((colors, i) => {
      if (i === index) {
        return { user: colors.user, colour: 'bg-green-500' }
      }
      else {
        return colors
      }
    })
    setColor(result)

  }
  useEffect(() => {
    console.log(chatMsgs);
    const getMsgs = async () => {
      const result = await axios(`${process.env.NEXT_PUBLIC_HOST}:8080/msgs`, {
        params: {
          sender: authname,
          receiver: chatReceiver
        }
      },
        {
          withCredentials: true
        }
      )

      if (result.data.length != 0) {
        updateChatMsgs(result.data)
      }
      else {
        updateChatMsgs([])
      }
    }
    if (chatReceiver) {
      const result = receivedMsgs.filter(msg => msg.sender != chatReceiver)
      console.log(result);
      updateReceivedMsg(result)
      getMsgs()
    }


  }, [chatReceiver])

  useEffect(() => {
    const length = users.length
    console.log(receivedMsgs);
    console.log(length);
    console.log(chatMsgs);
    console.log(chatReceiver);
    const result = users.map((user, i) => {
      if (user.username === chatReceiver) {
        return { user: user.username, colour: 'bg-green-500' }
      }
      else {
        return { user: user.username, colour: 'bg-blue-500' }
      }
    })
    setColor(result)
  }, [users, chatReceiver, receivedMsgs])

  
  return (

    <div>
      {color ? color.map((color, index) => {
        return (
          color.user === authname ? null : (

            <div key={index} onClick={() => setChatReceiver(color.user, index)} className={`${color.colour} rounded-full m-3 p-5`}>
              <span>{color.user} </span>  {(receivedMsgs.filter(msg => msg.sender === color.user).length > 0 ? <span> <span className='p-5 text-green-600'>{receivedMsgs.filter(msg => msg.sender === color.user).map(msg => msg.msg).slice(length - 1)} </span>  <span className='p-5 text-black bg-white rounded-xl'>{receivedMsgs.filter(msg => msg.sender === color.user).map(msg => msg.msg).length} </span> </span> : null)} 
            </div>)
        )
      }) : null}
    </div>
  )
}

export default ChatUsers
