const io = require("socket.io")(3005, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("room:join", (streamId) => {
    socket.join(streamId);
    console.log(`User ${socket.id} joined stream ${streamId}`);

    const users = io.sockets.adapter.rooms.get(streamId);
    if (users && users.size > 1) {
      const streamerId = [...users][0]; // First user in the room is the streamer
      io.to(streamerId).emit("room:listener-joined", socket.id);
      io.to(socket.id).emit("room:streamer-connected", streamerId);
    }
  });

  socket.on("peer:signal", (targetId, data) => {
    socket.to(targetId).emit("peer:signal", socket.id, data);
    console.log(`Signal from ${socket.id} to ${targetId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

console.log("Socket.IO server running on port 3005");
