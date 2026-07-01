import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBed,
  FaExclamationCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },

    ...(role === "admin"
      ? [{ name: "Rooms", path: "/rooms", icon: <FaBed /> }]
      : [{ name: "My Room", path: "/my-room", icon: <FaBed /> }]),

    {
      name: "Complaints",
      path: "/complaints",
      icon: <FaExclamationCircle />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white shadow-xl">

      <div className="text-3xl font-bold text-center py-8 border-b border-slate-700">
        HostelSync
      </div>

      <div className="mt-6 flex flex-col">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-8 py-4 transition
            ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

        <button
          onClick={logout}
          className="flex items-center gap-3 px-8 py-4 mt-auto text-left hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;