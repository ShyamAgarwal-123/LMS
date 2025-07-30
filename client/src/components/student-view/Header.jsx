import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoComponet from "../logo/WebLogo";
import { Button } from "../ui/button";
import { TvMinimalPlay } from "lucide-react";
import { userDefault, useUserState } from "@/store/user";
import { logoutService } from "@/service";

function StudentHeader() {
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
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to={"/home"}>
          <LogoComponet className="md:text-xl" />
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            onClick={() => navigate("/courses")}
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Course
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentHeader;
