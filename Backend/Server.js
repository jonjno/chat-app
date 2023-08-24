import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import { notFound, errorHandler } from "./middileware/errorMiddileware.js";
import { resolve, join } from "path";
import { Server } from "socket.io";
const app = express();
app.use(json());

config();
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const __dirname1 = resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname1, "/frontend/build")));
  console.log("wow");
  app.get("*", (req, res) => {
    console.log(__dirname1);
    res.sendFile(resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server listening to  ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("conected to socket.io");

  socket.on("setup", (user) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinchat", (room) => {
    socket.join(room);
    console.log("user Joined Room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.user) return;
    console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.ender._id) return;

      socket.in(user._id).emit("messagereceived ", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
