import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import {
  updatePlayerList,
  removeGame,
  loadLobby,
  showTools,
  showChatInput,
  reloadCanvas,
  drawClient,
  finishPaintClient,
  removeRoomErrors,
  addRoomError,
  addMessage,
  removeMessage,
} from "../js/PageEvents.js";
class Socket {
  #id;
  #instance;
  #path;
  #name;
  #namelist;
  #drawing;
  #painting = false;

  constructor(path) {
    this.#path = path;
  }

  init() {
    this.setInstance(io(this.#path));
    this.instance.on("connect", () => {
      this.#id = this.instance.id;
      this.instance.emit("newconnect");
    });
    this.instance.on("disconnect", () => {
      removeGame();
      loadLobby();
    });
    this.instance.on("updateroom", async () => {
      await updatePlayerList();
    });
    this.instance.on("freedraw", () => {
      showTools();
      showChatInput();
      reloadCanvas();
      this.#drawing = true;
    });
    this.instance.on("updatecanvas", (coordObj) => {
      drawClient(coordObj);
    });
    this.instance.on("finishdrawclient", () => {
      finishPaintClient();
    });
    this.instance.on("clearboard", () => {
      reloadCanvas();
    });
    this.instance.on("roomfull", () => {
      removeRoomErrors();
      addRoomError("The room you tried to join is full.");
    });
    this.instance.on("showmessage", (message, sender) => {
      console.log(message, sender);
      addMessage(message, sender);
    });
    this.instance.on("removemessage", (sender) => {
      removeMessage(sender);
    });
  }

  addName(newName) {
    if (!this.instance.connected) {
      return;
    }
    this.instance.emit("addname", newName);
    this.setName(newName);
  }

  removeName() {
    if (!this.instance.connected) {
      return;
    }
    this.instance.emit("removename");
    this.setName("");
  }

  setInstance(newInstance) {
    this.#instance = newInstance;
  }

  setName(newName) {
    this.#name = newName;
  }

  addRoom(room, name) {
    if (!this.instance.connected) {
      return;
    }

    this.instance.emit("newroom", { room, name });
  }

  connectToRoom(room, name) {
    if (!this.instance.connected) {
      return;
    }

    console.log(room, name, "sending room and name to server");
    this.instance.emit("roomconnect", { room, name });
  }

  disconnectFromRoom() {
    if (!this.instance.connected) {
      return;
    }
    this.instance.emit("roomexit");
  }

  togglePainting() {
    this.#painting = !this.#painting;
  }

  enablePainting() {
    this.#painting = true;
  }

  disablePainting() {
    this.#painting = false;
  }

  clearCanvas() {
    this.instance.emit("clear");
  }

  isDrawing() {
    return this.#drawing;
  }

  isPainting() {
    return this.#painting;
  }

  sendCoords(coordObj) {
    this.instance.emit("draw", coordObj);
  }

  finishDraw() {
    this.instance.emit("finishdraw");
  }

  sendMessage(message) {
    this.instance.emit("newmessage", message);
  }

  async isRoomFull(roomName) {
    if (!this.instance.connected) {
      return;
    }
    return new Promise((resolve) => {
      this.instance.emit("isroomfull", roomName, (response) => {
        resolve(response);
      });
    });
  }

  async requestPlayers() {
    if (!this.instance.connected) {
      return;
    }
    return new Promise((resolve) => {
      this.instance.emit("requestplayers", (response) => {
        resolve(response);
      });
    });
  }

  async requestNames() {
    if (!this.instance.connected) {
      return;
    }
    return new Promise((resolve) => {
      this.instance.emit("requestnames", (response) => {
        resolve(response);
      });
    });
  }

  async requestRooms() {
    if (!this.instance.connected) {
      return;
    }
    return new Promise((resolve) => {
      this.instance.emit("requestrooms", (response) => {
        resolve(response);
      });
    });
  }

  get id() {
    return this.#id;
  }

  get instance() {
    return this.#instance;
  }
  get name() {
    return this.#name;
  }
  get namelist() {
    return this.#namelist;
  }
}

export default Socket;
