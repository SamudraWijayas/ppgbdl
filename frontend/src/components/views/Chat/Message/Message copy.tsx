// "use client";

// import { Button, Skeleton, Input } from "@heroui/react";
// import { IChat, IMessage } from "@/types/Chat";
// import useMessage from "./useMessage";
// import { useRef, useEffect } from "react";

// interface MessageViewProps {
//   chat: IChat;
//   onBack: () => void;
// }

// const currentUserId = 1;

// const MessageView: React.FC<MessageViewProps> = ({ chat, onBack }) => {
//   const isPersonal = chat.type === "personal";
//   const chatId = isPersonal ? String(chat.user?.id) : String(chat.group?.id);

//   const { dataMessage, isLoadingMessage } = useMessage(chatId, chat.type);
//   const messages = dataMessage?.data ?? [];

//   const name = isPersonal
//     ? chat.user?.nama
//     : (chat.group?.name ?? "Group Chat");

//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // Auto scroll ke bawah
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 pb-24">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-20">
//         <Button size="sm" variant="light" onClick={onBack}>
//           ←
//         </Button>
//         <div>
//           <h2 className="font-semibold text-base">{name}</h2>
//           <p className="text-xs text-gray-400">
//             {isPersonal ? "Personal Chat" : "Group Chat"}
//           </p>
//         </div>
//       </div>

//       {/* Message List */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//         {isLoadingMessage ? (
//           Array.from({ length: 6 }).map((_, idx) => (
//             <Skeleton key={idx} className="w-2/3 h-12 rounded-2xl" />
//           ))
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-400 mt-10">Belum ada pesan</p>
//         ) : (
//           messages.map((msg: IMessage) => {
//             const isMe = msg.senderId === currentUserId;

//             return (
//               <div
//                 key={msg.id}
//                 className={`flex ${isMe ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`
//                     max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md
//                     ${
//                       isMe
//                         ? "bg-emerald-500 text-white rounded-br-sm"
//                         : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm"
//                     }
//                   `}
//                 >
//                   {!isPersonal && !isMe && (
//                     <p className="text-xs font-semibold mb-1 text-blue-500">
//                       {msg.sender?.nama}
//                     </p>
//                   )}

//                   <p className="leading-relaxed">{msg.content}</p>

//                   <p className="text-[10px] text-right mt-1 opacity-70">
//                     {new Date(msg.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}
//         <div ref={bottomRef} />
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-16 left-0 w-full">
//         <div className="max-w-2xl mx-auto px-4">
//           <div className="flex gap-2 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-full shadow-md px-3 py-2">
//             <Input
//               placeholder="Ketik pesan..."
//               className="flex-1"
//               radius="full"
//             />
//             <Button radius="full" color="primary">
//               Kirim
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageView;
