import { Users, Activity, CheckCircle } from "lucide-react";

const SIKAP = () => {
  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          SIKAP Program
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Scholarships for Instructors’ Knowledge Advancement Program
        </p>

        <div className="mt-3 h-1 w-24 sm:w-32 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"></div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">

        <StatCard
          title="Total Scholars"
          value="80"
          icon={<Users size={20} />}
          color="purple"
        />

        <StatCard
          title="Active"
          value="60"
          icon={<Activity size={20} />}
          color="green"
        />

        <StatCard
          title="Completed"
          value="20"
          icon={<CheckCircle size={20} />}
          color="indigo"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-sm">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 sm:p-5 border-b">
          <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
            SIKAP Scholars List
          </h2>

          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:scale-105 transition w-full sm:w-auto">
            + Add Scholar
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[600px]">

            <thead className="text-gray-500 uppercase">
              <tr>
                <th className="text-left px-4 sm:px-6 py-3">Scholar</th>
                <th className="text-left px-4 sm:px-6 py-3">Program</th>
                <th className="text-left px-4 sm:px-6 py-3">Year</th>
                <th className="text-left px-4 sm:px-6 py-3">Status</th>
                <th className="text-right px-4 sm:px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">

              <TableRow
                name="Maria Santos"
                program="Master's"
                year="2nd Year"
                status="Active"
              />

              <TableRow
                name="Carlos Mendoza"
                program="PhD"
                year="3rd Year"
                status="Completed"
              />

            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default SIKAP;


////////////////////////////////////////////////////
// 🔹 STAT CARD
////////////////////////////////////////////////////
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition border border-gray-200 flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
          {value}
        </h2>
      </div>

      <div className={`p-2 sm:p-3 rounded-xl ${colors[color]}`}>
        {icon}
      </div>

    </div>
  );
};


////////////////////////////////////////////////////
// 🔹 TABLE ROW
////////////////////////////////////////////////////
const TableRow = ({ name, program, year, status }) => {
  const statusStyle =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-indigo-100 text-indigo-700";

  return (
    <tr className="border-t hover:bg-gray-50 transition">

      <td className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
          {name.charAt(0)}
        </div>
        <span className="font-medium text-sm">{name}</span>
      </td>

      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">{program}</td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">{year}</td>

      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <span className={`px-2 sm:px-3 py-1 text-xs rounded-full font-semibold ${statusStyle}`}>
          {status}
        </span>
      </td>

      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
        <button className="text-purple-600 hover:underline text-xs sm:text-sm mr-2 sm:mr-3">
          Edit
        </button>
        <button className="text-red-500 hover:underline text-xs sm:text-sm">
          Delete
        </button>
      </td>

    </tr>
  );
};