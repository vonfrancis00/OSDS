import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* ✅ RESPONSIVE CONTENT */}
      <main className="w-full md:ml-24 md:w-[calc(100%-6rem)] p-4 md:p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;