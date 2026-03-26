import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

import StatCard from "../components/StatCard";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const areaData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 250 },
  { name: "May", value: 300 },
  { name: "Jun", value: 260 },
];

const barData = [
  { name: "Mon", value: 5 },
  { name: "Tue", value: 8 },
  { name: "Wed", value: 6 },
  { name: "Thu", value: 3 },
  { name: "Fri", value: 7 },
];

const pieData = [
  { name: "Approved", value: 210 },
  { name: "Pending", value: 110 },
  { name: "Rejected", value: 60 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const Dashboard = () => {
  const [msrsCount, setMsrsCount] = useState(0);

  ////////////////////////////////////////////////////
  // FETCH MSRS COUNT
  ////////////////////////////////////////////////////
  const fetchMsrsCount = async () => {
  try {
    // fetch both counts in parallel
    const [
      { count: msrsCountData, error: err1 },
      { count: graduateCountData, error: err2 },
    ] = await Promise.all([
      supabase
        .from("msrs_scholars")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("graduate_msrs")
        .select("*", { count: "exact", head: true }),
    ]);

    if (err1 || err2) {
      console.error("Error fetching MSRS counts:", err1 || err2);
      return;
    }

    const total =
      (msrsCountData || 0) + (graduateCountData || 0);

    setMsrsCount(total);

  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

  useEffect(() => {
    fetchMsrsCount();
  }, []);

  return (
    <div className="px-4 sm:px-6">

      {/* HEADER */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Dashboard Overview
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">

        <StatCard
          title="Total Scholars"
          value="1,250"
          icon={<Users size={20} />}
          color="bg-blue-500"
          to="/scholars"
        />

        <StatCard
          title="Total MSRS Scholars"
          value={msrsCount.toLocaleString()}
          icon={<FileText size={20} />}
          color="bg-purple-500"
          to="/msrs"
        />

        <StatCard
          title="Total SIKAP Scholars"
          value="210"
          icon={<CheckCircle size={20} />}
          color="bg-green-500"
          to="/sikap"
        />

        <StatCard
          title="Total HUSAY Scholars"
          value="110"
          icon={<Clock size={20} />}
          color="bg-yellow-500"
          to="/husay"
        />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* AREA CHART */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Applications Trend
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="#93c5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Applications by Day
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Application Status
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;