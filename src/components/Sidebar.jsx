import React, { useState } from "react";

function Sidebar({ setSelectedComponent, menuItems }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-amber-500 text-white font-semibold h-screen p-4 my-5 ml-5 flex flex-col justify-between w-60 rounded">
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
                className="block px-4 py-2 rounded hover:bg-amber-600 w-full text-left"
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
