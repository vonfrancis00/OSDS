import { Users, Map, GraduationCap, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const scholars = [
  { id: 1, name: "Juan Dela Cruz", region: "NCR", course: "BSIT" },
  { id: 2, name: "Maria Santos", region: "Region IV-A", course: "BSCS" },
  { id: 3, name: "Pedro Reyes", region: "NCR", course: "BSIT" },
  { id: 4, name: "Ana Cruz", region: "Region III", course: "BSED" },
  { id: 5, name: "Jose Lopez", region: "Region IV-A", course: "BSBA" },
]

const COLORS = ["#1d4ed8","#2563eb","#3b82f6","#60a5fa"]

const Reports = () => {

  const totalScholars = scholars.length

  const regionStats = Object.values(
    scholars.reduce((acc, scholar) => {
      acc[scholar.region] = acc[scholar.region] || { region: scholar.region, value: 0 }
      acc[scholar.region].value++
      return acc
    }, {})
  )

  const courseStats = Object.values(
    scholars.reduce((acc, scholar) => {
      acc[scholar.course] = acc[scholar.course] || { course: scholar.course, value: 0 }
      acc[scholar.course].value++
      return acc
    }, {})
  )

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">

      {/* TITLE */}
      <div className="flex items-center gap-3">
        <BarChart3 className="text-blue-700" size={26} />
        <h1 className="text-2xl sm:text-3xl font-bold">Scholarship Reports</h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-3 sm:gap-4">
          <Users className="text-blue-600" size={30} />
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Total Scholars</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{totalScholars}</h2>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-3 sm:gap-4">
          <Map className="text-green-600" size={30} />
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Regions</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{regionStats.length}</h2>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-3 sm:gap-4">
          <GraduationCap className="text-purple-600" size={30} />
          <div>
            <p className="text-gray-500 text-xs sm:text-sm">Courses</p>
            <h2 className="text-2xl sm:text-3xl font-bold">{courseStats.length}</h2>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        {/* REGION CHART */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="font-bold text-base sm:text-lg mb-4">
            Scholars per Region
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionStats}>
              <XAxis dataKey="region" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#1d4ed8" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* COURSE PIE */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h2 className="font-bold text-base sm:text-lg mb-4">
            Scholars per Course
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={courseStats}
                dataKey="value"
                nameKey="course"
                outerRadius={80} // smaller for mobile
                label
              >
                {courseStats.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  )
}

export default Reports