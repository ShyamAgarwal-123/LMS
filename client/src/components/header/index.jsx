import { Bell, Menu, Search, X } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import LogoComponet from "../logo/WebLogo";
import { Button } from "../ui/button";
import Profile from "../logo/ProfileLogo";

function Header({
  sidebarOpen,
  setSideBarOpen,
  user,
  isProfileOpen,
  setIsProfileOpen,
}) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-card">
      <div className="flex items-center gap-4">
        <Button
          variant="goast"
          size="sm"
          className="lg:hidden"
          onClick={() => setSideBarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        <LogoComponet className={"cursor-pointer"} />
      </div>

      <div className="hidden md:flex items-center gap-4 max-w-md flex-1 mx-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10 bg-muted border-0"
            placeholder="Search courses..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground">3</span>
          </span>
        </Button>

        <Button
          className="gap-2"
          variant="ghost"
          size="lg"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <Profile image={user?.user?.profileImage} />
          <span className="hidden sm:inline text-sm font-medium">
            {user.user.username}
          </span>
        </Button>
      </div>
    </header>
  );
}

export default Header;
