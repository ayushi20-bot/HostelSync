import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="max-w-xl bg-white rounded-2xl shadow-lg p-8">

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Name</span>
              <span>{user.name}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Email</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Role</span>
              <span>{user.role}</span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;