import { Server, Socket } from "socket.io";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }

    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {

    socket.join(socket.room);

    console.log("The socket connected", socket.id);

    socket.on("message", (data) => {
      console.log("Server side message");
      io.to(socket.room).emit("message", data);
    //   socket.broadcast.emit("message", "Hello, from server!", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("chat message", (msg) => {
      console.log(`Message received: ${msg}`);
      io.emit("chat message", msg);
    });
  });
}
