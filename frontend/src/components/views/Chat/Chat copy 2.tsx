// "use client";

// import HeadChat from "@/components/ui/HeadChat";
// import Image from "next/image";
// import { Fragment, useState } from "react";
// import useChat from "./useChat";
// import { IChat } from "@/types/Chat";
// import { Skeleton } from "@heroui/react";
// import MessageView from "./Message/Message";

// const Chat = () => {
//   const { dataChatList, isLoadingChatList } = useChat();
//   const chatList: IChat[] = Array.isArray(dataChatList?.data)
//     ? dataChatList.data
//     : [];

//   const [activeChat, setActiveChat] = useState<IChat | null>(null);

//   if (activeChat) {
//     return <MessageView chat={activeChat} onBack={() => setActiveChat(null)} />;
//   }

//   return (
//     <Fragment>
//       <HeadChat />
//       <div className="px-4 lg:pt-17.5 pt-32 min-h-screen bg-white dark:bg-black/10">
//         <div className="space-y-3">
//           {isLoadingChatList
//             ? Array.from({ length: 5 }).map((_, idx) => (
//                 <div
//                   key={idx}
//                   className="flex justify-between items-center rounded-xl p-3 cursor-pointer"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Skeleton className="w-12 h-12 rounded-full" />
//                     <div className="flex flex-col space-y-1">
//                       <Skeleton className="w-32 h-4 rounded-md" />
//                       <Skeleton className="w-48 h-3 rounded-md" />
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end space-y-1">
//                     <Skeleton className="w-10 h-3 rounded-md" />
//                     <Skeleton className="w-6 h-3 rounded-full" />
//                   </div>
//                 </div>
//               ))
//             : chatList.map((chat, idx) => {
//                 let name = "";
//                 let avatar = "/images/illustration/illus.png";
//                 const lastMessage = chat.lastMessage || "No message yet";
//                 const unread = chat.unreadCount || 0;

//                 if (chat.type === "personal" && chat.user) {
//                   name = chat.user.nama;
//                   avatar = chat.user.foto || avatar;
//                 } else if (chat.type === "group" && chat.group) {
//                   name = chat.group.name;
//                 }

//                 const time = new Date(chat.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div
//                     key={idx}
//                     className="flex justify-between items-center rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={() => setActiveChat(chat)}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
//                         <Image
//                           src={avatar}
//                           alt={name}
//                           width={100}
//                           height={100}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-medium">{name}</span>
//                         <span className="text-gray-500 text-sm truncate">
//                           {lastMessage}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span className="text-gray-400 text-xs">{time}</span>
//                       {unread > 0 && (
//                         <span className="bg-blue-300 text-black text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full mt-1">
//                           {unread}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Chat;
