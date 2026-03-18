import Sidebar from "../components/Sidebar";
import { Users, GraduationCap, Activity } from "lucide-react";

const MSRS = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-24">

        {/* HEADER WITH ACCENT */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">MSRS Program</h1>
          <p className="text-gray-500 text-sm">
            Medical Scholarship and Return Service Program Overview
          </p>

          <div className="mt-3 h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"></div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          <StatCard
            title="Total Scholars"
            value="120"
            icon={<Users />}
            color="blue"
          />

          <StatCard
            title="Active"
            value="95"
            icon={<Activity />}
            color="green"
          />

          <StatCard
            title="Graduated"
            value="25"
            icon={<GraduationCap />}
            color="indigo"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">

          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="font-semibold text-gray-800">
              MSRS Scholars List
            </h2>

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:scale-105 transition">
              + Add Scholar
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Scholar</th>
                  <th className="text-left px-6 py-3">Course</th>
                  <th className="text-left px-6 py-3">Year</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-right px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">

                <TableRow
                  name="Juan Dela Cruz"
                  course="Medicine"
                  year="3rd Year"
                  status="Active"
                />

                <TableRow
                  name="Ana Reyes"
                  course="Medicine"
                  year="4th Year"
                  status="Graduated"
                />

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MSRS;


////////////////////////////////////////////////////
// 🔹 STAT CARD COMPONENT
////////////////////////////////////////////////////
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border border-gray-200 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">{value}</h2>
      </div>

      <div className={`p-3 rounded-xl ${colors[color]}`}>
        {icon}
      </div>

    </div>
  );
};


////////////////////////////////////////////////////
// 🔹 TABLE ROW COMPONENT
////////////////////////////////////////////////////
const TableRow = ({ name, course, year, status }) => {
  const statusStyle =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  return (
    <tr className="border-t hover:bg-gray-50 transition">

      {/* NAME WITH AVATAR */}
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {name.charAt(0)}
        </div>
        <span className="font-medium">{name}</span>
      </td>

      <td className="px-6 py-4">{course}</td>
      <td className="px-6 py-4">{year}</td>

      {/* STATUS BADGE */}
      <td className="px-6 py-4">
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${statusStyle}`}>
          {status}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4 text-right">
        <button className="text-blue-600 hover:underline text-sm mr-3">
          Edit
        </button>
        <button className="text-red-500 hover:underline text-sm">
          Delete
        </button>
      </td>

    </tr>
  );
};