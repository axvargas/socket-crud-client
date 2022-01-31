import { useMemo, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
  const socket = useMemo(() => 
    io(serverPath, {
      transports: ["websocket"]
    })
  , [serverPath])
  const [online, setOnline] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server")
        setOnline(true)
      })
      socket.on("disconnect", () => {
        console.log("Disconnected from server")
        setOnline(false)
      })
    }     
  }, [socket])


  return {
    online,
    socket
  }
}