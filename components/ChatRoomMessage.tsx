"use client";
import { Message } from "@/lib/interfaces";
import React from "react";

interface ChatRoomMessage {
  message: Message;
  currentUserName: string;
}

const ChatRoomMessage = ({ message, currentUserName }: ChatRoomMessage) => {
  return (
    <div
      className={`rounded-xl px-5 py-3.5 min-w-1/3 max-w-2/3 ${
        message.user_name === currentUserName
          ? "bg-indigo-600 text-indigo-50 self-end"
          : "bg-zinc-500 text-zinc-50 self-start"
      }`}
    >
      <div className="flex items-center justify-between gap-5 font-mono">
        <div className="font-semibold text-zinc-200 leading-tight">
          {message.user_name}
        </div>
        <div className="text-zinc-300 text-sm leading-tight">
          {message.created_at}
        </div>
      </div>
      <div className="mt-1 italic">{message.content}</div>
    </div>
  );
};

export default ChatRoomMessage;
