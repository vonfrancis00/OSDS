import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon, color, to }) => {
  const content = (
    <div
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition flex items-center justify-between cursor-pointer"
    >
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

  // If "to" exists → make clickable
  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export default StatCard;