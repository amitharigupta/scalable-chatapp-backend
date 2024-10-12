import { Server } from "socket.io";

export function setupSocket (io: Server) {
    io.on('connection', (socket) => {
        console.log('The socket connected', socket.id);
        
        socket.on('message', (data) => {
            console.log('Server side message');
            socket.broadcast.emit('message', 'Hello, from server!', data);
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        socket.on('chat message', (msg) => {
            console.log(`Message received: ${msg}`);
            io.emit('chat message', msg);
        });
    });
}