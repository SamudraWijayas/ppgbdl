"use client";

import React, { useRef, useEffect, useMemo, Fragment } from "react";
import useMessage from "./useMessage";
import Image from "next/image";
import { Button, Skeleton } from "@heroui/react";
import { EllipsisVertical } from "lucide-react";

interface IMessage {
  id: number;
  conversationId: string;
  senderId: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    nama: string;
    foto: string;
  };
}

const Message = () => {
  const { dataMessage, isLoadingMessage } = useMessage();

  const messages = useMemo(() => dataMessage?.data ?? [], [dataMessage?.data]);

  const currentUserId = 1;

  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll ke bawah setiap update message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  if (isLoadingMessage) {
    return (
      <div className="p-4 space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex space-x-2 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-64 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Fragment>
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/70  dark:border-gray-700 p-4 flex flex-col gap-2 md:gap-4">
        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            ChatGenerus
          </h1>

          {/* Dropdown Menu */}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <EllipsisVertical className="text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
      <div className="px-4 lg:pt-17.5 pt-32 min-h-screen bg-white dark:bg-black/10">
        <div
          ref={scrollRef}
          className="flex flex-col space-y-3 p-4 overflow-y-auto max-h-screen bg-gray-50 dark:bg-black/10"
        >
          {messages.map((msg: IMessage) => {
            const isCurrentUser = msg.senderId === currentUserId;

            const date = new Date(msg.createdAt);
            const time = `${date.getUTCHours().toString().padStart(2, "0")}:${date
              .getUTCMinutes()
              .toString()
              .padStart(2, "0")}`;

            return (
              <div
                key={msg.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                {!isCurrentUser && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-900 mr-2">
                    {msg.sender.foto ? (
                      <Image
                        src={
                          msg.sender.foto
                            ? `${process.env.NEXT_PUBLIC_IMAGE}${msg.sender.foto}`
                            : "/profil.jpg"
                        }
                        alt={msg.sender.nama}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-white rounded-tl-none"
                  } shadow`}
                >
                  {!isCurrentUser && (
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.sender.nama}
                    </div>
                  )}
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {time}
                  </div>
                </div>
                {isCurrentUser && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-900 ml-2">
                    {msg.sender.foto ? (
                      <Image
                        src={
                          msg.sender.foto
                            ? `${process.env.NEXT_PUBLIC_IMAGE}${msg.sender.foto}`
                            : "/profil.jpg"
                        }
                        alt={msg.sender.nama}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
