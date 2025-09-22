import { useState } from "react";

import SideBar from "@/components/sidebar";
import { useAllAdminCoursesState } from "@/store/admin";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AdminCourseComponent from "../../components/instructor-view/courses";
import AdminDashboardComponent from "@/components/instructor-view/dashboard";
import { useUserState } from "@/store/user";
import UserProfile from "@/components/user-profile";

import Header from "@/components/header";
function AdminPage() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [user] = useUserState();
  const [courses] = useAllAdminCoursesState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-background font-primary">
      {isProfileOpen && <UserProfile setState={setIsProfileOpen} />}
      {/* NavBar */}
      <Header
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        user={user}
        sidebarOpen={sidebarOpen}
        setSideBarOpen={setSideBarOpen}
      />

      <div className="flex">
        {/* sideBar */}
        <div
          className={`fixed lg:static insert-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 border-b border-border "></div>
          <SideBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            view={"admin"}
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
          {/* <h1 className="text-3xl font-bold mt-1 pl-1 text-blue-400">
            {activeTab === "ashboard" ? "Dashboard" : "My Courses"}
          </h1> */}
          <Tabs value={activeTab} className="mt-4">
            <TabsContent value="Dashboard">
              <AdminDashboardComponent />
            </TabsContent>
            <TabsContent value="Courses">
              <AdminCourseComponent />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
