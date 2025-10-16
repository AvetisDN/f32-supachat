import React, { ChangeEvent, FormEvent } from "react";

interface ChatRoomJoinProps {
  username: string;
  usernameChangeHandle: (event: ChangeEvent<HTMLInputElement>) => void;
  usernameSubmitHandle: (event: FormEvent) => void;
}

const ChatRoomJoin = ({
  username,
  usernameChangeHandle,
  usernameSubmitHandle,
}: ChatRoomJoinProps) => {
  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-4 bg-zinc-100 p-6 rounded-3xl overflow-hidden shadow-xl w-full max-w-sm text-zinc-700"
        onSubmit={usernameSubmitHandle}
      >
        <h1 className="text-3xl text-center font-semibold text-zinc-500">
          Join the chat
        </h1>
        <input
          type="text"
          placeholder="Enter username"
          className="border border-zinc-400 p-3 rounded-full px-5 grow"
          value={username}
          onChange={usernameChangeHandle}
          required
        />
        <button
          type="submit"
          className="bg-indigo-500 h-12 w-full flex items-center justify-center text-indigo-50 rounded-full cursor-pointer disabled:opacity-40 disabled:pointer-events-none select-none"
          disabled={username.length < 3}
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default ChatRoomJoin;
