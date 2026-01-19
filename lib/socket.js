import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

const socketRef = useRef(null);

useEffect(() => {
  socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);
