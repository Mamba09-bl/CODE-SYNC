"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Hash,
  User,
  Terminal,
  Cpu,
  Globe,
  ChevronRight,
  LogOut,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import socket from "@/lib/socket";
import { useRouter } from "next/navigation";

const App = () => {
  const [currentView, setCurrentView] = useState("landing"); // 'landing' or 'room'
  const [userData, setUserData] = useState({ name: "", roomId: "" });

  const handleJoin = (name, roomId) => {
    setUserData({ name, roomId });
    setCurrentView("room");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {currentView === "landing" ? (
        <LandingPage onJoin={handleJoin} />
      ) : (
        <RoomView
          userData={userData}
          onLeave={() => setCurrentView("landing")}
        />
      )}
    </div>
  );
};

const LandingPage = ({ onJoin }) => {
  const router = useRouter(); // Initialize router
  const [ids, setId] = useState("");
  const [name, setName] = useState("");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [language, setLanguage] = useState(null);

  // New state to manage the card view flow: 'menu' | 'create' | 'join'
  const [viewMode, setViewMode] = useState("menu");

  const createRoom = () => {
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }
    if (!language) {
      alert("Select your Language");
      return;
    }
    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();

    socket.emit("create-room", {
      roomId: newId,
      hostUsername: name,
      language,
    });

    // Navigate to the room URL
    router.push(`/showCode/${newId}/${name}`);

    // Update local state for preview
    onJoin(name, newId);
  };

  const joinRoom = () => {
    if (!ids.trim()) {
      alert("Enter Room ID");
      return;
    }
    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    // Navigate to the room URL
    router.push(`/showCode/${ids}/${name}`);

    // Update local state for preview
    onJoin(name, ids);
  };

  useEffect(() => {
    socket.on("room-created", ({ roomId, language }) => {
      console.log("Room created with language:", language);
    });

    return () => socket.off("room-created");
  }, []);

  // Helper to reset inputs when switching modes if desired
  const handleModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200" />
              <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              CodeSync
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left Column: Copy & Value Prop */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Collaboration
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Sync your code <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  in real-time.
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                Experience zero-latency pair programming. Create a room, share
                the link, and start coding together instantly. No setup
                required.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Terminal,
                  label: "Monaco Editor",
                  desc: "VS Code experience",
                },
                { icon: Users, label: "Multiplayer", desc: "Cursor tracking" },
                { icon: Cpu, label: "Low Latency", desc: "< 50ms sync" },
                { icon: Globe, label: "Cloud Run", desc: "Instant execution" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    hoveredFeature === idx
                      ? "bg-zinc-800/50 border-emerald-500/30 shadow-lg shadow-emerald-500/10 -translate-y-1"
                      : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        hoveredFeature === idx
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        {feature.label}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Card */}
          <div className="order-1 lg:order-2 w-full max-w-md mx-auto">
            <div className="relative">
              {/* Card Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-blue-600 rounded-2xl blur opacity-20"></div>

              <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl min-h-[420px] flex flex-col justify-center">
                {/* VIEW 1: MAIN MENU (SELECT CREATE OR JOIN) */}
                {viewMode === "menu" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center space-y-2 mb-8">
                      <h2 className="text-2xl font-bold text-white">
                        Get Started
                      </h2>
                      <p className="text-zinc-400 text-sm">
                        Choose how you want to collaborate
                      </p>
                    </div>

                    <button
                      onClick={() => handleModeChange("create")}
                      className="group relative w-full flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-900/20 transition-all active:scale-[0.98] border border-emerald-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-base">Create Room</div>
                          <div className="text-xs text-emerald-100/80 font-medium">
                            Start a fresh session
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>

                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-zinc-800"></div>
                      <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-bold uppercase tracking-widest">
                        OR
                      </span>
                      <div className="flex-grow border-t border-zinc-800"></div>
                    </div>

                    <button
                      onClick={() => handleModeChange("join")}
                      className="w-full group flex items-center justify-between p-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white transition-all active:scale-[0.98] shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-700/50 rounded-lg">
                          <Zap className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-base">Join Room</div>
                          <div className="text-xs text-zinc-400 font-medium">
                            Enter an existing ID
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                )}

                {/* VIEW 2: CREATE ROOM FORM */}
                {viewMode === "create" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => handleModeChange("menu")}
                        className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h2 className="text-xl font-bold text-white">
                        Create Room
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Display Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 placeholder-zinc-600 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Language
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["javascript", "python", "html"].map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setLanguage(lang)}
                              className={`py-2 px-2 rounded-lg text-sm font-medium border transition-all ${
                                language === lang
                                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                  : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                              }`}
                            >
                              {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={createRoom}
                      disabled={!name || !language}
                      className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] border border-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      Generate Room
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* VIEW 3: JOIN ROOM FORM */}
                {viewMode === "join" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => handleModeChange("menu")}
                        className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h2 className="text-xl font-bold text-white">
                        Join Room
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Display Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-600 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Room ID
                        </label>
                        <div className="relative group">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                          <input
                            type="text"
                            value={ids}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter Room ID"
                            className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-600 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={joinRoom}
                      disabled={!name || !ids.trim()}
                      className="w-full mt-4 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                    >
                      Join Session
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} CodeSync. Crafted for collaborative
          minds.
        </p>
      </footer>
    </div>
  );
};

// Mock Room View Component to demonstrate navigation
const RoomView = ({ userData, onLeave }) => {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(userData.roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
      {/* Editor Header */}

      {/* Mock Editor Area */}
    </div>
  );
};

export default App;

// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import socket from "@/lib/socket";
// import Editor from "@monaco-editor/react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const params = useParams();
//   const roomId = params.id;
//   const name = params.name;
//   const [inputMessage, setInputMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [users, setUser] = useState([]);
//   const [code, setCode] = useState(`// Write JavaScript here`);
//   const [roomInfo, setRoomInfo] = useState(null);
//   const [error, setError] = useState(false);
//   const router = useRouter();
//   const isHost = roomInfo?.hostUsername === name;
//   const isAllow = roomInfo?.editableUsers.includes(name);
//   const canEdit = isHost || isAllow;
//   const userCanEdit = roomInfo?.editableUsers.includes(users.username);
//   const hasCommon = users.some((item) =>
//     roomInfo?.editableUsers.includes(item.username)
//   );

//   useEffect(() => {
//     socket.emit("join-room", { roomId, name });
//     socket.on("receive-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       // sendMessage(msg);
//     });

//     socket.on("previous-messages", (msgs) => {
//       setMessages(msgs);
//     });

//     console.log(name);
//     return () => {
//       socket.off("receive-message");
//       socket.off("previous-messages");
//     };
//   }, [roomId]);

//   useEffect(() => {
//     socket.on("display-code", (data) => {
//       setCode(data);
//     });

//     return () => {
//       socket.off("display-code");
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("previous-code", (savedCode) => {
//       setCode(savedCode);
//     });

//     return () => {
//       socket.off("previous-code");
//     };
//   }, []);

//   useEffect(() => {
//     console.log(messages);
//   }, [messages]);

//   useEffect(() => {
//     socket.on("room-users", (users) => {
//       setUser(users); // [{username: "Ali"}, {username: "Ahmed"}]
//     });

//     return () => {
//       // socket.emit("disconnect");
//       socket.emit("leave-room", roomId);

//       socket.off("room-users");
//     };
//   }, []);

//   useEffect(() => {
//     console.log(hasCommon);
//   }, [hasCommon]);

//   useEffect(() => {
//     console.log("i am from room-info", roomInfo);
//     // console.log(userCanEdit);
//   }, [roomInfo]);

//   useEffect(() => {
//     socket.on("room-info", (hostUsername) => {
//       setRoomInfo(hostUsername);
//     });

//     return () => {
//       socket.off("room-info");
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("join-error", (message) => {
//       setError(true);
//       alert(message); // simplest for now

//       // optional: redirect user
//       window.location.href = "/";
//     });

//     return () => {
//       socket.off("join-error");
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit("send-message", {
//       roomId,
//       username: name,
//       message: inputMessage,
//     });
//   };

//   const handleChange = (value) => {
//     // if (!isHost) return; // 🚫 block non-host
//     // setCode(value);

//     socket.emit("run-code", {
//       code: value,
//       roomId,
//     });
//   };

//   return (
//     <div className="h-screen flex bg-gray-950">
//       {/* LEFT: Code Editor */}
//       <div className="flex-1 h-full">
//         <Editor
//           height="100%"
//           language="javascript"
//           value={code}
//           onChange={handleChange}
//           theme="vs-dark"
//           options={{
//             readOnly: !canEdit,
//             cursorStyle: canEdit ? "line" : "block",

//             domReadOnly: !canEdit,
//           }}
//         />
//       </div>

//       {/* RIGHT: Chat */}
//       <div className="w-full max-w-2xl bg-gray-900 border-l border-gray-800 p-6 flex flex-col">
//         <h2 className="text-xl font-semibold text-white mb-2">
//           Room: <span className="text-blue-400">{roomId}</span>
//         </h2>

//         {roomInfo && (
//           <p className="text-xs text-gray-400 mb-4">
//             Host: <span className="text-blue-300">{roomInfo.hostUsername}</span>
//           </p>
//         )}

//         {/* USERS LIST */}
//         <div className="mb-4 space-y-1">
//           {isHost &&
//             users.map((user) => {
//               const userCanEdit = roomInfo?.editableUsers.includes(
//                 user.username
//               );

//               return (
//                 <div
//                   key={user.socketId}
//                   className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
//                 >
//                   <span className="text-sm text-white font-medium">
//                     {user.username}
//                   </span>

//                   {userCanEdit ? (
//                     <button
//                       onClick={() => {
//                         socket.emit("remove-user", name, user.username, roomId);
//                       }}
//                       className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
//                     >
//                       Remove Edit
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         socket.emit("edit-user", name, user.username, roomId);
//                       }}
//                       className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
//                     >
//                       Allow Edit
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto border border-gray-800 rounded-lg p-4 space-y-2 bg-gray-950">
//           {messages.map((msg, index) => (
//             <p key={index} className="text-gray-200 text-sm">
//               <span className="font-semibold text-blue-400">
//                 {msg.username}:
//               </span>{" "}
//               {msg.message}
//             </p>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="mt-4 flex gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type message..."
//             className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={sendMessage}
//             className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
