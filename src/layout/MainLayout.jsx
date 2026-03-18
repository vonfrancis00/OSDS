import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div>

      <Sidebar />

      {/* Dashboard Content */}
      <main className="ml-24 p-6">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;