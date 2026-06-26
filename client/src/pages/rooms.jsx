import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

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

      <h1>Rooms</h1>

      {rooms.map((room) => (
        <div key={room._id}>
          <h3>Room {room.roomNumber}</h3>
          <p>Capacity: {room.capacity}</p>
          <p>Occupied Beds: {room.occupiedBeds}</p>
        </div>
      ))}
    </>
  );
}

export default Rooms;