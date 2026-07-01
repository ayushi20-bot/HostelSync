import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Rooms from "./pages/rooms";
import MyRoom from "./pages/myRoom";
import Complaints from "./pages/complaints";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-room"
          element={
            <ProtectedRoute>
              <MyRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;