import { getUserService, logoutService } from "@/service";
import { userDefault, useUserState } from "@/store/user";
import { useEffect, useState } from "react";

export const useCheckAuthUser = () => {
  const [userState, setUserState] = useUserState();
  const [loading, setLoading] = useState(true);

  async function checkAuthUser() {
    try {
      setLoading(true);
      const data = await getUserService();
      if (data?.success && data.data) {
        setUserState({
          authenticated: true,
          user: data.data,
        });
      } else if (data?.success) {
        checkAuthUser();
      } else {
        setUserState(userDefault);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setUserState(userDefault);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthUser();

    // Listen for auth refresh failures
    const handleAuthRefreshFailed = () => {
      setUserState(userDefault);
    };

    window.addEventListener("auth-refresh-failed", handleAuthRefreshFailed);

    return () => {
      window.removeEventListener(
        "auth-refresh-failed",
        handleAuthRefreshFailed
      );
    };
  }, []);

  return { userState, loading };
};

export const useLogout = () => {
  const [user, setUser] = useUserState();
  const handleLogOut = async () => {
    const data = await logoutService();
    if (data.success) {
      setUser(userDefault);
      alert("Successfully Logout");
    } else {
      alert("unable to Logout");
    }
  };

  return handleLogOut;
};
