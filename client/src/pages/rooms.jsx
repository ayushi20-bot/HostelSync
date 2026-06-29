import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.get("/rooms");
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          All Rooms
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {rooms.map((room) => {
            const availableBeds = room.capacity - room.occupiedBeds;

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
                    <strong>Occupied Beds:</strong> {room.occupiedBeds}
                  </p>

                  <p>
                    <strong>Available Beds:</strong> {availableBeds}
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

              </div>
            );
          })}

        </div>

      </div>
    </>
  );
}

export default Rooms;