import React, { useEffect } from "react";
import SideBarChat from "../component/SideBarChat";
import SearchComponents from "../component/Search";
import CardContact from "../component/CardContact";
import userStore from "../store/User.store.js";

function Allcontactc() {
  const { isAuthenticated } = userStore();
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <SideBarChat>
      <div className="p-6 flex-1 h-full overflow-y-auto bg-[#0b1220]">
        <SearchComponents />
        <CardContact />
      </div>
    </SideBarChat>
  );
}

export default Allcontactc;
