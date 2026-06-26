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

  <div>
    <h1>Dashboard</h1>

    <h3>Total Students: {stats.totalStudents}</h3>
    <h3>Total Rooms: {stats.totalRooms}</h3>
    <h3>Occupied Rooms: {stats.occupiedRooms}</h3>
    <h3>Vacant Rooms: {stats.vacantRooms}</h3>
    <h3>Pending Complaints: {stats.pendingComplaints}</h3>
    <h3>Resolved Complaints: {stats.resolvedComplaints}</h3>
  </div>
</>
  );
}

export default Dashboard;