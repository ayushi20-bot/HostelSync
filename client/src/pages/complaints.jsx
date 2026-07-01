import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";
import toast from "react-hot-toast";

function Complaints() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async () => {
    try {
      await API.post("/complaints", {
        title,
        description
      });

      setTitle("");
      setDescription("");

      fetchComplaints();

      toast.success("Complaint submitted successfully!");

    } catch (error) {
      console.log(error);
      toast.error("Failed to submit complaint");
    }
  };


  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Complaints
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            Submit a Complaint
          </h2>

          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            placeholder="Complaint Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Submit Complaint
          </button>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          My Complaints
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h3 className="text-xl font-bold mb-3">
                📝 {complaint.title}
              </h3>

              <p className="text-gray-600 mb-5">
                {complaint.description}
              </p>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  complaint.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {complaint.status}
              </span>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Complaints;