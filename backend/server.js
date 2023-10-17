import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js"; // Add the missing semicolon here

import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes); // Add the forward slash before api/trainer

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
