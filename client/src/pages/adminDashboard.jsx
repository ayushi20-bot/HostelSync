import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints");
        setComplaints(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const updateStatus = async (id, status) => {
      try {
        await API.put(`/complaints/${id}`, {
          status,
        });

        const res = await API.get("/complaints");
        setComplaints(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
  }, []);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "resolved"
  ).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Total Complaints</p>
            <h2 className="text-4xl font-bold">{totalComplaints}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-4xl font-bold text-yellow-600">
              {pendingComplaints}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Resolved</p>
            <h2 className="text-4xl font-bold text-green-600">
              {resolvedComplaints}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Student</th>

                <th className="p-4 text-left">Room</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {complaints.map((complaint) => (

                <tr
                  key={complaint._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">
                    {complaint.title}
                  </td>

                  <td className="p-4">
                    {complaint.student?.name}
                  </td>

                  <td className="p-4">
                    {complaint.room?.roomNumber}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        complaint.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {complaint.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <select
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>

                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;