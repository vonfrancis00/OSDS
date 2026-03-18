import Sidebar from "../components/Sidebar";
import { Users, Activity, Award } from "lucide-react";

const HUSAY = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-24">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">HUSAY Program</h1>
          <p className="text-gray-500 text-sm">
            Honoring Excellence and Academic Achievement of Scholars
          </p>

          <div className="mt-3 h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          <StatCard
            title="Total Scholars"
            value="50"
            icon={<Users />}
            color="orange"
          />

          <StatCard
            title="Active"
            value="40"
            icon={<Activity />}
            color="green"
          />

          <StatCard
            title="Completed"
            value="10"
            icon={<Award />}
            color="amber"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">

          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="font-semibold text-gray-800">
              HUSAY Scholars List
            </h2>

            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:scale-105 transition">
              + Add Scholar
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-3">Scholar</th>
                  <th className="text-left px-6 py-3">Field</th>
                  <th className="text-left px-6 py-3">Year</th>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-right px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">

                <TableRow
                  name="Pedro Reyes"
                  field="Engineering"
                  year="4th Year"
                  status="Active"
                />

                <TableRow
                  name="Liza Cruz"
                  field="Information Technology"
                  year="3rd Year"
                  status="Completed"
                />

              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HUSAY;


////////////////////////////////////////////////////
// 🔹 STAT CARD
////////////////////////////////////////////////////
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
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
// 🔹 TABLE ROW
////////////////////////////////////////////////////
const TableRow = ({ name, field, year, status }) => {
  const statusStyle =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  return (
    <tr className="border-t hover:bg-gray-50 transition">

      {/* Name + Avatar */}
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
          {name.charAt(0)}
        </div>
        <span className="font-medium">{name}</span>
      </td>

      <td className="px-6 py-4">{field}</td>
      <td className="px-6 py-4">{year}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${statusStyle}`}>
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button className="text-orange-600 hover:underline text-sm mr-3">
          Edit
        </button>
        <button className="text-red-500 hover:underline text-sm">
          Delete
        </button>
      </td>

    </tr>
  );
};