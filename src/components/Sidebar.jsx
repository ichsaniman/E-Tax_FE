import React, { useState } from "react";

function Sidebar({ setSelectedComponent, menuItems }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-[#263043] text-white font-semibold min-h-screen p-4 mr-5 flex flex-col justify-between w-44">
      <div className="lg:hidden">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2">
          ☰
        </button>
      </div>
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:flex mb-10`}>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li>
              <a
                className="block px-4 py-2 rounded hover:bg-indigo-900 w-full text-left"
                href={`/${item}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
