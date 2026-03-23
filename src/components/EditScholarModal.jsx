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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3">

      {/* Modal */}
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div>
            <h3 className="text-lg font-semibold">
              Edit Scholar
            </h3>
            <p className="text-xs text-blue-100">
              Update scholar information details
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            <X size={18}/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">

          {/* Section Title */}
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/** Input Component Style */}
            {[
              { label: "Last Name", name: "lastName" },
              { label: "First Name", name: "firstName" },
              { label: "Middle Initial", name: "middleInitial" },
              { label: "Suffix (Optional)", name: "suffix", placeholder: "Jr., Sr., III" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium text-gray-500">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            ))}

          </div>

          {/* Academic Section */}
          <h4 className="text-sm font-semibold text-gray-700 mt-6 mb-4">
            Academic Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {[
              { label: "Course", name: "course" },
              { label: "Region", name: "region" },
              { label: "Academic Year", name: "year" },
              { label: "Scholar Type", name: "type" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium text-gray-500">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            ))}

          </div>

          {/* Status */}
          <div className="mt-6">
            <label className="text-xs font-medium text-gray-500">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100 outline-none transition"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-red-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition"
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