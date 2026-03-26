import { Mail, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

const ScholarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholar, setScholar] = useState(null);
  const [loading, setLoading] = useState(true);

  ////////////////////////////////////////////////////
  // FETCH DATA (FROM BOTH TABLES)
  ////////////////////////////////////////////////////
  useEffect(() => {
    const fetchScholar = async () => {
      setLoading(true);

      // 🔥 Try ongoing first
      let { data, error } = await supabase
        .from("msrs_scholars")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      // 🔥 If not found, try graduates
      if (!data) {
        const res = await supabase
          .from("graduate_msrs")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        data = res.data;
        error = res.error;
      }

      if (error) {
        console.error(error);
      }

      if (data) {
        // ✅ NORMALIZE EVERYTHING
        const normalized = {
          ...data,
          first_name: data.first_name || data.fname || "",
          last_name: data.last_name || data.lname || "",
          hei: data.hei || data.school || data.university || "",
          award_year: data.award_year || data.year_awarded || "",
          status:
            data.status ||
            (data.graduated ? "GRADUATED" : "ACTIVE"),
        };

        setScholar(normalized);
      }

      setLoading(false);
    };

    fetchScholar();
  }, [id]);

  ////////////////////////////////////////////////////
  // LOADING
  ////////////////////////////////////////////////////
  if (loading) return <div className="p-6">Loading...</div>;
  if (!scholar) return <div className="p-6 text-red-500">Scholar not found</div>;

  ////////////////////////////////////////////////////
  // BASIC INFO
  ////////////////////////////////////////////////////
  const fullName = `${scholar.first_name} ${scholar.last_name}`;
  const initial = fullName.charAt(0) || "S";

  ////////////////////////////////////////////////////
  // GROUP SEMESTERS (FIXED + FLEXIBLE)
  ////////////////////////////////////////////////////
  const groupedSemesters = {};

  Object.keys(scholar).forEach((key) => {
    const upper = key.toUpperCase();

    if (upper.includes("STATUS") && upper.includes("SEM")) {
      const yearMatch = key.match(/\d{4}-\d{4}/);
      const year = yearMatch ? yearMatch[0] : "Unknown";

      const semester = upper.includes("1SEM")
        ? "1st Semester"
        : "2nd Semester";

      const releaseKey = key.replace(/STATUS/i, "OSDS RELEASE");
      const remarksKey = key.replace(/STATUS/i, "OSDS REMARKS");

      const entry = {
        semester,
        status: scholar[key],
        release: scholar[releaseKey],
        remarks: scholar[remarksKey],
      };

      if (!groupedSemesters[year]) {
        groupedSemesters[year] = [];
      }

      groupedSemesters[year].push(entry);
    }
  });

  ////////////////////////////////////////////////////
  // STATUS STYLE
  ////////////////////////////////////////////////////
  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-100 text-gray-500";

    const s = status.toUpperCase();

    if (s.includes("ACTIVE")) return "bg-green-100 text-green-700";
    if (s.includes("FUNDED")) return "bg-blue-100 text-blue-700";
    if (s.includes("INACTIVE")) return "bg-red-100 text-red-700";
    if (s.includes("GRADUATED")) return "bg-purple-100 text-purple-700";

    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Return to MSRS
      </button>

      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-blue-900 text-white rounded-3xl p-8 shadow-lg">

          <div className="flex flex-col md:flex-row md:justify-between gap-6">

            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold">
                {initial}
              </div>

              <div>
                <h1 className="text-2xl font-bold">{fullName}</h1>
                <p className="text-sm opacity-80">{scholar.hei}</p>
              </div>
            </div>

            {/* ✅ DYNAMIC STATUS */}
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusStyle(scholar.status)}`}>
              {scholar.status}
            </span>

          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PROFILE */}
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Profile Information
            </h3>

            <Info label="HEI" value={scholar.hei} icon={<Mail size={14} />} />
            <Info label="Region" value={scholar.region} />
            <Info label="Award Year" value={scholar.award_year} />
            <Info label="Gender" value={scholar.gender} />
          </div>

          {/* ACADEMIC */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow space-y-6">

            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Academic Status
            </h3>

            {Object.keys(groupedSemesters).length === 0 && (
              <p className="text-gray-400 text-sm">No academic data</p>
            )}

            {Object.entries(groupedSemesters).map(([year, semesters]) => (
              <div key={year}>

                <h4 className="font-semibold text-gray-800 mb-2">{year}</h4>

                <div className="grid md:grid-cols-2 gap-4">
                  {semesters.map((sem, i) => (
                    <div key={i} className="border rounded-xl p-4 bg-gray-50">

                      <p className="text-xs text-gray-400 mb-2">
                        {sem.semester}
                      </p>

                      <Mini label="Status" value={sem.status} />
                      <Mini label="OSDS Release" value={sem.release} />
                      <Mini label="Remarks" value={sem.remarks} />

                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ScholarDetails;

////////////////////////////////////////////////////
// INFO
////////////////////////////////////////////////////
const Info = ({ label, value, icon }) => (
  <div className="flex items-center gap-2">
    {icon && <span className="text-gray-400">{icon}</span>}
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  </div>
);

////////////////////////////////////////////////////
// MINI
////////////////////////////////////////////////////
const Mini = ({ label, value }) => {
  const isStatus = label.toLowerCase() === "status";
  const isMoney = label.toLowerCase().includes("release");

  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-100 text-gray-500";

    const s = status.toUpperCase();

    if (s.includes("ACTIVE")) return "bg-green-100 text-green-700";
    if (s.includes("FUNDED")) return "bg-blue-100 text-blue-700";
    if (s.includes("INACTIVE")) return "bg-red-100 text-red-700";
    if (s.includes("GRADUATED")) return "bg-purple-100 text-purple-700";

    return "bg-gray-100 text-gray-600";
  };

  const formatMoney = (val) => {
    if (!val) return "-";
    const num = parseFloat(val.toString().replace(/,/g, ""));
    if (isNaN(num)) return val;

    return `₱${num.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="mb-2">
      <p className="text-gray-400 text-xs">{label}</p>

      {isStatus ? (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(value)}`}>
          {value || "-"}
        </span>
      ) : (
        <p className="font-medium text-gray-800">
          {isMoney ? formatMoney(value) : value || "-"}
        </p>
      )}
    </div>
  );
};