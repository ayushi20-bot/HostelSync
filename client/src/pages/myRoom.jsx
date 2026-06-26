import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function MyRoom() {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchMyRoom = async () => {
      try {
        const res = await API.get("/users/my-room");
        console.log(res.data);
        setRoom(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyRoom();
  }, []);

  return (
    <>
      <Navbar />

      <h1>My Room</h1>

      {room ? (
        <div>
          <h3>Student: {room.studentName}</h3>
            <h3>Room Number: {room.room.roomNumber}</h3>
            <p>Capacity: {room.room.capacity}</p>
            <p>Occupied Beds: {room.room.occupiedBeds}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default MyRoom;