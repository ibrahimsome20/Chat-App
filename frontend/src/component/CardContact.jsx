import React, { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import AhmedPic from "../assets/OIP.jpg";
import useMessage from "../store/message.store.js";
import { useNavigate } from "react-router-dom";

function CardContact() {
  const { getAllcontact, allcontact = [] } = useMessage();
  const getMessage = useMessage((state) => state.getMessage);
  const navigate = useNavigate();

  const handleProfileClick = (id) => {
    getMessage(id);
    navigate("/chat"); // navigate to chat when clicked
  };

  useEffect(() => {
    getAllcontact();
  }, [getAllcontact]);

  return (
    <div className="flex flex-col gap-3">
      {allcontact.map((contact) => (
        <div
          key={contact.id || contact._id}
          onClick={() => handleProfileClick(contact.id || contact._id)}
          className="cursor-pointer flex items-center justify-between w-full p-4 bg-[#101A2E] rounded-xl hover:translate-x-1 hover:shadow-lg transition-all duration-200"
        >
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white">
            <img
              src={contact.avatar || AhmedPic}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-1 left-2 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0b1220]" />
          </div>

          {/* Info */}
          <div className="flex-1 ml-4 flex flex-col justify-center">
            <h3 className="text-white font-semibold">{contact.name}</h3>
            <span className="text-green-600 text-sm">online</span>
          </div>

          <MessageCircle className="text-cyan-400 cursor-pointer" />
        </div>
      ))}
    </div>
  );
}

export default CardContact;
