import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import imageChat from "../assets/OIP.jpg";
import SideBarChat from "../component/SideBarChat";
import userStore from "../store/User.store";
import useMessage from "../store/message.store";

const ChatPage = () => {
  const { isAuthenticated, user } = userStore();
  const { allmessage, sendMessage, isSending, selectedUser } = useMessage();
  const bottomRef = useRef(null);

  const [text, setText] = useState("");

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allmessage]);

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    // selectedUser might be an object with id or _id depending on how it was set
    const recivedId = selectedUser.id || selectedUser._id;

    await sendMessage({ text, recivedId });
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <SideBarChat>
      <div className="flex flex-col flex-1 h-full bg-[#0b1220]">
        {/* Header */}
        <div className="flex items-center gap-4 h-[80px] bg-[#101A2E] px-6 border-b border-cyan-900">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <img
              src={selectedUser?.avatar || imageChat}
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0b1220]" />
          </div>
          <div>
            <h3 className="text-white">{selectedUser?.name || "Select a Chat"}</h3>
            <span className="text-green-500 text-sm">online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-[#0b1220]">
          {!allmessage && (
            <div className="flex justify-center items-center h-full text-cyan-400/50">
              No messages yet. Say hello!
            </div>
          )}

          {allmessage?.map((msg) => {
            // Robust check for sender name
            const isMe = msg.senderId?._id === user?._id || msg.senderId === user?._id || msg.senderId?.name === user?.name;

            return (
              <div
                key={msg._id}
                className={`max-w-[65%] px-4 py-2 rounded-lg text-sm ${isMe
                    ? "ml-auto bg-cyan-600 text-white"
                    : "mr-auto bg-[#101A2E] text-cyan-100"
                  }`}
              >
                <p>{msg.text}</p>
                <span className="block text-[11px] mt-1 opacity-60 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="h-[70px] bg-[#0b1220] border-t border-cyan-900 px-6 flex items-center gap-3">
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            className="flex-1 px-4 py-2 rounded-md bg-[#101A2E] border border-cyan-800 text-cyan-100 focus:outline-none focus:border-cyan-400 placeholder:text-cyan-600/50"
          />
          <button
            onClick={handleSend}
            disabled={isSending || !text.trim()}
            className="p-3 rounded-md bg-cyan-600 hover:bg-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </SideBarChat>
  );
};

export default ChatPage;
