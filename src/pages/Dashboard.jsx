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
  return (
    <div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Scholars"
          value="1,250"
          icon={<Users size={24} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Total MSRS Scholars"
          value="320"
          icon={<FileText size={24} />}
          color="bg-purple-500"
          to="/msrs"
        />

        <StatCard
          title="Total SIKAP Scholars"
          value="210"
          icon={<CheckCircle size={24} />}
          color="bg-green-500"
          to="/sikap"
        />

        <StatCard
          title="Total HUSAY Scholars"
          value="110"
          icon={<Clock size={24} />}
          color="bg-yellow-500"
          to="/husay"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Applications Trend
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="name" />
              <YAxis />
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

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Weekly Activity
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Application Status
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
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