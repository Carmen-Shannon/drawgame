// import Player from "./models/Player.js";
// import Room from "./models/RoomList.js";
const { rooms } = require("./models/Rooms");
const {
  roomConnect,
  requestNames,
  addName,
  removeName,
  requestRooms,
  onRoomExit,
  disconnectHandler,
  requestPlayers,
  handleDrawEvent,
  handleFinishDraw,
  handleClearCanvas,
  isRoomFull,
  handleAddMessage,
} = require("./controllers/SocketHandler");
const NL = require("./models/NameList");
const http = require("http").createServer();
const server = require("socket.io")(http, {
  cors: { origin: "*" },
});
const roomList = new rooms();
const nameList = new NL();
const timerList = new Map();

server.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);
  server.emit("newroom", roomList.toJson());
  socket.join(socket.id);
  socket.join("lobby");

  requestPlayers(socket, roomList);

  onRoomExit(socket, roomList, server);

  requestRooms(socket, roomList);

  addName(socket, nameList);

  removeName(socket, nameList);

  requestNames(socket, nameList, server);

  roomConnect(roomList, socket, server);

  disconnectHandler(socket, roomList, nameList, server);

  handleDrawEvent(socket, roomList, server);

  handleFinishDraw(socket, roomList, server);

  handleClearCanvas(socket, roomList, server);

  isRoomFull(socket, roomList);

  handleAddMessage(socket, roomList, timerList, server);
});

http.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
