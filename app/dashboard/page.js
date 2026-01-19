"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const socketRef = useRef(null);

  const [ids, setId] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState(null);
  const [viewMode, setViewMode] = useState("menu");

  // 🔌 INIT SOCKET (ONCE)
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("room-created", ({ roomId }) => {
      console.log("Room created:", roomId);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // ✅ CREATE ROOM
  const createRoom = () => {
    if (!name.trim()) return alert("Enter your name");
    if (!language) return alert("Select your Language");

    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();

    socketRef.current.emit("create-room", {
      roomId: newId,
      hostUsername: name,
      language,
    });

    router.push(`/showCode/${newId}/${name}`);
  };

  // ✅ JOIN ROOM
  const joinRoom = () => {
    if (!ids.trim()) return alert("Enter Room ID");
    if (!name.trim()) return alert("Enter your name");

    router.push(`/showCode/${ids}/${name}`);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* HEADER */}
      <header className="border-b border-white/5 h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <Code2 className="text-emerald-400" />
          <span className="font-bold text-lg">CodeSync</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-6">
        <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-8 w-full max-w-md">
          {/* MENU */}
          {viewMode === "menu" && (
            <div className="space-y-6">
              <button
                onClick={() => setViewMode("create")}
                className="w-full p-4 bg-emerald-600 rounded-xl font-bold flex justify-between"
              >
                Create Room <ArrowRight />
              </button>

              <button
                onClick={() => setViewMode("join")}
                className="w-full p-4 bg-zinc-800 rounded-xl font-bold flex justify-between"
              >
                Join Room <ArrowRight />
              </button>
            </div>
          )}

          {/* CREATE */}
          {viewMode === "create" && (
            <div className="space-y-4">
              <button onClick={() => setViewMode("menu")}>
                <ArrowLeft />
              </button>

              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-black border border-zinc-700"
              />

              <div className="grid grid-cols-3 gap-2">
                {["javascript", "python", "html"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`p-2 rounded ${
                      language === lang ? "bg-emerald-500" : "bg-zinc-800"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={createRoom}
                className="w-full p-3 bg-emerald-600 rounded-xl font-bold"
              >
                Generate Room
              </button>
            </div>
          )}

          {/* JOIN */}
          {viewMode === "join" && (
            <div className="space-y-4">
              <button onClick={() => setViewMode("menu")}>
                <ArrowLeft />
              </button>

              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-black border border-zinc-700"
              />

              <input
                placeholder="Room ID"
                value={ids}
                onChange={(e) => setId(e.target.value)}
                className="w-full p-3 rounded bg-black border border-zinc-700"
              />

              <button
                onClick={joinRoom}
                className="w-full p-3 bg-zinc-800 rounded-xl font-bold"
              >
                Join Room
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
