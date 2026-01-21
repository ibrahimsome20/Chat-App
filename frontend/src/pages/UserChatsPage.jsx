import React, { useEffect, useState } from "react";
import SideBarChat from "../component/SideBarChat";
import SearchComponents from "../component/Search";
import useMessage from "../store/message.store.js";
import AhmedPic from "../assets/Ahmed.jpg";
import { MessageCircle } from "lucide-react";
import userStore from "../store/User.store.js";
import { useNavigate } from "react-router-dom";

function AllChatsPage() {
  const { user, isAuthenticated } = userStore();
  const { getAllcontact, allcontact = [], getConversations, allusermessage = [], getMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated();
    getAllcontact();
    getConversations();
  }, []);

  // Compute chats: users we have messages with
  const chats = React.useMemo(() => {
    if (!user || !allusermessage.length || !allcontact.length) return [];

    const chatMap = new Map();

    // Sort messages by date descending first to get latest easily
    const sortedMessages = [...allusermessage].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sortedMessages.forEach(msg => {
      // Determine partner ID
      const partnerId = msg.senderId === user._id ? msg.recivedId : msg.senderId;

      if (!chatMap.has(partnerId)) {
        // Find partner details
        // Backend getAlluser returns full objects now
        const partner = allcontact.find(c => (c._id && c._id == partnerId) || (c.id && c.id == partnerId));

        if (partner) {
          chatMap.set(partnerId, {
            ...partner,
            lastMessage: msg
          });
        }
      }
    });

    return Array.from(chatMap.values());
  }, [allusermessage, allcontact, user]);


  const handleSelect = (contact) => {
    getMessage(contact.id || contact._id); // Fetch specific chat
    navigate('/chat');
  };

  return (
    <SideBarChat>
      <div className="flex flex-col flex-1 p-6 h-full bg-[#0b1220]">
        <SearchComponents />

        <div className="flex flex-col mt-4 overflow-y-auto space-y-2">
          {chats.length === 0 ? (
            <p className="text-center text-cyan-400/50 mt-10">No conversations yet.</p>
          ) : (
            chats.map((contact) => (
              <div
                key={contact.id || contact._id}
                onClick={() => handleSelect(contact)}
                className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all bg-[#101A2E] hover:bg-cyan-500/10 hover:translate-x-1 hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white">
                  <img
                    className="w-full h-full object-cover"
                    src={contact.avatar || AhmedPic}
                    alt={contact.name}
                  />
                  <span className="absolute top-1 left-2 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0b1220]" />
                </div>

                {/* Info */}
                <div className="flex-1 ml-4 flex flex-col justify-center">
                  <h3 className="text-white font-semibold">{contact.name}</h3>
                  <span className="text-gray-400 text-sm truncate max-w-[200px]">
                    {contact.lastMessage?.text || "Image"}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-cyan-500/60">
                    {contact.lastMessage?.createdAt && new Date(contact.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <MessageCircle className="text-cyan-400 cursor-pointer" size={18} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SideBarChat>
  );
}

export default AllChatsPage;
