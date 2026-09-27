
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import API from "../services/api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await API.get("/rooms/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchStudents();
  }, []);

  const allocateRoom = async (roomId) => {
    const studentId = selectedStudent[roomId];

    if (!studentId) {
      setMessage("Please select a student.");
      return;
    }

    try {
      const res = await API.put("/rooms/allocate", {
        studentId,
        roomId,
      });

      setMessage(res.data.message);

      // Refresh rooms and available students
      fetchRooms();
      fetchStudents();

      // Clear selected student for this room
      setSelectedStudent((prev) => ({
        ...prev,
        [roomId]: "",
      }));
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Room allocation failed."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          All Rooms
        </h1>

        {message && (
          <div className="mb-6 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room) => {
            const availableBeds =
              room.capacity - room.occupiedBeds;

            return (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <h2 className="text-2xl font-bold mb-4">
                  🛏 Room {room.roomNumber}
                </h2>

                <div className="space-y-2 text-gray-700">

                  <p>
                    <strong>Capacity:</strong> {room.capacity}
                  </p>

                  <p>
                    <strong>Occupied Beds:</strong>{" "}
                    {room.occupiedBeds}
                  </p>

                  <p>
                    <strong>Available Beds:</strong>{" "}
                    {availableBeds}
                  </p>

                </div>

                <div className="mt-6">
                  {availableBeds > 0 ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Full
                    </span>
                  )}
                </div>

                {/* Room Allocation */}
                {availableBeds > 0 && (
                  <div className="mt-6 border-t pt-5">

                    <label className="block font-semibold mb-2">
                      Allocate Student
                    </label>

                    <select
                      value={selectedStudent[room._id] || ""}
                      onChange={(e) =>
                        setSelectedStudent((prev) => ({
                          ...prev,
                          [room._id]: e.target.value,
                        }))
                      }
                      className="w-full border rounded-lg p-3 mb-3 bg-white"
                    >

                      <option value="">
                        Select Student
                      </option>

                      {students.map((student) => (
                        <option
                          key={student._id}
                          value={student._id}
                        >
                          {student.name} ({student.email})
                        </option>
                      ))}

                    </select>

                    <button
                      onClick={() => allocateRoom(room._id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Allocate Room
                    </button>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </>
  );
}

export default Rooms;

