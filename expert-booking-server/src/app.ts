import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import expertRoutes from "./routes/expert.routes";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors({ origin: ENV.CLIENT_URL }));
app.use(express.json());

app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

export default app;