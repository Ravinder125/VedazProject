import { Routes, Route } from "react-router-dom";
import Experts from "./pages/Experts";
import ExpertDetail from "./pages/ExpertDetail";
import MyBookings from "./pages/MyBookings";
import BookingForm from "./pages/BookingForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Experts />} />
      <Route path="/experts/:id" element={<ExpertDetail />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/bookings" element={<BookingForm />} />
    </Routes>
  );
}

export default App;