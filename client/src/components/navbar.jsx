import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        HostelSync
      </h1>

      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/my-room">My Room</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/admin">Admin</Link>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;