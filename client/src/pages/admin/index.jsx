import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { logoutService } from "@/service";
import { useUserState, userDefault } from "@/store/user";
import { TabsContent } from "@radix-ui/react-tabs";
import { BarChart, BookCheckIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCourseComponent from "../../components/instructor-view/courses";
import LogoComponet from "@/components/logo/WebLogo";
import Profile from "@/components/logo/ProfileLogo";
import ConfigurableGridBackground from "@/components/custom-bg";
function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userState, setUserState] = useUserState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await logoutService();
    if (data.success) {
      setUserState(userDefault);
      navigate("/auth");
    }
  };

  return (
    <div className="flex sm:flex-row relative">
      <aside className="sm:border-r-2 border-b-2 sm:min-h-screen sm:h-full md:w-44 bg-white text-black transition-all duration-300 sm:w-12 flex p-2 sm:flex-col justify-between items-center sm:relative fixed left-0 right-0 flex-row">
        <nav className="flex sm:flex-col flex-row gap-4 mt-1">
          <LogoComponet
            className={
              "self-start p-2 cursor-pointer hover:opacity-70 sm:border-b-2 w-full"
            }
          />
          <button
            className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
              activeTab === "dashboard" && "bg-slate-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <BarChart />
            <span
              className={`md:block hidden ${
                activeTab === "dashboard" && "font-bold"
              }`}
            >
              Dashboard
            </span>
          </button>
          <button
            className={`flex gap-2 w-full p-2 rounded-full md:rounded-md ${
              activeTab === "courses" && "bg-slate-200"
            }`}
            onClick={() => setActiveTab("courses")}
          >
            <BookCheckIcon className="" />
            <span
              className={`md:block hidden ${
                activeTab === "courses" && "font-bold"
              }`}
            >
              Courses
            </span>
          </button>
        </nav>
        <div className="mb-1 text-red-500 md:self-start flex sm:flex-col flex-row gap-2 mt-1 font-bold">
          <button
            className="flex gap-2 p-2 items-center"
            onClick={handleLogout}
          >
            <Profile />
            <span className="hidden md:block text-black">Profile</span>
          </button>
          <button
            className="flex gap-2 p-2 items-center"
            onClick={handleLogout}
          >
            <LogOut />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </aside>
      <ConfigurableGridBackground className={"w-full"}>
        <main className="w-full min-h-screen h-full sm:pt-3 pt-20 px-4">
          <h1 className="text-3xl font-bold mt-1 pl-1 text-blue-400">
            {activeTab === "dashboard" ? "Dashboard" : "My Courses"}
          </h1>
          <Tabs value={activeTab} className="mt-4">
            <TabsContent value="dashboard">
              <AdminCourseComponent />
            </TabsContent>
            <TabsContent value="courses">
              <AdminCourseComponent />
            </TabsContent>
          </Tabs>
        </main>
      </ConfigurableGridBackground>
    </div>
  );
}

export default AdminPage;
