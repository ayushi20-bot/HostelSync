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

  <div className="min-h-screen bg-slate-100 p-8">

    <h1 className="text-4xl font-bold mb-8">
      Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          My Room
        </h2>

        <p className="text-3xl font-bold mt-2">
          A101
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Complaints
        </h2>

        <p className="text-3xl font-bold mt-2">
          1
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-gray-500 text-sm">
          Account Status
        </h2>

        <p className="text-3xl font-bold mt-2 text-green-600">
          Active
        </p>
      </div>

    </div>

    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-xl font-semibold mb-4">
        Welcome to HostelSync
      </h2>

      <p className="text-gray-600">
        Manage rooms, complaints and hostel activities from one dashboard.
      </p>

    </div>

  </div>
</>
  );
}

export default Dashboard;