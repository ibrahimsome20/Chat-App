import { motion } from "framer-motion";
import { MessageSquare, Lock, Zap, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/User.store";
import { useEffect } from "react";
import SideBarChat from "../component/SideBarChat.jsx";

function Home() {
  const { loading, user, isAuthenticated } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <SideBarChat>
      <div className="flex-1 overflow-y-auto p-6 bg-[#0b1220] h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full gap-2 text-cyan-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : (
          <>
            {/* HERO */}
            <section className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-cyan-400"
              >
                <span className="text-slate-700/70">Welcome</span> {user?.name}
              </motion.h2>
              <p className="mt-4 max-w-xl mx-auto text-cyan-300/80">
                Secure, fast and beautifully designed chat platform.
              </p>

              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
              >
                <MessageSquare className="h-5 w-5" /> Start Chatting
              </motion.button>
            </section>

            {/* FEATURES */}
            <section className="grid gap-6 md:grid-cols-3">
              {[
                { icon: Zap, title: "Fast", desc: "Real-time messaging" },
                { icon: Lock, title: "Secure", desc: "JWT authentication" },
                { icon: MessageSquare, title: "Modern", desc: "Clean UI & UX" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-cyan-900 bg-[#101A2E] p-6"
                >
                  <item.icon className="h-6 w-6 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-cyan-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cyan-400/70">{item.desc}</p>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </SideBarChat>
  );
}

export default Home;
