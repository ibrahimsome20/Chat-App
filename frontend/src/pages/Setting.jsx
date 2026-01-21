import React from 'react'
import SideBarChat from '../component/SideBarChat'
import imageChat from "../assets/OIP.jpg";
import { Camera } from 'lucide-react';

function Setting() {
  return (
    <SideBarChat>
      <div className="flex-1 w-full max-w-5xl mx-auto p-6 bg-[#0b1220] text-cyan-100">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Settings</h2>

        <div className="max-w-xl mx-auto bg-[#101A2E] rounded-xl p-6
        shadow-[inset_0_0_30px_rgba(34,211,238,0.25)]">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6 relative">
            <div className="w-28 h-28 rounded-full overflow-hidden
            shadow-[inset_0_0_25px_rgba(34,211,238,0.4)]">
              <img
                src={imageChat}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="absolute bottom-1 right-[42%] bg-cyan-500 p-2 rounded-full cursor-pointer hover:bg-cyan-400">
              <Camera size={16} className="text-[#0b1220]" />
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-cyan-300">Name</label>
            <input
              disabled
              value="Ibrahim Omer"
              className="w-full mt-1 px-4 py-2 rounded-md
              bg-[#0b1220]
              border border-cyan-900
              text-cyan-400
              shadow-[inset_0_0_18px_rgba(34,211,238,0.2)]
              cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-cyan-300">Email</label>
            <input
              disabled
              value="himaomer6@gmail.com"
              className="w-full mt-1 px-4 py-2 rounded-md
              bg-[#0b1220]
              border border-cyan-900
              text-cyan-400
              shadow-[inset_0_0_18px_rgba(34,211,238,0.2)]
              cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-cyan-300">New Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 px-4 py-2 rounded-md
              bg-[#0b1220]
              border border-cyan-900
              text-cyan-100
              shadow-[inset_0_0_18px_rgba(34,211,238,0.25)]
              focus:outline-none
              focus:border-cyan-400
              focus:shadow-[inset_0_0_28px_rgba(34,211,238,0.45)]"
            />
          </div>

          {/* Save */}
          <button className="
          w-full py-2 rounded-md
          bg-[#0b1220]
          border border-cyan-500/40
          text-cyan-300
          shadow-[inset_0_0_22px_rgba(34,211,238,0.4)]
          hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.6)]
          transition
        ">
            Save Changes
          </button>
        </div>
      </div>
    </SideBarChat>
  )
}

export default Setting