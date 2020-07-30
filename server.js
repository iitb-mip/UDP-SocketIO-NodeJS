var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

app.get("/", (req, res) => {
  console.log("here");
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function doStuff() {}

http.listen(3000, () => {
  console.log("listening on *:3000");
});

server.on("listening", function () {
  var address = server.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});

server.on("message", function (message, remote) {
  message = message.toString();
  io.sockets.emit("message", message);
});
// echo "hi" | nc -w1 -u 127.0.0.1 5000

server.bind(5000);
