import React from "react";
import { Goal } from "lucide-react";

function LogoComponet({ className }) {
  return (
    <div className={`flex flex-row gap-2  ${className}`}>
      <Goal />
      <span className="text-blue-400 md:block hidden font-medium">LAKSAY</span>
    </div>
  );
}

export default LogoComponet;
