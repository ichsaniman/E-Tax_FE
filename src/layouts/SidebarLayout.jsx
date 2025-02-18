import React from "react";
import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import Header from "../components/header";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ["/"]; // Add the routes where you don't want the sidebar

  const showSidebar = !excludedRoutes.includes(location.pathname);

  return (
    <div className="flex flex-row">
      {showSidebar && (
        <>
          <Sidebar menuItems={["Home", "Laporan", "Status", "Jadwal"]} />
        </>
      )}
      <main>{children}</main>
    </div>
  );
};

export default SidebarLayout;
