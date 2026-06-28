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

    fetchComplaints();
  }, []);

  return (
    <>
      <Navbar />

      <h1>Admin Dashboard</h1>

      <h2>All Complaints</h2>

      {complaints.map((complaint) => (
        <div key={complaint._id}>
            <h3>{complaint.title}</h3>

            <p>{complaint.description}</p>

            <p>
            Student: {complaint.student?.name}
            </p>

            <p>
            Room: {complaint.room?.roomNumber}
            </p>

            <p>
            Status: {complaint.status}
            </p>

            <hr />
        </div>
        ))}
    </>
  );
}

export default AdminDashboard;