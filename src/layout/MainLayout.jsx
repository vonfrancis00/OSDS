import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* ✅ FIXED CONTENT (PERFECT ALIGNMENT) */}
      <main className="ml-24 w-[calc(100%-6rem)] p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;