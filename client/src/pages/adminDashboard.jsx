import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import API from "../services/api";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, {
        status,
      });

      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (c) => c.status === "pending"
  ).length;

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "resolved"
  ).length;

  // Search + status filter
  const filteredComplaints = complaints.filter((complaint) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      complaint.title?.toLowerCase().includes(searchText) ||
      complaint.student?.name?.toLowerCase().includes(searchText) ||
      complaint.room?.roomNumber?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="🔍 Search by title, student or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border rounded-lg p-3 shadow-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg p-3 shadow-sm bg-white"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

        </div>

        {/* Complaint Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Total Complaints</p>
            <h2 className="text-4xl font-bold">
              {totalComplaints}
            </h2>
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

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">
              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Room
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredComplaints.map((complaint) => (

                <tr
                  key={complaint._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">
                    {complaint.title}
                  </td>

                  <td className="p-4">
                    {complaint.student?.name || "N/A"}
                  </td>

                  <td className="p-4">
                    {complaint.room?.roomNumber || "N/A"}
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

              {filteredComplaints.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-500"
                  >
                    No complaints found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;