import { useEffect, useState } from "react";
import { 
  Users, 
  GraduationCap, 
  Activity, 
  Search, 
  Filter, 
  ChevronRight,
  Plus,
  MoreHorizontal
} from "lucide-react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

const MSRS = () => {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ongoingCount, setOngoingCount] = useState(0);
  const [graduateCount, setGraduateCount] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: ongoingData } = await supabase.from("msrs_scholars").select("*");
      const { data: graduateData } = await supabase.from("graduate_msrs").select("*");

      const ongoingWithStatus = (ongoingData || []).map((s, i) => ({
        ...s,
        id: s.id || `ongoing-${i}`,
        display_name: `${s.first_name || s.fname || ""} ${s.last_name || s.lname || ""}`,
        hei: s.hei || s.school || s.university || "N/A",
        award_year: s.award_year || s.year_awarded || "N/A",
        status: "ongoing",
      }));

      const graduatesWithStatus = (graduateData || []).map((s, i) => ({
        ...s,
        id: s.id || `graduate-${i}`,
        display_name: `${s.first_name || s.fname || ""} ${s.last_name || s.lname || ""}`,
        hei: s.hei || s.school || s.university || "N/A",
        award_year: s.award_year || s.year_awarded || "N/A",
        status: "graduate",
      }));

      const combined = [...ongoingWithStatus, ...graduatesWithStatus];
      setScholars(combined);
      setOngoingCount(ongoingWithStatus.length);
      setGraduateCount(graduateData?.length || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredScholars = scholars.filter(s => 
    s.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.hei.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Scholarship Management
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            MSRS Program • Centralized tracking and service monitoring
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95">
          <Plus size={18} />
          <span>New Scholar</span>
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Registry" value={ongoingCount + graduateCount} icon={<Users />} color="indigo" />
        <StatCard title="Active Scholars" value={ongoingCount} icon={<Activity />} color="emerald" />
        <StatCard title="Completed" value={graduateCount} icon={<GraduationCap />} color="amber" />
      </div>

      {/* MAIN TABLE CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* TABLE UTILITIES */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name or university..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left px-8 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Scholar Profile</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Institution (HEI)</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Year Awarded</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : filteredScholars.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-slate-400 font-medium">
                    No scholars match your current search.
                  </td>
                </tr>
              ) : (
                filteredScholars.map((s) => (
                  <TableRow 
                    key={s.id} 
                    scholar={s} 
                    onView={() => navigate(`/msrs/${s.id}`)} 
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

/* --- COMPONENTS --- */

const StatCard = ({ title, value, icon, color }) => {
  const themes = {
    indigo: "bg-indigo-600 text-white shadow-indigo-100",
    emerald: "bg-white text-emerald-600 border border-slate-200",
    amber: "bg-white text-amber-600 border border-slate-200",
  };

  return (
    <div className={`p-6 rounded-3xl transition-transform hover:-translate-y-1 duration-300 ${themes[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-semibold opacity-80 ${color === 'indigo' ? 'text-indigo-100' : 'text-slate-500'}`}>
            {title}
          </p>
          <h2 className="text-4xl font-bold mt-2 tracking-tight">{value}</h2>
        </div>
        <div className={`p-3 rounded-2xl ${color === 'indigo' ? 'bg-indigo-500/50' : 'bg-slate-50'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ scholar, onView }) => {
  const isGraduate = scholar.status === "graduate";

  return (
    <tr className="group hover:bg-slate-50/80 transition-colors">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg border border-indigo-200">
            {scholar.display_name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
              {scholar.display_name}
            </p>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-tighter mt-1">
              {scholar.region || "No Region Data"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <p className="text-sm font-semibold text-slate-600">{scholar.hei}</p>
      </td>
      <td className="px-6 py-5 text-sm font-medium text-slate-500">
        {scholar.award_year}
      </td>
      <td className="px-6 py-5">
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase ${
          isGraduate 
          ? "bg-amber-50 text-amber-700 border border-amber-200" 
          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isGraduate ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          {scholar.status}
        </span>
      </td>
      <td className="px-8 py-5 text-center">
        <button 
          onClick={onView}
          className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 hover:text-indigo-600 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </td>
    </tr>
  );
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td colSpan="5" className="px-8 py-5"><div className="h-12 bg-slate-100 rounded-xl w-full"></div></td>
  </tr>
);

export default MSRS;