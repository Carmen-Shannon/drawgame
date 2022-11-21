const { Room } = require("../models/RoomList");
const { Player } = require("../models/Player");
const Timer = require("../models/Timer");

const handleAddMessage = (socket, roomList, timerList, server) => {
  socket.on("newmessage", (message) => {
    let rn = roomList.findRoomName(socket.id);
    if (!rn) {
      return;
    }
    if (timerList.has(socket.id)) {
      server.to(rn).emit("removemessage", socket.id);
      timerList.get(socket.id).stop();
      timerList.delete(socket.id);
    }
    const msgTimer = new Timer(server, 3);
    msgTimer.start(rn, "removemessage", socket.id);
    timerList.set(socket.id, msgTimer);
    server.to(rn).emit("showmessage", message, socket.id);
  });
};

const handleClearCanvas = (socket, roomList, server) => {
  socket.on("clear", () => {
    let roomName = roomList.findRoomName(socket.id);
    server.to(roomName).emit("clearboard");
  });
};

const handleFinishDraw = (socket, roomList, server) => {
  socket.on("finishdraw", () => {
    let roomName = roomList.findRoomName(socket.id);
    server.to(roomName).emit("finishdrawclient");
  });
};

const handleDrawEvent = (socket, roomList, server) => {
  socket.on("draw", (coordObj) => {
    let roomName = roomList.findRoomName(socket.id);
    server.to(roomName).emit("updatecanvas", coordObj);
  });
};

const disconnectHandler = (socket, roomList, nameList, server) => {
  socket.on("disconnect", () => {
    nameList.removeName(socket.id);
    roomList.forEach((val, key) => {
      if (val.players.has(socket.id)) {
        let roomName = val.name;
        roomList.get(roomName).players.removePlayer(socket.id);
        if (roomList.get(roomName).players.size === 0) {
          roomList.delete(roomName);
        } else {
          server.to(roomName).emit("updateroom");
        }
      }
    });
  });
};

const onRoomExit = (socket, roomList) => {
  socket.on("roomexit", () => {
    let roomName;
    socket.rooms.forEach((rn) => {
      if (rn !== socket.id && rn !== "lobby") {
        roomName = rn;
      }
    });
    if (!roomName) {
      return;
    }
    roomList.get(roomName).players.removePlayer(socket.id);
    if (roomList.get(roomName).players.size === 0) {
      roomList.delete(roomName);
    } else {
      server.to(roomName).emit("updateroom");
    }
    socket.join("lobby");
  });
};

const isRoomFull = (socket, roomList) => {
  socket.on("isroomfull", (roomName, cb) => {
    if (!roomList.has(roomName)) {
      cb(false);
      return;
    }
    if (roomList.get(roomName).players.size < 8) {
      cb(false);
      return;
    }
    cb(true);
  });
};

const requestPlayers = (socket, roomList) => {
  socket.on("requestplayers", (cb) => {
    cb(roomList.findPlayersInRoom(socket.id));
  });
};

const requestNames = (socket, nameList) => {
  socket.on("requestnames", (cb) => {
    cb(nameList.toJson());
  });
};

const roomConnect = (rooms, socket, server) => {
  socket.on("roomconnect", ({ room, name }) => {
    if (rooms.has(room)) {
      if (rooms.get(room).players.size === 8) {
        server.emit("roomfull");
        return;
      }
      rooms.get(room).players.addPlayer(new Player(name, socket.id), socket.id);
      socket.leave("lobby");
      socket.join(room);
      server.to(room).emit("updateroom");
    } else {
      rooms.set(room, new Room(room));
      rooms.get(room).players.addPlayer(new Player(name, socket.id), socket.id);
      socket.leave("lobby");
      socket.join(room);
    }
    if (rooms.get(room).players.size < 4) {
      server.to(room).emit("freedraw");
    }
  });
};

const addName = (socket, nameList) => {
  socket.on("addname", (newName) => {
    nameList.addName(socket.id, newName);
  });
};

const removeName = (socket, nameList) => {
  socket.on("removename", () => {
    nameList.removeName(socket.id);
  });
};

const requestRooms = (socket, roomList) => {
  socket.on("requestrooms", (cb) => {
    cb(roomList.toJson());
  });
};

module.exports = {
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
};
