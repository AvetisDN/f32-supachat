"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useMessages, useOnlineUsers } from "@/hooks/useRealtime";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomForm from "./ChatRoomForm";
import ChatRoomSidebar from "./ChatRoomSidebar";
import ChatRoomLoading from "./ChatRoomLoading";
import ChatRoomMessage from "./ChatRoomMessage";
import { supabase } from "@/lib/supabase";
import ChatRoomJoin from "./ChatRoomJoin";

const ChatRoom = () => {
  const { messages, loading } = useMessages();
  const onlineUsers = useOnlineUsers();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const usernameChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const usernameSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();

    if (!username.trim()) return;

    await supabase.from("profiles").upsert({
      name: username.trim(),
      online: true,
      last_seen: new Date().toISOString(),
    });

    setIsJoined(true);
  };

  const leaveChatHandler = async () => {
    await supabase
      .from("profiles")
      .update({
        online: false,
        last_seen: new Date().toISOString(),
      })
      .eq("name", username);
    setUsername("");
    setIsJoined(false);
  };

  const changeMessageHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessageHandle = async (event: FormEvent) => {
    event.preventDefault();

    if (!message.trim() || !username) return;

    await supabase.from("messages").insert({
      content: message.trim(),
      user_name: username,
    });

    setMessage("");
  };

  if (!isJoined) {
    return (
      <ChatRoomJoin
        username={username}
        usernameChangeHandle={usernameChangeHandle}
        usernameSubmitHandle={usernameSubmitHandle}
      />
    );
  }

  return (
    <div className="bg-zinc-100 p-1 rounded-3xl overflow-hidden shadow-xl w-full flex">
      {/* Sidebar */}
      <ChatRoomSidebar
        leaveChatHandler={leaveChatHandler}
        onlineUsers={onlineUsers}
      />
      {/* Main */}
      <div className="grow flex flex-col gap-5">
        <ChatRoomHeader />
        <div className="flex grow flex-col overflow-auto px-5">
          {loading ? (
            <ChatRoomLoading />
          ) : (
            <div className="flex flex-col gap-4">
              {/* Messages */}
              {messages.length ? (
                messages.map((item) => (
                  <ChatRoomMessage
                    key={item.id}
                    currentUserName={username}
                    message={item}
                  />
                ))
              ) : (
                <div className="text-zinc-400">No messages yet...</div>
              )}
            </div>
          )}
        </div>
        {/* Send Message Form */}
        <ChatRoomForm
          message={message}
          changeMessageHandle={changeMessageHandle}
          sendMessageHandle={sendMessageHandle}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
