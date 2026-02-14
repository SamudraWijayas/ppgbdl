"use client";

import React, { useRef, useEffect, useMemo, Fragment } from "react";
import useMessage from "./useMessage";
import Image from "next/image";
import { Button, Skeleton } from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import { cn } from "@/utils/cn";

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

  return (
    <Fragment>
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-black/70  dark:border-gray-700 p-4 flex flex-col gap-2 md:gap-4">
        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Nama
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
        <div>
          {isLoadingMessage ? (
            <div className="flex flex-col space-y-3 p-4 overflow-y-auto max-h-screen bg-gray-50 dark:bg-black/10">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center rounded-xl p-3 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col space-y-1">
                      <Skeleton className="w-32 h-4 rounded-md" />
                      <Skeleton className="w-48 h-3 rounded-md" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Skeleton className="w-10 h-3 rounded-md" />
                    <Skeleton className="w-6 h-3 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex flex-col space-y-3 p-4 overflow-y-auto max-h-screen  dark:bg-black/10"
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
                      <div
                        className={cn(
                          "text-xs  text-right mt-1 ",
                          isCurrentUser ? "text-white" : "text-gray-400",
                        )}
                      >
                        {time}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-900 ml-2">
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
