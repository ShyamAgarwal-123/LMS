import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useLogout } from "@/customhook/auth-hook";

function UserProfile({ setState }) {
  const handleLogOut = useLogout();

  return (
    <Card className="absolute top-16 right-8 p-3 flex-col justify-center items-center z-50 space-y-2">
      <div className="flex justify-end">
        <X
          onClick={() => setState((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      <Button onClick={handleLogOut}>Logout</Button>
    </Card>
  );
}

export default UserProfile;
