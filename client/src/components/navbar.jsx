import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <h1 className="text-2xl font-bold text-white">
          🏠 HostelSync
        </h1>

        <div className="flex items-center gap-3">

          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/rooms" className={linkStyle("/rooms")}>
            Rooms
          </Link>

          <Link to="/my-room" className={linkStyle("/my-room")}>
            My Room
          </Link>

          <Link to="/complaints" className={linkStyle("/complaints")}>
            Complaints
          </Link>

          <Link to="/admin" className={linkStyle("/admin")}>
            Admin
          </Link>

          <Link
            to="/profile"
            className={linkStyle("/profile")}
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;