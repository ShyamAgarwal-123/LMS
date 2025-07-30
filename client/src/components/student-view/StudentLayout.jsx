import React from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "./Header";

function StudentLayout() {
  return (
    <div>
      <StudentHeader />
      <Outlet />
    </div>
  );
}

export default StudentLayout;
