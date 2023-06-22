import { Server } from "socket.io";

const io = new Server({ cors: { origin: ["http://localhost:5500"] } });

io.on("connection", socket => {
  let roomId: string;

  socket.on("conversationId", conversationId => {
    roomId = conversationId;
    socket.join(roomId);
  });

  socket.on("new-message", message => {
    if (!roomId) {
      return;
    }

    socket.to(roomId).emit("new-message", message);
  });
});

export default io;
