import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import { useUserState } from "@/store/user";
import Sidebar from "../sidebar/index";
import UserProfile from "../user-profile";
import { useSideBarState } from "@/store/common";

function StudentLayout() {
  const [sidebarOpen, setSideBarOpen] = useSideBarState();
  const [user] = useUserState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <div className="relative min-h-screen bg-background font-primary">
      {isProfileOpen && <UserProfile setState={setIsProfileOpen} />}
      <Header
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        user={user}
        sidebarOpen={sidebarOpen}
        setSideBarOpen={setSideBarOpen}
      />
      <div className="flex">
        <div
          className={`absolute h-full lg:min-h-screen lg:static insert-y-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            view={"student"}
          />
        </div>
        {/* overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSideBarOpen(false)}
          />
        )}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;
