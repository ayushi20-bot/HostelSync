import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

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

      alert("Complaint Submitted");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <h1>Complaints</h1>

      <input
        type="text"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Complaint Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Submit Complaint
      </button>

      <hr />

      {complaints.map((complaint) => (
        <div key={complaint._id}>
          <h3>{complaint.title}</h3>
          <p>{complaint.description}</p>
          <p>Status: {complaint.status}</p>
        </div>
      ))}
    </>
  );
}

export default Complaints;