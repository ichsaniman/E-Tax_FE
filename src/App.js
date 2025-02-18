import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Report from "./pages/Report";
// import SidebarLayout from "./layouts/SidebarLayout";
import Status from "./pages/Status";
import Scheduler from "./pages/Scheduler";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  const routes = [
    { path: "/home", component: Home, access: "/" },
    { path: "/laporan", component: Report, access: "/" },
    { path: "/status", component: Status, access: "/" },
    { path: "/jadwal", component: Scheduler, access: "/" },
  ];
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <div className="grid-container">
                  {/* Header */}
                  <Header OpenSidebar={OpenSidebar} />

                  {/* Sidebar */}
                  <Sidebar
                    openSidebarToggle={openSidebarToggle}
                    OpenSidebar={OpenSidebar}
                    // accessData={accessPermissions}
                  />

                  <route.component />

                  {/* Protected Route Component */}
                  {/* <Protected
                  access={route.access}
                  Page={() => (
                    <Suspense fallback={<LoadingOverlay />}>
                      <route.component />
                    </Suspense>
                  )}
                /> */}
                </div>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
