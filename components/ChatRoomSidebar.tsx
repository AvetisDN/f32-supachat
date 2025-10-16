"use client";
import { LogOut } from "lucide-react";
import { Profile } from "@/lib/interfaces";

interface ChatRoomSidebarProps {
  onlineUsers: Profile[];
  leaveChatHandler: () => void;
}

const ChatRoomSidebar = ({
  onlineUsers,
  leaveChatHandler,
}: ChatRoomSidebarProps) => {
  return (
    <div className="w-64 bg-zinc-200 p-6 rounded-[22px] text-zinc-700 flex flex-col gap-5">
      <div className="text-center font-bold text-lg flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-600 translate-y-px animate-pulse"></div>
        <span className=" leading-none">Online {onlineUsers.length}</span>
      </div>
      <div className="flex flex-col gap-2 text-zinc-500 ps-4 grow overflow-auto">
        {/* users*/}
        {onlineUsers.map((item) => (
          <div key={item.id} className="flex items-center gap-1">
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </div>
      <button
        className="border-red-600 border-2 rounded-2xl flex gap-1 items-center justify-center p-3 text-red-600 opacity-50 transition cursor-pointer hover:opacity-100 font-semibold"
        onClick={leaveChatHandler}
      >
        <LogOut size={20} />
        Leave Chat
      </button>
    </div>
  );
};

export default ChatRoomSidebar;
