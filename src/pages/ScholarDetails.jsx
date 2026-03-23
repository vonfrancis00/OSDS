import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditScholarModal from "../components/EditScholarModal";

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
];

const ScholarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const student = scholarsData.find((s) => s.id === Number(id));

  if (!student) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Scholar not found</h2>
        <button
          onClick={() => navigate("/scholars")}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          Scholar Details
        </h2>
      </div>

      {/* RETURN BUTTON */}
      <button
        onClick={() => navigate("/scholars")}
        className="w-full sm:w-auto bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Return to Scholars List
      </button>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        <Stat title="Allowance Received" value="₱45,000" color="text-blue-600" />
        <Stat title="Semesters Completed" value="6" color="text-green-600" />
        <Stat title="Remaining Semesters" value="2" color="text-yellow-500" />

      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 relative">

        {/* EDIT BUTTON */}
        <div className="sm:absolute sm:top-6 sm:right-6 mb-4 sm:mb-0">
          <button
            onClick={() => setIsEditOpen(true)}
            className="w-full sm:w-auto bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800"
          >
            Edit Scholar
          </button>
        </div>

        {/* NAME */}
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 break-words">
          {student.lastName}, {student.firstName} {student.middleInitial}.
          {student.suffix && ` ${student.suffix}`}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* IMAGE */}
          <div>
            <img
              src={`https://i.pravatar.cc/300?img=${student.id}`}
              className="w-full h-52 sm:h-64 object-cover rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            <Info label="Last Name" value={student.lastName} />
            <Info label="First Name" value={student.firstName} />
            <Info label="Middle Initial" value={student.middleInitial} />
            <Info label="Suffix" value={student.suffix || "N/A"} />
            <Info label="Course" value={student.course} />
            <Info label="Region" value={student.region} />
            <Info label="Academic Year" value={student.year} />
            <Info label="Scholar Type" value={student.type} />

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${
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

      {/* TIMELINE */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">

        <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
          Scholarship Progress Tracking
        </h3>

        <div className="min-w-[500px] relative">

          <div className="absolute top-5 left-0 w-full h-1 bg-gray-300"></div>

          <div className="flex justify-between relative">

            {[
              { label: "1st Year", status: "Completed" },
              { label: "2nd Year", status: "Completed" },
              { label: "3rd Year", status: "Ongoing" },
              { label: "4th Year", status: "Pending" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center w-1/4 text-center">

                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white ${
                    i < 3 ? "bg-blue-900" : "bg-gray-300"
                  }`}
                />

                <h4 className="font-semibold mt-3 text-xs sm:text-sm">
                  {item.label}
                </h4>

                <span className={`text-[10px] sm:text-xs px-2 py-1 rounded mt-1
                  ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Ongoing"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-200 text-gray-500"
                  }
                `}>
                  {item.status}
                </span>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* MODAL */}
      {isEditOpen && (
        <EditScholarModal
          student={student}
          onClose={() => setIsEditOpen(false)}
        />
      )}

    </div>
  );
};

/* COMPONENTS */
const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
    <p className="font-medium text-sm sm:text-base break-words">{value}</p>
  </div>
);

const Stat = ({ title, value, color }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
    <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
    <h3 className={`text-xl sm:text-2xl font-bold mt-2 ${color}`}>
      {value}
    </h3>
  </div>
);

export default ScholarDetails;