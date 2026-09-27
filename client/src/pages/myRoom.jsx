import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";

function MyRoom() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRoom = async () => {
      try {
        const res = await API.get("/users/my-room");
        console.log(res.data);
        setRoom(res.data);
      } catch (error) {
        console.log(error);

        if (error.response?.status === 404) {
          setRoom({ room: null });
        } else {
          setError("Unable to load room details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyRoom();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="ml-64 min-h-screen bg-slate-100 flex items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Loading room details...
          </h2>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="ml-64 min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-600">
              {error}
            </h2>
          </div>
        </div>
      </>
    );
  }

  if (!room || !room.room) {
    return (
      <>
        <Navbar />

        <div className="ml-64 min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">
              🛏️
            </div>

            <h2 className="text-2xl font-bold mb-2">
              No Room Assigned
            </h2>

            <p className="text-gray-600">
              You have not been assigned a room yet.
            </p>
          </div>
        </div>
      </>
    );
  }

  const availableBeds =
    room.room.capacity - room.room.occupiedBeds;

  return (
    <>
      <Navbar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Room
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome,{" "}
          <span className="font-semibold">
            {room.studentName}
          </span>
        </p>

        <div className="max-w-xl">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              🛏️ Room Details
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Room Number
                </span>

                <span>
                  {room.room.roomNumber}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Capacity
                </span>

                <span>
                  {room.room.capacity}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">
                  Occupied Beds
                </span>

                <span>
                  {room.room.occupiedBeds}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Available Beds
                </span>

                <span>
                  {availableBeds}
                </span>
              </div>

            </div>

            <div className="mt-6">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Room Allocated
              </span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default MyRoom;

