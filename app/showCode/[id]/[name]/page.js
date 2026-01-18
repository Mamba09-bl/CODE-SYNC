"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const params = useParams();
  const roomId = params.id;
  const name = params.name;
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUser] = useState([]);
  const [code, setCode] = useState(`// Write JavaScript here`);
  const [roomInfo, setRoomInfo] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const isHost = roomInfo?.hostUsername === name;
  const isAllow = roomInfo?.editableUsers.includes(name);
  const canEdit = isHost || isAllow;
  const userCanEdit = roomInfo?.editableUsers.includes(users.username);
  const hasCommon = users.some((item) =>
    roomInfo?.editableUsers.includes(item.username),
  );

  useEffect(() => {
    socket.emit("join-room", { roomId, name });
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      // sendMessage(msg);
    });

    socket.on("previous-messages", (msgs) => {
      setMessages(msgs);
    });

    console.log(name);
    return () => {
      socket.off("receive-message");
      socket.off("previous-messages");
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("display-code", (data) => {
      setCode(data);
    });

    return () => {
      socket.off("display-code");
    };
  }, []);

  useEffect(() => {
    socket.on("previous-code", (savedCode) => {
      setCode(savedCode);
    });

    return () => {
      socket.off("previous-code");
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    socket.on("room-users", (users) => {
      setUser(users); // [{username: "Ali"}, {username: "Ahmed"}]
    });

    return () => {
      // socket.emit("disconnect");
      socket.emit("leave-room", roomId);

      socket.off("room-users");
    };
  }, []);

  useEffect(() => {
    console.log(hasCommon);
  }, [hasCommon]);

  useEffect(() => {
    console.log("i am from room-info", roomInfo);
    // console.log(userCanEdit);
  }, [roomInfo]);

  useEffect(() => {
    socket.on("room-info", (hostUsername) => {
      setRoomInfo(hostUsername);
    });

    return () => {
      socket.off("room-info");
    };
  }, []);

  useEffect(() => {
    socket.on("join-error", (message) => {
      setError(true);
      alert(message); // simplest for now

      // optional: redirect user
      window.location.href = "/";
    });

    return () => {
      socket.off("join-error");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send-message", {
      roomId,
      username: name,
      message: inputMessage,
    });
  };

  const handleChange = (value) => {
    // if (!isHost) return; // 🚫 block non-host
    // setCode(value);

    socket.emit("run-code", {
      code: value,
      roomId,
    });
  };

  return (
    <div className="h-screen flex bg-gray-950">
      {/* LEFT: Code Editor */}
      <div className="flex-1 h-full">
        <Editor
          height="100%"
          language="javascript"
          value={code}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            readOnly: !canEdit,
            cursorStyle: canEdit ? "line" : "block",

            domReadOnly: !canEdit,
          }}
        />
      </div>

      {/* RIGHT: Chat */}
      <div className="w-full max-w-2xl bg-gray-900 border-l border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-white mb-2">
          Room: <span className="text-blue-400">{roomId}</span>
        </h2>

        {roomInfo && (
          <p className="text-xs text-gray-400 mb-4">
            Host: <span className="text-blue-300">{roomInfo.hostUsername}</span>
          </p>
        )}

        {/* USERS LIST */}
        <div className="mb-4 space-y-1">
          {isHost &&
            users.map((user) => {
              const userCanEdit = roomInfo?.editableUsers.includes(
                user.username,
              );

              return (
                <div
                  key={user.socketId}
                  className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                >
                  <span className="text-sm text-white font-medium">
                    {user.username}
                  </span>

                  {userCanEdit ? (
                    <button
                      onClick={() => {
                        socket.emit("remove-user", name, user.username, roomId);
                      }}
                      className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      Remove Edit
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        socket.emit("edit-user", name, user.username, roomId);
                      }}
                      className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Allow Edit
                    </button>
                  )}
                </div>
              );
            })}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto border border-gray-800 rounded-lg p-4 space-y-2 bg-gray-950">
          {messages.map((msg, index) => (
            <p key={index} className="text-gray-200 text-sm">
              <span className="font-semibold text-blue-400">
                {msg.username}:
              </span>{" "}
              {msg.message}
            </p>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type message..."
            className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
