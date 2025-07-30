import { Lock, LockIcon } from "lucide-react";
import React from "react";

function LockComponent({ children, isLock }) {
  return (
    <div className="relative w-full h-full">
      {isLock && (
        <div className="absolute z-20 w-full h-full translate-x-[50%] translate-y-[50%]">
          <Lock className="h-20 w-20" />
        </div>
      )}
      <div className={`${isLock && "pointer-events-none blur-sm"}`}>
        {children}
      </div>
    </div>
  );
}

export default LockComponent;
