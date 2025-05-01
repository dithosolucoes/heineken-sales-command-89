
import { ReactNode } from "react";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "vendedor" | "supervisor" | "admin";
  pageTitle: string;
}

const DashboardLayout = ({ children, userType, pageTitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userType={userType} />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4 text-tactical">{pageTitle}</h1>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
