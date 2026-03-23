import { useEffect, useState } from "react"; // ✅ added
import Sidebar from "../components/Sidebar";
import API from "../utils/api";

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ added

  useEffect(() => { // ✅ added
    const fetchUser = async () => {
      const res = await fetch(`${API}/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return null; // ✅ added

  return (
    <div>

      {/* ✅ added user prop */}
      <Sidebar user={user} />

      {/* Dashboard Content */}
      <main className="ml-24 p-6">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;