// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default socket;

import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
