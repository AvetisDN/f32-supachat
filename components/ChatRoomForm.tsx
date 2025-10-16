"use client";

import { Send } from "lucide-react";
import React, { ChangeEvent, FormEvent } from "react";

interface ChatRoomFormProps {
  message: string;
  changeMessageHandle: (event: ChangeEvent<HTMLInputElement>) => void;
  sendMessageHandle: (event: FormEvent) => void;
}

const ChatRoomForm = ({
  message,
  changeMessageHandle,
  sendMessageHandle,
}: ChatRoomFormProps) => {
  return (
    <form className=" p-5" onSubmit={sendMessageHandle}>
      <div className="flex gap-4">
        <input
          type="text"
          value={message}
          onChange={changeMessageHandle}
          placeholder="New message..."
          className="border border-zinc-400 p-3 rounded-full px-5 grow"
        />
        <button
          type="submit"
          className="bg-indigo-500 h-12 w-12 flex items-center justify-center text-indigo-50 rounded-full cursor-pointer"
        >
          <Send />
        </button>
      </div>
    </form>
  );
};

export default ChatRoomForm;
