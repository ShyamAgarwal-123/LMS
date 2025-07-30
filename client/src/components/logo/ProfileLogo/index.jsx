import { useUserState } from "@/store/user";
import React from "react";

function Profile() {
  const [userState, setUserState] = useUserState();

  return (
    <div className="w-[24px] h-[24px]">
      <img
        src={userState.user?.profileImage}
        alt="profile image"
        className="w-full h-full rounded-full border-2 border-black border-dotted p-[2px]"
      />
    </div>
  );
}

export default Profile;
