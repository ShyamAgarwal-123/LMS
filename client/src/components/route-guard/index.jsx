import { Navigate, useLocation } from "react-router-dom";
import { useUserState } from "@/store/user";
import { useCheckAuthUser } from "@/customhook/auth-hook";

export default function RouteGuard({ authenticated, user, element }) {
  const { loading } = useCheckAuthUser();
  const [userState, setUserState] = useUserState();
  const location = useLocation();
  if (loading) {
    return (
      <div className="w-full translate-y-[50%] translate-x-[50%] min-h-screen">
        Loading...
      </div>
    );
  }
  if (!userState.authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"} replace />;
  } else if (
    userState.authenticated &&
    userState.user.role !== "admin" &&
    (location.pathname.includes("admin") || location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/home"} replace />;
  } else if (
    userState.authenticated &&
    userState.user.role === "admin" &&
    (!location.pathname.includes("admin") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/admin"} replace />;
  } else {
    return <>{element}</>;
  }
}
