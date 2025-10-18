import type React from "react";

interface RoleBasedViewProps {
  role: "SOC" | "IR" | "TI" | "TH";
  children: React.ReactNode;
}

export default function RoleBasedView({ children }: RoleBasedViewProps) {
  return <div className="space-y-6">{children}</div>;
}
