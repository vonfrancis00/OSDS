import { X, Mail, Shield, Activity, User as UserIcon } from "lucide-react";

const UserDetailModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  const statusColor =
    user.status === "inactive"
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  const roleColor =
    user.role === "superadmin"
      ? "bg-purple-100 text-purple-700"
      : user.role === "admin"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* MODAL */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* HEADER */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 px-6 pt-6 pb-10 text-white">
          
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* AVATAR */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold shadow-md">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-3 text-lg font-semibold">
              {user.firstName || "User"} {user.lastName || ""}
            </h2>

            <p className="text-xs text-blue-100">
              {user.email}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-5">

          {/* ROLE + STATUS */}
          <div className="flex justify-between gap-3">
            <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium ${roleColor}`}>
              <Shield size={16} />
              {user.role}
            </div>

            <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium ${statusColor}`}>
              <Activity size={16} />
              {user.status || "active"}
            </div>
          </div>

          {/* INFO CARD */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-4">

            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserIcon className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <p className="text-sm font-medium text-gray-800">
                  {user._id}
                </p>
              </div>
            </div>

            {/* OPTIONAL FIELDS */}
            {user.firstName && (
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">First Name</span>
                <span className="text-sm font-medium text-gray-800">
                  {user.firstName}
                </span>
              </div>
            )}

            {user.lastName && (
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Last Name</span>
                <span className="text-sm font-medium text-gray-800">
                  {user.lastName}
                </span>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDetailModal;