// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const Page = () => {
//   const router = useRouter();
//   const [ids, setId] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     console.log(ids);
//   }, [ids]);

//   const createRoom = () => {
//     const id = Math.random().toString(36).substring(2, 8);
//     // router.push(`/showCode?id=${id}&name=${name}`);
//     router.push(`/showCode/${id}/${name}`);
//   };

//   const joinRoom = () => {
//     if (!ids.trim()) return;
//     router.push(`/showCode/${ids}/${name}`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
//       <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
//         <h1 className="text-2xl font-semibold text-white text-center">
//           Create or Join Room
//         </h1>
//         {!name && (
//           <h1>Enter Your name other wise you cant create or join room</h1>
//         )}
//         <button
//           onClick={createRoom}
//           disabled={!name}
//           className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Create Room
//         </button>

//         <form className="space-y-2">
//           <input
//             type="text"
//             value={ids}
//             onChange={(e) => setId(e.target.value)}
//             placeholder="Enter Room ID"
//             className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter you name"
//             required
//             className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </form>

//         <button
//           onClick={joinRoom}
//           disabled={!name}
//           className="w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
//         >
//           Join Room
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Page;

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Code2, Users, Sparkles, ArrowRight, Hash, User } from "lucide-react";

// const Page = () => {
//   const router = useRouter();
//   const [ids, setId] = useState("");
//   const [name, setName] = useState("");

//   useEffect(() => {
//     console.log(ids);
//   }, [ids]);

//   const createRoom = () => {
//     const id = Math.random().toString(36).substring(2, 8);
//     router.push(`/showCode/${id}/${name}`);
//   };

//   const joinRoom = () => {
//     if (!ids.trim()) return;
//     router.push(`/showCode/${ids}/${name}`);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 flex flex-col">
//       {/* Header */}
//       <header className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
//           <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
//             <Code2 className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-lg font-semibold text-white tracking-tight">
//             CodeSync
//           </span>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-lg">
//           {/* Hero Section */}
//           <div className="text-center mb-10">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
//               <Sparkles className="w-4 h-4" />
//               Real-time Collaboration
//             </div>
//             <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
//               Code Together, <span className="text-emerald-400">Anywhere</span>
//             </h1>
//             <p className="text-zinc-400 text-lg">
//               Create or join a room to start collaborating with your team in
//               real-time.
//             </p>
//           </div>

//           {/* Card */}
//           <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl shadow-black/20">
//             {/* Name Input Section */}
//             <div className="mb-8">
//               <label className="block text-sm font-medium text-zinc-300 mb-2">
//                 Your Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                   required
//                   className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
//                 />
//               </div>
//               {!name && (
//                 <p className="mt-2 text-sm text-amber-400/80 flex items-center gap-1.5">
//                   <span className="w-1 h-1 rounded-full bg-amber-400"></span>
//                   Enter your name to continue
//                 </p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Create Room Section */}
//               <div className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
//                     <Users className="w-4 h-4 text-emerald-400" />
//                   </div>
//                   <h3 className="font-medium text-white">Create Room</h3>
//                 </div>
//                 <p className="text-sm text-zinc-400 mb-4">
//                   Start a new coding session and invite others to collaborate.
//                 </p>
//                 <button
//                   onClick={createRoom}
//                   disabled={!name}
//                   className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium hover:from-emerald-500 hover:to-emerald-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-emerald-600 disabled:hover:to-emerald-500 flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
//                 >
//                   Create New Room
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//                 </button>
//               </div>

//               {/* Join Room Section */}
//               <div className="p-5 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
//                     <Hash className="w-4 h-4 text-blue-400" />
//                   </div>
//                   <h3 className="font-medium text-white">Join Room</h3>
//                 </div>
//                 <div className="relative mb-4">
//                   <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//                   <input
//                     type="text"
//                     value={ids}
//                     onChange={(e) => setId(e.target.value)}
//                     placeholder="Enter Room ID"
//                     className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
//                   />
//                 </div>
//                 <button
//                   onClick={joinRoom}
//                   disabled={!name || !ids.trim()}
//                   className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 flex items-center justify-center gap-2"
//                 >
//                   Join Existing Room
//                   <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="mt-10 grid grid-cols-3 gap-4">
//             {[
//               { icon: Code2, label: "Monaco Editor" },
//               { icon: Users, label: "Live Collaboration" },
//               { icon: Sparkles, label: "Real-time Sync" },
//             ].map(({ icon: Icon, label }) => (
//               <div
//                 key={label}
//                 className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50"
//               >
//                 <Icon className="w-5 h-5 text-emerald-400" />
//                 <span className="text-sm text-zinc-400 text-center">
//                   {label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-zinc-800/50 py-6">
//         <p className="text-center text-sm text-zinc-500">
//           Built for developers who love to collaborate
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Page;

"use client";

// import React, { useState, useEffect } from "react";
// import {
//   Code2,
//   Users,
//   Sparkles,
//   ArrowRight,
//   Hash,
//   User,
//   Terminal,
//   Cpu,
//   Globe,
//   ChevronRight,
//   LogOut,
//   Copy,
//   Check,
// } from "lucide-react";
// import socket from "@/lib/socket";

// // NOTE: In your Next.js project, uncomment the line below and remove the mock useRouter function.
// import { useRouter } from "next/navigation";

// // Mock useRouter for this Canvas preview so it runs without Next.js
// // const router = useRouter() ;

// const App = () => {
//   const [currentView, setCurrentView] = useState("landing"); // 'landing' or 'room'
//   const [userData, setUserData] = useState({ name: "", roomId: "" });

//   const handleJoin = (name, roomId) => {
//     setUserData({ name, roomId });
//     setCurrentView("room");
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
//       {currentView === "landing" ? (
//         <LandingPage onJoin={handleJoin} />
//       ) : (
//         <RoomView
//           userData={userData}
//           onLeave={() => setCurrentView("landing")}
//         />
//       )}
//     </div>
//   );
// };

// const LandingPage = ({ onJoin }) => {
//   const router = useRouter(); // Initialize router
//   const [ids, setId] = useState("");
//   const [name, setName] = useState("");
//   const [hoveredFeature, setHoveredFeature] = useState(null);
//   const [language, setLanguage] = useState(null);

//   const createRoom = () => {
//     if (!name.trim()) {
//       alert("Enter your name");
//       return;
//     }
//     if (!language) {
//       alert("Select your Language");
//       return;
//     }
//     const newId = Math.random().toString(36).substring(2, 8).toUpperCase();

//     socket.emit("create-room", {
//       roomId: newId,
//       hostUsername: name,
//       language,
//     });

//     // Navigate to the room URL

//     router.push(`/showCode/${newId}/${name}`);
//     // if (language == "javascript") {
//     // } else if (language == "html") {
//     //   router.push(`/roomHtml/${newId}/${name}`);
//     // } else {
//     //   router.push(`/python/${newId}/${name}`);
//     // }

//     // Update local state for preview
//     onJoin(name, newId);
//   };

//   const joinRoom = () => {
//     if (!ids.trim()) return;
//     if (!name.trim()) {
//       alert("Enter your name");
//       return;
//     }
//     // if (!language) {
//     //   alert("Select your Language");
//     //   return;
//     // }

//     // Navigate to the room URL
//     // router.push(`/showCode/${ids}/${name}`);

//     router.push(`/showCode/${ids}/${name}`);
//     // if (language == "javascript") {
//     // } else if (language == "html") {
//     //   router.push(`/roomHtml/${ids}/${name}`);
//     // } else {
//     //   router.push(`/python/${ids}/${name}`);
//     // }

//     // Update local state for preview
//     onJoin(name, ids);
//   };

//   useEffect(() => {
//     socket.on("room-created", ({ roomId, language }) => {
//       console.log("Room created with language:", language);
//     });

//     return () => socket.off("room-created");
//   }, []);

//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] animate-pulse" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200" />
//               <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
//                 <Code2 className="w-5 h-5 text-emerald-400" />
//               </div>
//             </div>
//             <span className="text-xl font-bold tracking-tight text-white">
//               CodeSync
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-12">
//         <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
//           {/* Left Column: Copy & Value Prop */}
//           <div className="space-y-8 order-2 lg:order-1">
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//                 </span>
//                 Live Collaboration
//               </div>
//               <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
//                 Sync your code <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
//                   in real-time.
//                 </span>
//               </h1>
//               <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
//                 Experience zero-latency pair programming. Create a room, share
//                 the link, and start coding together instantly. No setup
//                 required.
//               </p>
//             </div>

//             {/* Feature Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 {
//                   icon: Terminal,
//                   label: "Monaco Editor",
//                   desc: "VS Code experience",
//                 },
//                 { icon: Users, label: "Multiplayer", desc: "Cursor tracking" },
//                 { icon: Cpu, label: "Low Latency", desc: "< 50ms sync" },
//                 { icon: Globe, label: "Cloud Run", desc: "Instant execution" },
//               ].map((feature, idx) => (
//                 <div
//                   key={idx}
//                   onMouseEnter={() => setHoveredFeature(idx)}
//                   onMouseLeave={() => setHoveredFeature(null)}
//                   className={`p-4 rounded-xl border transition-all duration-300 ${
//                     hoveredFeature === idx
//                       ? "bg-zinc-800/50 border-emerald-500/30 shadow-lg shadow-emerald-500/10 -translate-y-1"
//                       : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-800/50"
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`p-2 rounded-lg ${
//                         hoveredFeature === idx
//                           ? "bg-emerald-500/20 text-emerald-400"
//                           : "bg-zinc-800 text-zinc-400"
//                       }`}
//                     >
//                       <feature.icon className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-zinc-200">
//                         {feature.label}
//                       </div>
//                       <div className="text-xs text-zinc-500">
//                         {feature.desc}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Interactive Card */}
//           <div className="order-1 lg:order-2 w-full max-w-md mx-auto">
//             <div className="relative">
//               {/* Card Glow */}
//               <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-blue-600 rounded-2xl blur opacity-20"></div>

//               <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
//                 {/* User Input */}
//                 <div className="mb-8 space-y-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                       Identity
//                     </label>
//                     <div className="relative group">
//                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Enter your display name"
//                         className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 placeholder-zinc-600 transition-all"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tabs / Actions */}
//                 <div className="space-y-6">
//                   {/* Create Room Button */}
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between px-1">
//                       <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
//                         New Session
//                       </span>
//                     </div>
//                     <button
//                       onClick={createRoom}
//                       disabled={!name || !language}
//                       className="group relative w-full flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] border border-emerald-500/20"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-sm">
//                           <Sparkles className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-base">Create Room</div>
//                           <div className="text-xs text-emerald-100/80 font-medium">
//                             Start a fresh collaboration
//                           </div>
//                         </div>
//                       </div>
//                       <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
//                         <ArrowRight className="w-5 h-5" />
//                       </div>
//                     </button>
//                     <div className="p-4 bg-zinc-900 text-white rounded-lg w-fit">
//                       <p className="text-sm text-zinc-400 mb-2">
//                         Select Language
//                       </p>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setLanguage("javascript");
//                           }}
//                           className={`px-4 py-2 rounded-md text-sm font-medium transition
//             ${
//               language === "javascript"
//                 ? "bg-emerald-500 text-white"
//                 : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
//             }`}
//                         >
//                           JavaScript
//                         </button>

//                         <button
//                           onClick={() => setLanguage("python")}
//                           className={`px-4 py-2 rounded-md text-sm font-medium transition
//             ${
//               language === "python"
//                 ? "bg-emerald-500 text-white"
//                 : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
//             }`}
//                         >
//                           Python
//                         </button>

//                         <button
//                           onClick={() => setLanguage("html")}
//                           className={`px-4 py-2 rounded-md text-sm font-medium transition
//             ${
//               language === "html"
//                 ? "bg-emerald-500 text-white"
//                 : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
//             }`}
//                         >
//                           Html
//                         </button>
//                       </div>

//                       <p className="mt-3 text-xs text-zinc-400">
//                         Selected:{" "}
//                         <span className="text-emerald-400">{language}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Divider */}
//                   <div className="relative flex items-center py-2">
//                     <div className="flex-grow border-t border-zinc-800"></div>
//                     <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-bold uppercase tracking-widest">
//                       OR
//                     </span>
//                     <div className="flex-grow border-t border-zinc-800"></div>
//                   </div>

//                   {/* Join Room Section - Made Prominent */}
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between px-1">
//                       <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
//                         Join Session
//                       </span>
//                     </div>
//                     <div className="flex flex-col gap-3">
//                       <div className="relative group">
//                         <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
//                         <input
//                           type="text"
//                           value={ids}
//                           onChange={(e) => setId(e.target.value)}
//                           placeholder="Enter Room ID to join..."
//                           className="w-full bg-zinc-800/50 border border-zinc-700/50 text-white text-base rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-600 transition-all shadow-inner"
//                         />
//                       </div>
//                       <button
//                         onClick={joinRoom}
//                         disabled={!name || !ids.trim()}
//                         className="w-full py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 group"
//                       >
//                         Join Room
//                         <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {!name && (
//                   <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
//                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
//                     <p className="text-xs text-amber-200/80">
//                       Please enter your name to continue
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/5 py-8 text-center">
//         <p className="text-zinc-600 text-sm">
//           &copy; {new Date().getFullYear()} CodeSync. Crafted for collaborative
//           minds.
//         </p>
//       </footer>
//     </div>
//   );
// };

// // Mock Room View Component to demonstrate navigation
// const RoomView = ({ userData, onLeave }) => {
//   const [copied, setCopied] = useState(false);

//   const copyId = () => {
//     navigator.clipboard.writeText(userData.roomId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
//       {/* Editor Header */}
//       <header className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 select-none">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 text-emerald-400 font-bold">
//             <Code2 className="w-5 h-5" />
//             <span>CodeSync</span>
//           </div>
//           <div className="h-4 w-px bg-zinc-800 mx-2" />
//           <div className="flex items-center gap-2 text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-zinc-700/50">
//             <span className="text-xs uppercase tracking-wider font-semibold">
//               Room:
//             </span>
//             <span className="text-zinc-200 font-mono">{userData.roomId}</span>
//             <button
//               onClick={copyId}
//               className="ml-2 hover:text-white transition-colors"
//             >
//               {copied ? (
//                 <Check className="w-3.5 h-3.5 text-emerald-400" />
//               ) : (
//                 <Copy className="w-3.5 h-3.5" />
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-xs font-medium text-emerald-400">Live</span>
//           </div>
//           <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white/10">
//             {userData.name.charAt(0).toUpperCase()}
//           </div>
//           <button
//             onClick={onLeave}
//             className="p-2 hover:bg-red-500/10 hover:text-red-400 text-zinc-500 rounded-md transition-all"
//             title="Leave Room"
//           >
//             <LogOut className="w-4 h-4" />
//           </button>
//         </div>
//       </header>

//       {/* Mock Editor Area */}
//       <div className="flex-1 flex">
//         <div className="w-16 border-r border-zinc-800 bg-zinc-900/50 flex flex-col items-center py-4 gap-4 text-zinc-500">
//           <div className="p-2 text-zinc-100 bg-zinc-800 rounded-md">
//             <Copy className="w-5 h-5" />
//           </div>
//           <div className="p-2 hover:text-zinc-300 cursor-pointer">
//             <Users className="w-5 h-5" />
//           </div>
//           <div className="p-2 hover:text-zinc-300 cursor-pointer">
//             <Hash className="w-5 h-5" />
//           </div>
//         </div>
//         <div className="flex-1 bg-[#09090b] p-8 font-mono text-sm relative">
//           {/* Line Numbers */}
//           <div className="absolute left-0 top-8 bottom-0 w-12 text-right pr-4 text-zinc-700 select-none">
//             1<br />2<br />3<br />4<br />5<br />6<br />7
//           </div>
//           <div className="pl-6 text-zinc-300">
//             <span className="text-purple-400">import</span>{" "}
//             <span className="text-yellow-200">{`{ useState }`}</span>{" "}
//             <span className="text-purple-400">from</span>{" "}
//             <span className="text-green-400">'react'</span>;<br />
//             <br />
//             <span className="text-purple-400">const</span>{" "}
//             <span className="text-blue-400">HelloWorld</span>{" "}
//             <span className="text-purple-400">=</span> (){" "}
//             <span className="text-purple-400">{`=>`}</span> {"{"}
//             <br />
//             &nbsp;&nbsp;<span className="text-purple-400">const</span> [
//             <span className="text-blue-300">message</span>]{" "}
//             <span className="text-purple-400">=</span>{" "}
//             <span className="text-blue-200">useState</span>(
//             <span className="text-green-400">"Welcome, {userData.name}!"</span>
//             );
//             <br />
//             <br />
//             &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
//             &nbsp;&nbsp;&nbsp;&nbsp;{`<h1>{message}</h1>`}
//             <br />
//             &nbsp;&nbsp;);
//             <br />
//             {"}"};<br />
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <div className="text-zinc-800 text-6xl font-black opacity-20 transform -rotate-12">
//               PREVIEW MODE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Code2,
//   Users,
//   Sparkles,
//   ArrowRight,
//   ArrowLeft,
//   Hash,
//   User,
//   Terminal,
//   Cpu,
//   Globe,
//   ChevronRight,
//   LogOut,
//   Copy,
//   Check,
//   Zap,
// } from "lucide-react";
// import socket from "@/lib/socket";
// import { useRouter } from "next/navigation";

// const App = () => {
//   const [currentView, setCurrentView] = useState("landing"); // 'landing' or 'room'
//   const [userData, setUserData] = useState({ name: "", roomId: "" });

//   const handleJoin = (name, roomId) => {
//     setUserData({ name, roomId });
//     setCurrentView("room");
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
//       {currentView === "landing" ? (
//         <LandingPage onJoin={handleJoin} />
//       ) : (
//         <RoomView
//           userData={userData}
//           onLeave={() => setCurrentView("landing")}
//         />
//       )}
//     </div>
//   );
// };

// const LandingPage = ({ onJoin }) => {
//   const router = useRouter(); // Initialize router
//   const [ids, setId] = useState("");
//   const [name, setName] = useState("");
//   const [hoveredFeature, setHoveredFeature] = useState(null);
//   const [language, setLanguage] = useState(null);

//   // New state to manage the card view flow: 'menu' | 'create' | 'join'
//   const [viewMode, setViewMode] = useState("menu");

//   const createRoom = () => {
//     if (!name.trim()) {
//       alert("Enter your name");
//       return;
//     }
//     if (!language) {
//       alert("Select your Language");
//       return;
//     }
//     const newId = Math.random().toString(36).substring(2, 8).toUpperCase();

//     socket.emit("create-room", {
//       roomId: newId,
//       hostUsername: name,
//       language,
//     });

//     // Navigate to the room URL
//     router.push(`/showCode/${newId}/${name}`);

//     // Update local state for preview
//     onJoin(name, newId);
//   };

//   const joinRoom = () => {
//     if (!ids.trim()) {
//       alert("Enter Room ID");
//       return;
//     }
//     if (!name.trim()) {
//       alert("Enter your name");
//       return;
//     }

//     // Navigate to the room URL
//     router.push(`/showCode/${ids}/${name}`);

//     // Update local state for preview
//     onJoin(name, ids);
//   };

//   useEffect(() => {
//     socket.on("room-created", ({ roomId, language }) => {
//       console.log("Room created with language:", language);
//     });

//     return () => socket.off("room-created");
//   }, []);

//   // Helper to reset inputs when switching modes if desired
//   const handleModeChange = (mode) => {
//     setViewMode(mode);
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] animate-pulse" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 w-full border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200" />
//               <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
//                 <Code2 className="w-5 h-5 text-emerald-400" />
//               </div>
//             </div>
//             <span className="text-xl font-bold tracking-tight text-white">
//               CodeSync
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-12">
//         <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
//           {/* Left Column: Copy & Value Prop */}
//           <div className="space-y-8 order-2 lg:order-1">
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//                 </span>
//                 Live Collaboration
//               </div>
//               <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
//                 Sync your code <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
//                   in real-time.
//                 </span>
//               </h1>
//               <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
//                 Experience zero-latency pair programming. Create a room, share
//                 the link, and start coding together instantly. No setup
//                 required.
//               </p>
//             </div>

//             {/* Feature Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 {
//                   icon: Terminal,
//                   label: "Monaco Editor",
//                   desc: "VS Code experience",
//                 },
//                 { icon: Users, label: "Multiplayer", desc: "Cursor tracking" },
//                 { icon: Cpu, label: "Low Latency", desc: "< 50ms sync" },
//                 { icon: Globe, label: "Cloud Run", desc: "Instant execution" },
//               ].map((feature, idx) => (
//                 <div
//                   key={idx}
//                   onMouseEnter={() => setHoveredFeature(idx)}
//                   onMouseLeave={() => setHoveredFeature(null)}
//                   className={`p-4 rounded-xl border transition-all duration-300 ${
//                     hoveredFeature === idx
//                       ? "bg-zinc-800/50 border-emerald-500/30 shadow-lg shadow-emerald-500/10 -translate-y-1"
//                       : "bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-800/50"
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`p-2 rounded-lg ${
//                         hoveredFeature === idx
//                           ? "bg-emerald-500/20 text-emerald-400"
//                           : "bg-zinc-800 text-zinc-400"
//                       }`}
//                     >
//                       <feature.icon className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <div className="text-sm font-semibold text-zinc-200">
//                         {feature.label}
//                       </div>
//                       <div className="text-xs text-zinc-500">
//                         {feature.desc}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Interactive Card */}
//           <div className="order-1 lg:order-2 w-full max-w-md mx-auto">
//             <div className="relative">
//               {/* Card Glow */}
//               <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-blue-600 rounded-2xl blur opacity-20"></div>

//               <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl min-h-[420px] flex flex-col justify-center">
//                 {/* VIEW 1: MAIN MENU (SELECT CREATE OR JOIN) */}
//                 {viewMode === "menu" && (
//                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                     <div className="text-center space-y-2 mb-8">
//                       <h2 className="text-2xl font-bold text-white">
//                         Get Started
//                       </h2>
//                       <p className="text-zinc-400 text-sm">
//                         Choose how you want to collaborate
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => handleModeChange("create")}
//                       className="group relative w-full flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-900/20 transition-all active:scale-[0.98] border border-emerald-500/20"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
//                           <Sparkles className="w-6 h-6 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-base">Create Room</div>
//                           <div className="text-xs text-emerald-100/80 font-medium">
//                             Start a fresh session
//                           </div>
//                         </div>
//                       </div>
//                       <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
//                         <ArrowRight className="w-5 h-5" />
//                       </div>
//                     </button>

//                     <div className="relative flex items-center py-2">
//                       <div className="flex-grow border-t border-zinc-800"></div>
//                       <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs font-bold uppercase tracking-widest">
//                         OR
//                       </span>
//                       <div className="flex-grow border-t border-zinc-800"></div>
//                     </div>

//                     <button
//                       onClick={() => handleModeChange("join")}
//                       className="w-full group flex items-center justify-between p-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white transition-all active:scale-[0.98] shadow-lg"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-zinc-700/50 rounded-lg">
//                           <Zap className="w-6 h-6 text-zinc-400 group-hover:text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-base">Join Room</div>
//                           <div className="text-xs text-zinc-400 font-medium">
//                             Enter an existing ID
//                           </div>
//                         </div>
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
//                     </button>
//                   </div>
//                 )}

//                 {/* VIEW 2: CREATE ROOM FORM */}
//                 {viewMode === "create" && (
//                   <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
//                     <div className="flex items-center gap-4 mb-6">
//                       <button
//                         onClick={() => handleModeChange("menu")}
//                         className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
//                       >
//                         <ArrowLeft className="w-5 h-5" />
//                       </button>
//                       <h2 className="text-xl font-bold text-white">
//                         Create Room
//                       </h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                           Display Name
//                         </label>
//                         <div className="relative group">
//                           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
//                           <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Enter your name"
//                             className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 placeholder-zinc-600 transition-all"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                           Language
//                         </label>
//                         <div className="grid grid-cols-3 gap-2">
//                           {["javascript", "python", "html"].map((lang) => (
//                             <button
//                               key={lang}
//                               onClick={() => setLanguage(lang)}
//                               className={`py-2 px-2 rounded-lg text-sm font-medium border transition-all ${
//                                 language === lang
//                                   ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
//                                   : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700"
//                               }`}
//                             >
//                               {lang.charAt(0).toUpperCase() + lang.slice(1)}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={createRoom}
//                       disabled={!name || !language}
//                       className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] border border-emerald-500/20 flex items-center justify-center gap-2"
//                     >
//                       Generate Room
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}

//                 {/* VIEW 3: JOIN ROOM FORM */}
//                 {viewMode === "join" && (
//                   <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
//                     <div className="flex items-center gap-4 mb-6">
//                       <button
//                         onClick={() => handleModeChange("menu")}
//                         className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
//                       >
//                         <ArrowLeft className="w-5 h-5" />
//                       </button>
//                       <h2 className="text-xl font-bold text-white">
//                         Join Room
//                       </h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                           Display Name
//                         </label>
//                         <div className="relative group">
//                           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
//                           <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Enter your name"
//                             className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-600 transition-all"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//                           Room ID
//                         </label>
//                         <div className="relative group">
//                           <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
//                           <input
//                             type="text"
//                             value={ids}
//                             onChange={(e) => setId(e.target.value)}
//                             placeholder="Enter Room ID"
//                             className="w-full bg-black/40 border border-zinc-800 text-white text-base rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-zinc-600 transition-all"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={joinRoom}
//                       disabled={!name || !ids.trim()}
//                       className="w-full mt-4 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
//                     >
//                       Join Session
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/5 py-8 text-center">
//         <p className="text-zinc-600 text-sm">
//           &copy; {new Date().getFullYear()} CodeSync. Crafted for collaborative
//           minds.
//         </p>
//       </footer>
//     </div>
//   );
// };

// // Mock Room View Component to demonstrate navigation
// const RoomView = ({ userData, onLeave }) => {
//   const [copied, setCopied] = useState(false);

//   const copyId = () => {
//     navigator.clipboard.writeText(userData.roomId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
//       {/* Editor Header */}
//       <header className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 select-none">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 text-emerald-400 font-bold">
//             <Code2 className="w-5 h-5" />
//             <span>CodeSync</span>
//           </div>
//           <div className="h-4 w-px bg-zinc-800 mx-2" />
//           <div className="flex items-center gap-2 text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-zinc-700/50">
//             <span className="text-xs uppercase tracking-wider font-semibold">
//               Room:
//             </span>
//             <span className="text-zinc-200 font-mono">{userData.roomId}</span>
//             <button
//               onClick={copyId}
//               className="ml-2 hover:text-white transition-colors"
//             >
//               {copied ? (
//                 <Check className="w-3.5 h-3.5 text-emerald-400" />
//               ) : (
//                 <Copy className="w-3.5 h-3.5" />
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-xs font-medium text-emerald-400">Live</span>
//           </div>
//           <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white/10">
//             {userData.name.charAt(0).toUpperCase()}
//           </div>
//           <button
//             onClick={onLeave}
//             className="p-2 hover:bg-red-500/10 hover:text-red-400 text-zinc-500 rounded-md transition-all"
//             title="Leave Room"
//           >
//             <LogOut className="w-4 h-4" />
//           </button>
//         </div>
//       </header>

//       {/* Mock Editor Area */}
//       <div className="flex-1 flex">
//         <div className="w-16 border-r border-zinc-800 bg-zinc-900/50 flex flex-col items-center py-4 gap-4 text-zinc-500">
//           <div className="p-2 text-zinc-100 bg-zinc-800 rounded-md">
//             <Copy className="w-5 h-5" />
//           </div>
//           <div className="p-2 hover:text-zinc-300 cursor-pointer">
//             <Users className="w-5 h-5" />
//           </div>
//           <div className="p-2 hover:text-zinc-300 cursor-pointer">
//             <Hash className="w-5 h-5" />
//           </div>
//         </div>
//         <div className="flex-1 bg-[#09090b] p-8 font-mono text-sm relative">
//           {/* Line Numbers */}
//           <div className="absolute left-0 top-8 bottom-0 w-12 text-right pr-4 text-zinc-700 select-none">
//             1<br />2<br />3<br />4<br />5<br />6<br />7
//           </div>
//           <div className="pl-6 text-zinc-300">
//             <span className="text-purple-400">import</span>{" "}
//             <span className="text-yellow-200">{`{ useState }`}</span>{" "}
//             <span className="text-purple-400">from</span>{" "}
//             <span className="text-green-400">'react'</span>;<br />
//             <br />
//             <span className="text-purple-400">const</span>{" "}
//             <span className="text-blue-400">HelloWorld</span>{" "}
//             <span className="text-purple-400">=</span> (){" "}
//             <span className="text-purple-400">{`=>`}</span> {"{"}
//             <br />
//             &nbsp;&nbsp;<span className="text-purple-400">const</span> [
//             <span className="text-blue-300">message</span>]{" "}
//             <span className="text-purple-400">=</span>{" "}
//             <span className="text-blue-200">useState</span>(
//             <span className="text-green-400">"Welcome, {userData.name}!"</span>
//             );
//             <br />
//             <br />
//             &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br />
//             &nbsp;&nbsp;&nbsp;&nbsp;{`<h1>{message}</h1>`}
//             <br />
//             &nbsp;&nbsp;);
//             <br />
//             {"}"};<br />
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <div className="text-zinc-800 text-6xl font-black opacity-20 transform -rotate-12">
//               PREVIEW MODE
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

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
  Zap,
} from "lucide-react";
import socket from "@/lib/socket";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [ids, setId] = useState("");
  const [name, setName] = useState("");
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [language, setLanguage] = useState(null);
  const [viewMode, setViewMode] = useState("menu");

  // ✅ CREATE ROOM
  const createRoom = () => {
    if (!name.trim()) return alert("Enter your name");
    if (!language) return alert("Select your Language");

    const newId = Math.random().toString(36).substring(2, 8).toUpperCase();

    socket.emit("create-room", {
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

  useEffect(() => {
    socket.on("room-created", ({ roomId }) => {
      console.log("Room created:", roomId);
    });

    return () => socket.off("room-created");
  }, []);

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
