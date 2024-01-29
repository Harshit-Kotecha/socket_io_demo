const app = require("express")();
const http = require("http").Server(app);

const path = require("path");

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", options);
});

const io = require("socket.io")(http);

let count = 1;

io.on("connection", (socket) => {
  console.log(`new ${count++} connection requested`);
  console.log("Connected successfully");

  socket.on("disconnect", () => {
    console.log("Disconnected");
    count--;
  });

  socket.on("connect_failed", function (socket) {
    console.log(`Connection Failed ${socket}`);
  });
});

http.listen(3000, () => {
  console.log("Server connected on port 3000");
});
