import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js"; // Add the missing semicolon here

import cors from "cors";

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trainer", trainerRoutes); // Add the forward slash before api/trainer

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    // origin: ["https://stayfit.online","https://www.stayfit.online"],
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    console.log("user joined", userData._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("userjoined room", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // socket.on("uservideoCall", ({ to, offer }) => {
  //   io.to(to).emit("incoming:call", { from: socket.id, offer });
  // });

  // socket.on('videoCall',(roomId)=>{
  //    const room=roomId;
     
  // })

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.room;
    if (!chat.user || !chat.trainer) {
      return console.log("chat.users not defined");
    }

    if (chat.user._id === newMessageReceived.sender._id) {
      socket.to(chat.trainer._id).emit("message received", newMessageReceived);
    }

    if (chat.trainer._id === newMessageReceived.sender._id) {
      socket.to(chat.user._id).emit("message received", newMessageReceived);
    }
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
