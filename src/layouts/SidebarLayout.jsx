import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ["/"]; // Add the routes where you don't want the sidebar

  const showSidebar = !excludedRoutes.includes(location.pathname);

  return (
    <div className="flex flex-row">
      {showSidebar && (
        <Sidebar menuItems={["Home", "Report", "Status", "Scheduler"]} />
      )}
      <main>{children}</main>
    </div>
  );
};

export default SidebarLayout;
