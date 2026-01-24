import React, { useEffect, useRef, useState } from "react";
import { Users, Settings, MessageCircle, LogOut, Loader2 } from "lucide-react";
import imageChat from "../assets/OIP.jpg";
import userStore from "../store/User.store";
import { useNavigate, useLocation } from "react-router-dom";

function SideBarChat({ children }) {
  const [preview, setPreview] = useState(null);
  const { isAuthenticated, user, logout, isLogout,updateProfilePic } = userStore();
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const handleLogout = () => logout();
  const handleClickImage = () => imageRef.current.click();
  const handleFile = async(e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
     await updateProfilePic(file)
    
  };

  const menuItems = [
    { icon: Users, label: "Contacts", path: "/contact" },
    { icon: MessageCircle, label: "Chats", path: "/userChat" },
    { icon: Settings, label: "Settings", path: "/setting" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b1220] text-cyan-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#101A2E] border-r border-cyan-900 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-cyan-400 mb-6">ChatRoom</h2>

        <div className="flex-1 space-y-4">
          <div
            className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-white cursor-pointer"
            onClick={handleClickImage}
          >
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFile}
            />
            <img
              src={preview || user?.avatar || imageChat}
              alt="profile"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-1 left-2 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0b1220]" />
          </div>

          <h3 className="text-center text-white font-semibold">{user?.name?.split(" ")[0]}</h3>

          <nav className="flex flex-col gap-2 mt-4">
            {menuItems.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${location.pathname === item.path
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "hover:bg-cyan-500/10"
                  }`}
              >
                <item.icon className="mr-2" size={16} /> {item.label}
              </div>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center p-2 rounded-md hover:bg-red-950 w-full justify-center"
          >
            <LogOut className="mr-2" size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-[#0b1220] overflow-y-auto">
        {isLogout ? (
          <div className="flex justify-center items-center h-full gap-2 text-cyan-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default SideBarChat;
