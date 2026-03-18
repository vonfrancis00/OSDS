import MainLayout from "../layout/MainLayout"
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
    <MainLayout>

      <div className="p-6 space-y-8">

        {/* Page Title */}
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-700" size={32}/>
          <h1 className="text-3xl font-bold">Scholarship Reports</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
            <Users className="text-blue-600" size={40}/>
            <div>
              <p className="text-gray-500">Total Scholars</p>
              <h2 className="text-3xl font-bold">{totalScholars}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
            <Map className="text-green-600" size={40}/>
            <div>
              <p className="text-gray-500">Regions</p>
              <h2 className="text-3xl font-bold">{regionStats.length}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
            <GraduationCap className="text-purple-600" size={40}/>
            <div>
              <p className="text-gray-500">Courses</p>
              <h2 className="text-3xl font-bold">{courseStats.length}</h2>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Region Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-4">Scholars per Region</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionStats}>
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1d4ed8" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>


          {/* Course Pie Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-lg mb-4">Scholars per Course</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseStats}
                  dataKey="value"
                  nameKey="course"
                  outerRadius={110}
                  label
                >
                  {courseStats.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default Reports