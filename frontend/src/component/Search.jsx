import React from "react";
import { Search } from "lucide-react";

function SearchComponents({ onChange, value }) {
  return (
    <div className="flex items-center gap-2 p-3 mb-4 w-full rounded-md bg-[#101A2E] border border-cyan-900">
      <Search size={16} className="text-cyan-400" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none text-cyan-100 w-full placeholder:text-cyan-500"
      />
    </div>
  );
}

export default SearchComponents;
