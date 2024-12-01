import React, { useContext, useEffect } from 'react'
import ChatBox from './ChatBox'
import io from 'socket.io-client';
import { useMemo } from 'react';
import UserContext from './Context/userContext';

const App = () => {
  const {message,messages, setMessages,setMessage,roomId,setRoomId,socketId,setSocketId} =useContext(UserContext)
 
  const socket = useMemo(() =>
    io("http://localhost:3000")
    , [])
  console.log('messages :->', messages)
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log("connected :-> ", socket.id);
    })
  
    socket.on("receive-message",(roomId,message)=>{
       console.log('receive-message', roomId , message )
       setMessages((msgs)=> [...msgs,message])
    })

    socket.on("welcome", (msg) => {
      console.log(msg);
  }
)
  
    return () => {
      socket.disconnect()
    }

  }, [])


  return (
    <div className='w-screen h-screen'>
      <ChatBox socket={socket} />
    </div>
  )
}

export default App