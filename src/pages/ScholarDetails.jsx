import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import MainLayout from "../layout/MainLayout"
import EditScholarModal from "../components/EditScholarModal"

const scholarsData = [
{
id: 1,
lastName: "Dela Cruz",
firstName: "Juan",
middleInitial: "D",
suffix: "",
region: "NCR",
course: "BS Information Technology",
year: "2023-2024",
type: "Full Scholarship",
status: "Active",
},
{
id: 2,
lastName: "Santos",
firstName: "Maria",
middleInitial: "A",
suffix: "",
region: "Region IV-A",
course: "BS Computer Science",
year: "2024-2025",
type: "Partial Scholarship",
status: "Active",
},
]

const ScholarDetails = () => {

const { id } = useParams()
const navigate = useNavigate()

const [isEditOpen, setIsEditOpen] = useState(false)

const student = scholarsData.find(
(s) => s.id === parseInt(id)
)

if (!student) {
return <div>Scholar not found</div>
}

return (
<MainLayout>

<h2 className="text-3xl font-bold mb-6">
Scholar Details
</h2>

{/* Return Button */}
<div className="mb-6">
<button
onClick={() => navigate("/scholars")}
className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
>
← Return to Scholars List
</button>
</div>

{/* Statistics */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Allowance Received</p>
<h3 className="text-2xl font-bold mt-2 text-blue-600">₱45,000</h3>
</div>

<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Semesters Completed</p>
<h3 className="text-2xl font-bold mt-2 text-green-600">6</h3>
</div>

<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500 text-sm">Remaining Semesters</p>
<h3 className="text-2xl font-bold mt-2 text-yellow-500">2</h3>
</div>

</div>

{/* Profile Card */}
<div className="bg-white rounded-xl shadow p-6 mb-6 relative">

<div className="absolute top-6 right-6">
<button
onClick={() => setIsEditOpen(true)}
className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition"
>
Edit Scholar
</button>
</div>

{/* Full Name Header */}
<h3 className="text-xl font-semibold mb-6">
{student.lastName}, {student.firstName} {student.middleInitial}.
{student.suffix && ` ${student.suffix}`}
</h3>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div>
<img
src={`https://i.pravatar.cc/300?img=${student.id}`}
className="w-full h-64 object-cover rounded-lg"
/>
</div>

<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

<div>
<p className="text-gray-500 text-sm">Last Name</p>
<p className="font-medium">{student.lastName}</p>
</div>

<div>
<p className="text-gray-500 text-sm">First Name</p>
<p className="font-medium">{student.firstName}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Middle Initial</p>
<p className="font-medium">{student.middleInitial}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Suffix</p>
<p className="font-medium">{student.suffix || "N/A"}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Course</p>
<p className="font-medium">{student.course}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Region</p>
<p className="font-medium">{student.region}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Academic Year</p>
<p className="font-medium">{student.year}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Scholar Type</p>
<p className="font-medium">{student.type}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Status</p>

<span
className={`px-3 py-1 text-xs rounded-full font-medium
${
student.status === "Active"
? "bg-green-100 text-green-600"
: "bg-yellow-100 text-yellow-600"
}`}
>
{student.status}
</span>

</div>

</div>

</div>

</div>

{/* Timeline */}
<div className="bg-white rounded-xl shadow p-6">

<h3 className="text-xl font-semibold mb-8">
Scholarship Progress Tracking
</h3>

<div className="relative">

<div className="absolute top-5 left-0 w-full h-1 bg-gray-300"></div>

<div className="flex justify-between relative">

<div className="flex flex-col items-center text-center w-1/4">
<div className="w-10 h-10 bg-blue-900 rounded-full border-4 border-white"></div>
<h4 className="font-semibold mt-4">1st Year</h4>
<span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-1">
Completed
</span>
</div>

<div className="flex flex-col items-center text-center w-1/4">
<div className="w-10 h-10 bg-blue-900 rounded-full border-4 border-white"></div>
<h4 className="font-semibold mt-4">2nd Year</h4>
<span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-1">
Completed
</span>
</div>

<div className="flex flex-col items-center text-center w-1/4">
<div className="w-10 h-10 bg-blue-900 rounded-full border-4 border-white"></div>
<h4 className="font-semibold mt-4">3rd Year</h4>
<span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded mt-1">
Ongoing
</span>
</div>

<div className="flex flex-col items-center text-center w-1/4">
<div className="w-10 h-10 bg-gray-300 rounded-full border-4 border-white"></div>
<h4 className="font-semibold mt-4 text-gray-400">4th Year</h4>
<span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded mt-1">
Pending
</span>
</div>

</div>

</div>

</div>

{isEditOpen && (
<EditScholarModal
student={student}
onClose={() => setIsEditOpen(false)}
/>
)}

</MainLayout>
)
}

export default ScholarDetails