import React from "react";

function LogoComponet({ className }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold font-heading text-sm">
          L
        </span>
      </div>
      <h1 className="text-xl font-heading font-semibold">Laksay</h1>
    </div>
  );
}

export default LogoComponet;
