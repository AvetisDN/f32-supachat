import { Flower } from "lucide-react";
import React from "react";

const ChatRoomLoading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Flower size={64} className="text-indigo-500 animate-spin" />
    </div>
  );
};

export default ChatRoomLoading;
