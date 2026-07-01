import {
  FaUsers,
  FaBed,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";
import Loading from "../components/Loading";

function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 text-white ${color}
      hover:scale-105 transition duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg">{title}</h2>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({});
  const [myRoom, setMyRoom] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [role]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">
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

            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              icon={<FaUsers />}
              color="bg-blue-600"
            />

            <StatCard
              title="Total Rooms"
              value={stats.totalRooms}
              icon={<FaBed />}
              color="bg-purple-600"
            />

            <StatCard
              title="Occupied Rooms"
              value={stats.occupiedRooms}
              icon={<FaBed />}
              color="bg-green-600"
            />

            <StatCard
              title="Vacant Rooms"
              value={stats.vacantRooms}
              icon={<FaBed />}
              color="bg-indigo-600"
            />

            <StatCard
              title="Pending Complaints"
              value={stats.pendingComplaints}
              icon={<FaExclamationTriangle />}
              color="bg-yellow-500"
            />

            <StatCard
              title="Resolved Complaints"
              value={stats.resolvedComplaints}
              icon={<FaCheckCircle />}
              color="bg-emerald-600"
            />

          </div>

        )}

        {/* STUDENT DASHBOARD */}
        {role === "student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
              title="My Room"
              value={myRoom?.room?.roomNumber || "N/A"}
              icon={<FaBed />}
              color="bg-blue-600"
            />

            <StatCard
              title="Complaints"
              value={myComplaints.length}
              icon={<FaExclamationTriangle />}
              color="bg-purple-600"
            />

            <StatCard
              title="Pending"
              value={myComplaints.filter(c => c.status === "pending").length}
              icon={<FaExclamationTriangle />}
              color="bg-yellow-500"
            />

            <StatCard
              title="Resolved"
              value={myComplaints.filter(c => c.status === "resolved").length}
              icon={<FaCheckCircle />}
              color="bg-green-600"
            />

          </div>

        )}

          <p className="text-gray-600">
            {role === "admin"
              ? "Monitor rooms, students, and complaints from one central dashboard."
              : "View your room details, track complaints, and stay updated with your hostel information."}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6">
              Complaint Status
            </h2>

            <Pie
              data={{
                labels: ["Pending", "Resolved"],
                datasets: [
                  {
                    data: [
                      role === "admin"
                        ? stats.pendingComplaints
                        : myComplaints.filter(
                            c => c.status === "pending"
                          ).length,

                      role === "admin"
                        ? stats.resolvedComplaints
                        : myComplaints.filter(
                            c => c.status === "resolved"
                          ).length,
                    ],
                  },
                ],
              }}
            />

          </div>

        </div>
        <div className="mt-8">
        
        {role === "admin" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-xl font-bold mb-6">
                Room Occupancy
              </h2>

              <Bar
                data={{
                  labels: ["Occupied", "Vacant"],
                  datasets: [
                    {
                      label: "Rooms",
                      data: [
                        stats.occupiedRooms,
                        stats.vacantRooms,
                      ],
                    },
                  ],
                }}
              />

            </div>
          )}
          </div>

      </div>
    </>
  );
}

export default Dashboard;