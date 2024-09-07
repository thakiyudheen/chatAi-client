import React,{ createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import {toast} from 'sonner'

interface SocketContextProps {
  socket: Socket | null;
  error : string | null;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  error : null
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected ..!');
      setError(null); 
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected..........!');
    });

    newSocket.on('connect_error', (err) => {
      console.log('Connection error_______:', err);
      toast.error('Please try again later.')
      setError(' Please try again later.');
    });
    setSocket(newSocket);
    
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  
  return (
    <SocketContext.Provider value={{ socket , error }}>
      {children}
    </SocketContext.Provider>
  );
};
