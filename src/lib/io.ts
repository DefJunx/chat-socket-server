import { Server } from "socket.io";

const io = new Server({ cors: { origin: ["http://localhost:5500"] } });

io.on("connection", socket => {
  console.log(`connected from ${socket.conn.remoteAddress}`);
  let roomId = "";

  socket.on("conversationId", conversationId => {
    console.log("conversationId", conversationId);
    roomId = conversationId;
    socket.join(roomId);
  });

  socket.on("new-message", message => {
    console.log("new message", message);
    console.log(roomId);

    socket.to(roomId).emit("new-message", message);
  });
});

export default io;
