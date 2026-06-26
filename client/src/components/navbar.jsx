import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/rooms">Rooms</Link> |{" "}
      <Link to="/my-room">My Room</Link> |{" "}
      <Link to="/complaints">Complaints</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;