const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let interval;
let j = 100;

const getApiAndEmit = socket => {
    const arr = [];

    for(let i=1; i <= 90; i++) {
        j++;
        arr.push({
            id: j,
            user: `user_${j}`,
            time: Date.now(),
            bet: 0.00253,
            multiplier: "X10",
            game: ">50.999"
        });
    }

    socket.emit("bets", arr);
};

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("initialBets", Array(100).fill().map((val, index) => ({
        id: index + 1,
        user: `user_${index + 1}`,
        time: Date.now(),
        bet: 0.00253,
        multiplier: "X10",
        game: ">50.999"
    })));

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => getApiAndEmit(socket), 3000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));