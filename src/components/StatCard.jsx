const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between">

      <div>
        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-2">
          {value}
        </p>
      </div>

      <div className={`p-3 rounded-lg text-white ${color}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatCard;