import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Report from "./pages/Report";
import SidebarLayout from "./layouts/SidebarLayout";
import Status from "./pages/Status";
import Scheduler from "./pages/Scheduler";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <SidebarLayout>
              <Home />
            </SidebarLayout>
          }
        />
        <Route
          path="/laporan"
          element={
            <SidebarLayout>
              <Report />
            </SidebarLayout>
          }
        />
        <Route
          path="/status"
          element={
            <SidebarLayout>
              <Status />
            </SidebarLayout>
          }
        />
        <Route
          path="/jadwal"
          element={
            <SidebarLayout>
              <Scheduler />
            </SidebarLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
