import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const scholarsData = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    region: "NCR",
    course: "BS Information Technology",
    year: "2023-2024",
    type: "Full Scholarship",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Santos",
    region: "Region IV-A",
    course: "BS Computer Science",
    year: "2024-2025",
    type: "Partial Scholarship",
    status: "Active",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    region: "Region III",
    course: "BS Information Systems",
    year: "2023-2024",
    type: "Financial Assistance",
    status: "Pending",
  },
];

const Scholars = () => {
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filteredScholars = scholarsData.filter((s) => {
    return (
      (year === "" || s.year === year) &&
      (course === "" || s.course === course) &&
      (region === "" || s.region === region) &&
      (type === "" || s.type === type) &&
      (status === "" || s.status === status) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const clearFilters = () => {
    setYear("");
    setCourse("");
    setRegion("");
    setType("");
    setStatus("");
    setSearch("");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Scholars</h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Manage and monitor scholarship beneficiaries
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm w-full sm:w-auto">
          <Plus size={16} />
          Add Scholar
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-xs sm:text-sm">Total Scholars</p>
          <h3 className="text-xl sm:text-2xl text-blue-700 font-bold mt-2">1,250</h3>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-xs sm:text-sm">Active Scholars</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-2 text-green-600">1,040</h3>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <p className="text-gray-500 text-xs sm:text-sm">Pending Review</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-2 text-yellow-500">210</h3>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">

        <div className="flex items-center border rounded-lg px-3 py-2 w-full sm:w-64">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search scholar..."
            className="outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Region</option>
          <option>NCR</option>
          <option>Region III</option>
          <option>Region IV-A</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">Course</option>
          <option>BS Information Technology</option>
          <option>BS Computer Science</option>
          <option>BS Information Systems</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Scholar Type</option>
          <option>Full Scholarship</option>
          <option>Partial Scholarship</option>
          <option>Financial Assistance</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Academic Year</option>
          <option>2023-2024</option>
          <option>2024-2025</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option>Active</option>
          <option>Pending</option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold w-full sm:w-auto"
        >
          Clear Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-500 text-xs sm:text-sm">
              <th className="px-4 sm:px-6 py-3">Student</th>
              <th className="px-4 sm:px-6 py-3">Region</th>
              <th className="px-4 sm:px-6 py-3">Course</th>
              <th className="px-4 sm:px-6 py-3">Scholar Type</th>
              <th className="px-4 sm:px-6 py-3">Academic Year</th>
              <th className="px-4 sm:px-6 py-3">Status</th>
              <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredScholars.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${student.id}`}
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-700 text-sm">
                    {student.name}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm">{student.region}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm">{student.course}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm">{student.type}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm">{student.year}</td>

                <td className="px-4 sm:px-6 py-4">
                  <span
                    className={`px-2 sm:px-3 py-1 text-xs rounded-full font-medium ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-4 text-right">
                  <Link
                    to={`/scholars/${student.id}`}
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scholars;