import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import StatCard from "../components/StatCard";
import { Users, FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";

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
  CartesianGrid,
} from "recharts";

// --- DATA DEFINITIONS (Ensuring these are inside or imported) ---
const areaData = [
  { name: "2021", value: 120 },
  { name: "2022", value: 200 },
  { name: "2023", value: 150 },
  { name: "2024", value: 250 },
  { name: "2025", value: 300 },
  { name: "2026", value: 260 },
];

const barData = [
  { year: "2021", value: 5 },
  { year: "2022", value: 8 },
  { year: "2023", value: 6 },
  { year: "2024", value: 3 },
  { year: "2025", value: 7 },
];

const pieData = [
  { name: "Approved", value: 210 },
  { name: "Pending", value: 110 },
  { name: "Rejected", value: 60 },
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
const CHART_COLORS = {
  primary: "#6366f1",
  secondary: "#a855f7",
};

const Dashboard = () => {
  const [msrsCount, setMsrsCount] = useState(0);

  const fetchMsrsCount = async () => {
    try {
      const [
        { count: msrsCountData, error: err1 },
        { count: graduateCountData, error: err2 },
      ] = await Promise.all([
        supabase.from("msrs_scholars").select("*", { count: "exact", head: true }),
        supabase.from("graduate_msrs").select("*", { count: "exact", head: true }),
      ]);

      if (err1 || err2) return;
      setMsrsCount((msrsCountData || 0) + (graduateCountData || 0));
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchMsrsCount();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-8 sm:px-8">
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-slate-500 mt-1 font-medium italic">
            Real-time analytics & scholar distribution.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-slate-600 text-xs">
          <Clock size={14} className="text-indigo-500" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Scholars" value="1,250" icon={<Users size={20} />} color="bg-indigo-600" to="/scholars" />
        <StatCard title="MSRS Scholars" value={msrsCount.toLocaleString()} icon={<FileText size={20} />} color="bg-violet-600" to="/msrs" />
        <StatCard title="SIKAP Scholars" value="210" icon={<CheckCircle size={20} />} color="bg-emerald-500" to="/sikap" />
        <StatCard title="HUSAY Scholars" value="110" icon={<TrendingUp size={20} />} color="bg-amber-500" to="/husay" />
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GROWTH AREA CHART */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Scholar Growth</h3>
          {/* Explicit height on the div container for ResponsiveContainer */}
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={3} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Status</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
             {pieData.map((entry, i) => (
               <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                 {entry.name}
               </div>
             ))}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Yearly Applications</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;