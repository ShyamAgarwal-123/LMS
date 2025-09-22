import {
  LayoutDashboard,
  BookOpen,
  SettingsIcon,
  LogOutIcon,
  HomeIcon,
} from "lucide-react";
import { Button } from "../ui/button";

import { useLogout } from "@/customhook/auth-hook";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", view: "admin" },
  { icon: HomeIcon, label: "Home", view: "student" },
  { icon: BookOpen, label: "Courses" },
];

function Sidebar({ activeTab, setActiveTab, view }) {
  const navigate = useNavigate();
  const handleLogOut = useLogout();
  return (
    <div className="p-4 space-y-2 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Main Menu
        </h2>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.view !== view && item.view !== undefined) return;
            const Icon = item.icon;
            return (
              <Button
                onClick={() => {
                  setActiveTab(item.label);
                  if (view === "student") {
                    navigate(`/${item.label.toLowerCase()}`);
                  }
                }}
                key={item.label}
                variant={activeTab == item.label ? "default" : "ghost"}
                className={`
                  w-full justify-start gap-3 h-10 font-medium
                  ${
                    activeTab == item.label
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-foreground"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border pt-4">
        <div className="space-y-2 text-xs">
          <Button
            variant={"ghost"}
            className={`
                  w-full justify-start gap-3 h-10 font-medium
                  
                `}
          >
            <SettingsIcon className="h-4 w-4" />
            Setting
          </Button>
          <Button
            onClick={handleLogOut}
            variant={"ghost"}
            className={`
                  w-full justify-start gap-3 h-10 font-medium
                  
                `}
          >
            <LogOutIcon className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
