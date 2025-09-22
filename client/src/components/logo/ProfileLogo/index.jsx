import { useUserState } from "@/store/user";
import React from "react";

function Profile({ image }) {
  return (
    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
      <img
        src={image}
        alt="profile image"
        className="w-full h-full rounded-full border-primary border-2"
      />
    </div>
  );
}

export default Profile;
