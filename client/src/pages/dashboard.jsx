import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        console.log(res.data);

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
  <Navbar />

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Total Students
    </h2>

    <p className="text-3xl font-bold mt-2">
      {stats.totalStudents}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Total Rooms
    </h2>

    <p className="text-3xl font-bold mt-2">
      {stats.totalRooms}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Occupied Rooms
    </h2>

    <p className="text-3xl font-bold mt-2">
      {stats.occupiedRooms}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Vacant Rooms
    </h2>

    <p className="text-3xl font-bold mt-2">
      {stats.vacantRooms}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Pending Complaints
    </h2>

    <p className="text-3xl font-bold mt-2 text-yellow-600">
      {stats.pendingComplaints}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-gray-500 text-sm">
      Resolved Complaints
    </h2>

    <p className="text-3xl font-bold mt-2 text-green-600">
      {stats.resolvedComplaints}
    </p>
  </div>

</div>
</>
  );
}

export default Dashboard;