import { io } from "socket.io-client";
import { useRef, useEffect } from "react";

const socketRef = useRef(null);

useEffect(() => {
  socketRef.current = io(); // ✅ SAME ORIGIN

  return () => {
    socketRef.current.disconnect();
  };
}, []);
