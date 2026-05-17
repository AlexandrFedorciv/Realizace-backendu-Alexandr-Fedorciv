import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./navigation.jsx";

function Layout() {
  return (
    <>
      <Navigation />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
