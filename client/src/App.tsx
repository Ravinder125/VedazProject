import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "./components/Loading";

/* Lazy loaded pages */
const Experts = lazy(() => import("./pages/Experts"));
const ExpertDetail = lazy(() => import("./pages/ExpertDetail"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const BookingForm = lazy(() => import("./pages/BookingForm"));

function App() {
  return (
    <Suspense
      fallback={<Loading />}
    >
      <Routes>
        <Route path="/" element={<Experts />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bookings" element={<BookingForm />} />
      </Routes>
    </Suspense>
  );
}

export default App;