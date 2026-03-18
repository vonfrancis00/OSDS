import { useState } from "react"
import { X, Save } from "lucide-react"

const EditScholarModal = ({ student, onClose }) => {

const [formData, setFormData] = useState({
lastName: student.lastName,
firstName: student.firstName,
middleInitial: student.middleInitial,
suffix: student.suffix,
course: student.course,
region: student.region,
year: student.year,
type: student.type,
status: student.status
})

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
})
}

const handleSubmit = (e) => {
e.preventDefault()
console.log("Updated Scholar:", formData)
onClose()
}

return (

<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

{/* Header */}
<div className="flex items-center justify-between border-b px-6 py-4">

<h3 className="text-lg font-semibold text-gray-800">
Edit Scholar Information
</h3>

<button
onClick={onClose}
className="text-gray-500 hover:text-red-500 transition"
>
<X size={20}/>
</button>

</div>

{/* Form */}
<form onSubmit={handleSubmit} className="p-6">

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

{/* Last Name */}
<div>
<label className="text-sm font-medium text-gray-600">
Last Name
</label>
<input
name="lastName"
value={formData.lastName}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* First Name */}
<div>
<label className="text-sm font-medium text-gray-600">
First Name
</label>
<input
name="firstName"
value={formData.firstName}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Middle Initial */}
<div>
<label className="text-sm font-medium text-gray-600">
Middle Initial
</label>
<input
name="middleInitial"
value={formData.middleInitial}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Suffix */}
<div>
<label className="text-sm font-medium text-gray-600">
Suffix (Optional)
</label>
<input
name="suffix"
value={formData.suffix}
onChange={handleChange}
placeholder="Jr., Sr., III"
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Course */}
<div>
<label className="text-sm font-medium text-gray-600">
Course
</label>
<input
name="course"
value={formData.course}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Region */}
<div>
<label className="text-sm font-medium text-gray-600">
Region
</label>
<input
name="region"
value={formData.region}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Academic Year */}
<div>
<label className="text-sm font-medium text-gray-600">
Academic Year
</label>
<input
name="year"
value={formData.year}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Scholar Type */}
<div>
<label className="text-sm font-medium text-gray-600">
Scholar Type
</label>
<input
name="type"
value={formData.type}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
/>
</div>

{/* Status */}
<div className="col-span-2">
<label className="text-sm font-medium text-gray-600">
Status
</label>

<select
name="status"
value={formData.status}
onChange={handleChange}
className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
>
<option>Active</option>
<option>Inactive</option>
</select>

</div>

</div>

{/* Buttons */}
<div className="flex justify-end gap-3 mt-8 border-t pt-4">

<button
type="button"
onClick={onClose}
className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-red-500 transition"
>
Cancel
</button>

<button
type="submit"
className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
>
<Save size={16}/>
Save Changes
</button>

</div>

</form>

</div>

</div>

)

}

export default EditScholarModal