import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [myRoom, setMyRoom] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (role === "admin") {
          const res = await API.get("/dashboard/stats");
          setStats(res.data);
        } else {
          const roomRes = await API.get("/users/my-room");
          setMyRoom(roomRes.data);

          const complaintRes = await API.get("/complaints/my");
          setMyComplaints(complaintRes.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, [role]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-2">
          Welcome, {name} 👋
        </h1>

        <p className="text-gray-600 mb-8">
          {role === "admin"
            ? "Manage your hostel efficiently."
            : "Manage your room and complaints."}
        </p>

        {/* ADMIN DASHBOARD */}
        {role === "admin" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Total Students</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.totalStudents}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Total Rooms</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.totalRooms}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Occupied Rooms</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.occupiedRooms}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Vacant Rooms</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.vacantRooms}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Pending Complaints</h2>
              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {stats.pendingComplaints}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Resolved Complaints</h2>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {stats.resolvedComplaints}
              </p>
            </div>

          </div>
        )}

        {/* STUDENT DASHBOARD */}
        {role === "student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">My Room</h2>
              <p className="text-4xl font-bold mt-2">
                {myRoom?.room?.roomNumber || "Not Assigned"}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">My Complaints</h2>
              <p className="text-4xl font-bold mt-2">
                {myComplaints.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Pending</h2>
              <p className="text-4xl font-bold text-yellow-600 mt-2">
                {
                  myComplaints.filter(
                    (c) => c.status === "pending"
                  ).length
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">Resolved</h2>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {
                  myComplaints.filter(
                    (c) => c.status === "resolved"
                  ).length
                }
              </p>
            </div>

          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-3">
            HostelSync
          </h2>

          <p className="text-gray-600">
            {role === "admin"
              ? "Monitor rooms, students, and complaints from one central dashboard."
              : "View your room details, track complaints, and stay updated with your hostel information."}
          </p>
        </div>

      </div>
    </>
  );
}

export default Dashboard;