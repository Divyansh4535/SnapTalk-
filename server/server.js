import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"; // Importing CORS middleware

const port = 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello DK! ");
});

const user = true;
io.use((socket, next) => {
  if (user) next();
});

io.on("connection", (socket) => {
  console.log("New client connected with ID:", socket.id);
  // socket.emit("welcome", `Welcome to the server, your socket id is ${socket.id}`);
  // socket.broadcast.emit("welcome", `${socket.id} joined the server`); //like a left the whatsapp group

  socket.on("message", ({ roomId, message }) => {
    console.log("MyMsg :", { roomId, message });
    // io.emit("receive-message",message)  // all socket ko show hoga
    // socket.emit("receive-message",data)
    // socket.broadcast.emit("receive-message",data)   // jo send krega uske alava sab ko show hoga
    io.to(roomId).emit("receive-message", roomId, message); // only room id wale   ko show hoga
  });
  //   socket.on("join-room", (roomName) => {
  //     socket.join(roomName);
  //     console.log(`User joined room ${roomName}`);
  //   });


  // Socket.IO Event Handlers

  // Join room based on user's ID
  if (socket.user) {
    socket.join(socket.user.id);
    console.log(`User joined room: ${socket.user.id}`);
  }

  // Listen for sendMessage
  socket.on("sendMessage", async (messageData) => {
    try {
      const { receiverId, message } = messageData;

      io.to(receiverId).emit("receiveMessage", {
        senderId: socket.user.id,
        receiverId,
        message,
        // timestamp: newMessage.createdAt,
      });

      // console.log("Message sent:", newMessage);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// import express from "express";
// import { Server } from "socket.io";
// import { createServer } from "http";
// import cors from "cors";

// const port = 3000;
// const app = express();

// app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

// const server = createServer(app);

// const io = new Server(server, {
//   cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
// });

// app.get("/", (req, res) => res.send("Hello Chat!"));

// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   socket.on("join-room", (roomName) => {
//     socket.join(roomName);
//     console.log(`User joined room: ${roomName}`);
//   });

//   socket.on("message", ({ roomId, message }) => {
//     io.to(roomId).emit("receive-message", roomId, message);
//     console.log(`Message in room ${roomId}: ${message}`);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// server.listen(port, () => console.log(`Server running on port ${port}`));
