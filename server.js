// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const initSocket = require("./socket"); // path
// const  connectDB = require("./lib/db");

// const app = express();
// app.use(cors());
// await connectDB(); // ✅ REQUIRED

// const server = http.createServer(app);

// // 🔥 initialize socket HERE
// initSocket(server);

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const initSocket = require("./socket");
// const connectDB = require("./lib/db");

// const app = express();
// app.use(cors());

// const server = http.createServer(app);

// // 🔥 START SERVER PROPERLY
// const startServer = async () => {
//   try {
//     await connectDB(); // ✅ CONNECT ONCE
//     initSocket(server);

//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => {
//       console.log("Server running on port", PORT);
//     });
//   } catch (err) {
//     console.error("Server failed to start:", err);
//     process.exit(1);
//   }
// };

// startServer();

const express = require("express");
const http = require("http");
const initSocket = require("./socket");
const connectDB = require("./lib/db");

const app = express();
const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    initSocket(server);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
