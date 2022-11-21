import {
  addRoomError,
  loadCanvasLobby,
  removeRoomErrors,
  removeWelcomePage,
} from "./PageEvents.js";
import { client } from "./script.js";

async function fetchRooms() {
  return new Promise(async (resolve) => {
    resolve(await client.requestRooms());
  });
}

async function updateRooms() {
  let roomList = await fetchRooms();
  let list = document.getElementById("rooms");
  if (list) {
    removeRooms(list.children);
  }
  for (let k in roomList) {
    let room = document.createElement("li");
    room.style.height = "49px";
    room.style.width = "79px";
    room.style.border = "1px solid black";
    let playerCount = 0;
    for (let p in roomList[k]) {
      playerCount++;
    }
    room.textContent = `${k} - ${playerCount}/8`;
    room.addEventListener("click", async () => {
      if (!document.getElementById("nameconfirmed")) {
        return;
      }
      let name = document.getElementById("nameconfirmed").textContent;
      let full = await client.isRoomFull(k);
      if (full) {
        removeRoomErrors();
        addRoomError("The room you tried to join is already full");
      } else {
        client.connectToRoom(k, name);
        removeWelcomePage();
        loadCanvasLobby();
      }
    });
    list.appendChild(room);
  }
}

function removeRooms(roomList) {
  for (let i = roomList.length - 1; i >= 0; i--) {
    roomList[i].remove();
  }
  return;
}

export { fetchRooms, updateRooms };
