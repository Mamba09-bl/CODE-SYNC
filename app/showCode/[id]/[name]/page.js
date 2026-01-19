"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import {
  MessageSquare,
  Users,
  Code2,
  Send,
  Crown,
  Shield,
  ShieldOff,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const params = useParams();
  const roomId = params.id;
  const name = params.name;

  const socketRef = useRef(null);

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUser] = useState([]);
  const [code, setCode] = useState(`// Write JavaScript here`);
  const [roomInfo, setRoomInfo] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [reviewText, setReview] = useState("");
  const [explainText, setExplain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ai, setAi] = useState(false);
  const [secHost, setsecHost] = useState(null);
  const [toast, setToast] = useState(null);
  const [language, setLanguage] = useState("javascript");

  const router = useRouter();

  const isHost = roomInfo?.hostUsername === name;
  const isAllow = roomInfo?.editableUsers?.includes(name);
  const canEdit = isHost || isAllow;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // 🔌 INIT SOCKET (ONCE)
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // JOIN / LEAVE ROOM
  useEffect(() => {
    if (!roomId || !name || !socketRef.current) return;

    socketRef.current.emit("join-room", { roomId, name });

    return () => {
      socketRef.current.emit("leave-room", roomId, name);
    };
  }, [roomId, name]);

  // MESSAGES
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("previous-messages", (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socketRef.current.off("receive-message");
      socketRef.current.off("previous-messages");
    };
  }, []);

  // CODE SYNC
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("display-code", setCode);
    socketRef.current.on("previous-code", setCode);

    return () => {
      socketRef.current.off("display-code");
      socketRef.current.off("previous-code");
    };
  }, []);

  // USERS / HOST
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("room-users", setUser);
    socketRef.current.on("host-changed", ({ newHost }) =>
      showToast(`${newHost} is now the host`),
    );

    return () => {
      socketRef.current.off("room-users");
      socketRef.current.off("host-changed");
    };
  }, []);

  // ROOM INFO
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("room-info", (data) => {
      setRoomInfo(data);
      if (data.language) setLanguage(data.language);
    });

    return () => {
      socketRef.current.off("room-info");
    };
  }, []);

  // JOIN ERROR
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("join-error", (msg) => {
      setError(true);
      setErrorMessage(msg);
    });

    return () => {
      socketRef.current.off("join-error");
    };
  }, []);

  useEffect(() => {
    setsecHost(users[users.length - 1]?.username);
  }, [users]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    socketRef.current.emit("send-message", {
      roomId,
      username: name,
      message: inputMessage,
    });

    setInputMessage("");
  };

  const handleChange = (value) => {
    setCode(value);
    socketRef.current.emit("run-code", { code: value, roomId });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-[#0a0a0a] text-gray-100">
      {toast && (
        <div
          className="fixed top-5 right-5 z-[9999]
      rounded-lg bg-red-600 text-white
      px-4 py-3 shadow-2xl
      border border-red-400
      animate-slide-in"
        >
          {toast}
        </div>
      )}

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm rounded-xl bg-[#0f0f0f] border border-red-500/30 p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-red-400 mb-2">
              Room Error
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed">
              {errorMessage}
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setError(false);
                  window.location.href = "/dashboard";
                }}
                className="px-4 py-2 text-xs font-medium rounded-lg
          bg-red-500 hover:bg-red-600 text-white transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT: Code Editor */}
      <div className="flex-1 flex flex-col h-[50vh] lg:h-full lg:border-r border-gray-800/50">
        <div className="h-14 border-b border-gray-800/50 bg-[#0f0f0f] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300">
              Code Editor
            </span>
            {canEdit ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Editing
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-400 border border-gray-700/50">
                Read Only
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>JavaScript</span>
          </div>
        </div>
        {/* show code ui */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={handleChange}
            theme="vs-dark"
            options={{
              readOnly: !canEdit,
              cursorStyle: canEdit ? "line" : "block",
              domReadOnly: !canEdit,
              fontSize: 14,
              fontFamily: "'Geist Mono', 'Fira Code', monospace",
              lineHeight: 1.6,
              padding: { top: 16, bottom: 16 },
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
              minimap: {
                minimap: { enabled: false },
                scale: 1,
                fontSize: 13,
              },
            }}
          />
        </div>
      </div>

      {/* RIGHT: Chat Panel */}
      <div className="w-full lg:w-[400px] bg-[#0f0f0f] flex flex-col border-t lg:border-t-0 lg:border-l border-gray-800/50">
        <div className="h-25 border-b border-gray-800/50 bg-[#0a0a0a] px-4 flex items-center justify-between">
          <div className="flex-22">
            <div className="flex flex-col gap-3">
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-gray-200">Room</h2>

                  <button
                    onClick={copyRoomId}
                    className="group flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-emerald-400">
                      {roomId?.toString().slice(0, 8)}...
                    </span>
                    {copied ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-500 group-hover:text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Chat / AI toggle */}
                <div className="flex items-center rounded-lg bg-gray-800/60 p-1 border border-gray-700/60">
                  <button
                    onClick={() => {
                      setAi(false);
                      setExplain("");
                      setReview("");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all
        ${
          !ai
            ? "bg-emerald-500 text-white shadow"
            : "text-gray-400 hover:text-gray-200"
        }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat
                  </button>

                  <button
                    onClick={() => setAi(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all
        ${
          ai
            ? "bg-emerald-500 text-white shadow"
            : "text-gray-400 hover:text-gray-200"
        }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI
                  </button>
                </div>
              </div>

              {/* AI actions row */}
              {ai && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={async () => {
                      const res = await fetch("/api/review", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code }),
                      });
                      const result = await res.json();
                      setExplain("");
                      setReview(result.user);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md
        bg-emerald-500/10 hover:bg-emerald-500/20
        text-emerald-400 text-xs font-medium
        border border-emerald-500/20 hover:border-emerald-500/30
        transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Review
                  </button>

                  <button
                    onClick={async () => {
                      const res = await fetch("/api/explain", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code }),
                      });
                      const result = await res.json();
                      setReview("");
                      setExplain(result.user);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md
        bg-emerald-500/10 hover:bg-emerald-500/20
        text-emerald-400 text-xs font-medium
        border border-emerald-500/20 hover:border-emerald-500/30
        transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Explain
                  </button>
                </div>
              )}
            </div>

            {/* show hostname */}

            {roomInfo && (
              <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                <Crown className="w-3 h-3 text-yellow-500/70" />
                <span className="text-yellow-500/70">
                  {roomInfo.hostUsername}
                </span>
              </p>
            )}
          </div>
        </div>
        {/* show review text */}
        {reviewText && (
          <div className="mt-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <div className="flex items-start gap-2 p-3 border-b border-emerald-500/10">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-emerald-400">AI Review</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto px-5 py-2">
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {reviewText}
              </p>
            </div>
          </div>
        )}
        {/* show explain text */}
        {explainText && (
          <div className="mt-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <div className="flex items-start gap-2 p-3 border-b border-emerald-500/10">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-emerald-400">AI Review</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto px-5 py-2">
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                {explainText}
              </p>
            </div>
          </div>
        )}

        {ai ? (
          ""
        ) : (
          <div className="flex border-b border-gray-800/50 bg-[#0a0a0a]">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "chat"
                  ? "text-emerald-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
              {activeTab === "chat" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === "users"
                  ? "text-emerald-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Users className="w-4 h-4" />
              Users
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
                {users.length}
              </span>
              {activeTab === "users" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
              )}
            </button>
          </div>
        )}

        {ai ? (
          ""
        ) : (
          <div className="flex-1 overflow-hidden">
            {activeTab === "chat" ? (
              /* Chat Messages */
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="w-12 h-12 text-gray-700 mb-3" />
                      <p className="text-sm text-gray-500">No messages yet</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Start the conversation!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isSentByMe = msg.username === name;

                      return (
                        <div
                          key={index}
                          className={`flex ${
                            isSentByMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[75%] ${
                              isSentByMe ? "order-1" : ""
                            }`}
                          >
                            {!isSentByMe && (
                              <span className="text-[11px] font-medium text-gray-400 ml-1 mb-1 block">
                                {msg.username}
                              </span>
                            )}
                            <div
                              className={`px-3.5 py-2 rounded-2xl ${
                                isSentByMe
                                  ? "bg-emerald-500 text-white rounded-br-md"
                                  : "bg-gray-800 text-gray-100 rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm leading-relaxed break-words">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              /* Users List */
              <div className="h-full overflow-y-auto p-4 space-y-2">
                {users.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Users className="w-12 h-12 text-gray-700 mb-3" />
                    <p className="text-sm text-gray-500">No users yet</p>
                  </div>
                ) : (
                  users.map((user) => {
                    const userCanEdit =
                      roomInfo?.editableUsers?.includes(user.username) ?? false;
                    const isUserHost = roomInfo?.hostUsername === user.username;

                    return (
                      <div
                        key={user.socketId}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-semibold text-white">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-200">
                                {user.username}
                              </span>
                              {isUserHost && (
                                <Crown className="w-3.5 h-3.5 text-yellow-500" />
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {userCanEdit ? "Can edit" : "Read only"}
                            </span>
                          </div>
                        </div>

                        {isHost && !isUserHost && (
                          <div>
                            {userCanEdit ? (
                              <button
                                onClick={() => {
                                  socketRef.current.emit(
                                    "remove-user",
                                    name,
                                    user.username,
                                    roomId,
                                  );
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-colors text-xs font-medium"
                              >
                                <ShieldOff className="w-3.5 h-3.5" />
                                Revoke
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  socketRef.current.emit(
                                    "edit-user",
                                    name,
                                    user.username,
                                    roomId,
                                  );
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30 transition-colors text-xs font-medium"
                              >
                                <Shield className="w-3.5 h-3.5" />
                                Grant
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {ai
          ? ""
          : activeTab === "chat" && (
              <div className="border-t border-gray-800/50 p-4 bg-[#0a0a0a]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
      </div>
    </div>
  );
}
