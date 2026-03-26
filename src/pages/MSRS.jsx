import { useEffect, useState } from "react";
import { Users, GraduationCap, Activity } from "lucide-react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

const MSRS = () => {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ongoingCount, setOngoingCount] = useState(0);
  const [graduateCount, setGraduateCount] = useState(0);

  const navigate = useNavigate();

  ////////////////////////////////////////////////////
  // FETCH DATA
  ////////////////////////////////////////////////////
  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: ongoingData } = await supabase
        .from("msrs_scholars")
        .select("*");

      const { data: graduateData } = await supabase
        .from("graduate_msrs")
        .select("*");

      const ongoingWithStatus = (ongoingData || []).map((s, i) => ({
        ...s,
        id: s.id || `ongoing-${i}`,
        first_name: s.first_name || s.fname || "",
        last_name: s.last_name || s.lname || "",
        hei: s.hei || s.school || s.university || "",
        award_year: s.award_year || s.year_awarded || "",
        status: "ongoing",
      }));

      const graduatesWithStatus = (graduateData || []).map((s, i) => ({
        ...s,
        id: s.id || `graduate-${i}`,
        first_name: s.first_name || s.fname || "",
        last_name: s.last_name || s.lname || "",
        hei: s.hei || s.school || s.university || "",
        award_year: s.award_year || s.year_awarded || "",
        status: "graduate",
      }));

      const combined = [...ongoingWithStatus, ...graduatesWithStatus];

      setScholars(combined);
      setOngoingCount(ongoingWithStatus.length);
      setGraduateCount(graduatesWithStatus.length);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = ongoingCount + graduateCount;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">MSRS Program</h1>
        <p className="text-gray-500 text-sm mt-1">
          Medical Scholarship and Return Service Program Overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Scholars" value={total} icon={<Users size={20} />} color="blue" />
        <StatCard title="Ongoing Scholars" value={ongoingCount} icon={<Activity size={20} />} color="green" />
        <StatCard title="Graduated Scholars" value={graduateCount} icon={<GraduationCap size={20} />} color="indigo" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="font-semibold text-gray-800">MSRS Scholars</h2>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:scale-105 transition">
            + Add Scholar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="text-left px-6 py-3">Scholar</th>
                <th className="text-left px-6 py-3">HEI</th>
                <th className="text-left px-6 py-3">Year</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-right px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : scholars.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No data found
                  </td>
                </tr>
              ) : (
                scholars.map((s) => (
                  <TableRow
                    key={s.id}
                    scholar={s}
                    onView={(data) => navigate(`/msrs/${data.id}`)}
                  />
                ))
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default MSRS;

////////////////////////////////////////////////////
// STAT CARD
////////////////////////////////////////////////////
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
};

////////////////////////////////////////////////////
// TABLE ROW
////////////////////////////////////////////////////
const TableRow = ({ scholar, onView }) => {
  const name = `${scholar.first_name} ${scholar.last_name}`;
  const isGraduate = scholar.status === "graduate";

  return (
    <tr className="hover:bg-gray-50 transition">

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow">
            {name?.charAt(0) || "?"}
          </div>
          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-400">{scholar.region || ""}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-gray-600">
        {scholar.hei}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {scholar.award_year}
      </td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
          isGraduate
            ? "bg-indigo-100 text-indigo-700"
            : "bg-green-100 text-green-700"
        }`}>
          {isGraduate ? "Graduated" : "Active"}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onView(scholar)}
          className="text-blue-600 font-medium hover:underline"
        >
          View
        </button>
      </td>

    </tr>
  );
};