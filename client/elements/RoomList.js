import CE from "./CustomElement.js";
import { fetchRooms, updateRooms } from "../js/UpdateRooms.js";
import { client } from "../js/script.js";
import {
  addRoomError,
  loadCanvasLobby,
  removeRoomErrors,
  removeWelcomePage,
} from "../js/PageEvents.js";

class RL extends CE {
  constructor(id) {
    super(id);
    this.el.style.display = "flex";
    this.el.style.flexDirection = "column";
    this.el.style.textAlign = "center";
    this.el.style.justifyContent = "center";
    this.el.style.alignItems = "center";
    this.el.style.width = "400px";
    let h = document.createElement("p");
    h.innerHTML = "Room List";
    h.style.display = "flex";
    h.style.justifyContent = "space-around";
    h.style.alignItems = "space-around";
    h.style.width = "60%";
    let r = document.createElement("span");
    r.textContent = "R";
    r.addEventListener("click", async () => {
      await updateRooms();
    });
    h.append(r);
    let ul = document.createElement("ul");
    ul.id = "rooms";
    let i = document.createElement("input");
    i.type = "text";
    let re = new CE("roomerrors");
    let btn = document.createElement("button");
    btn.textContent = "Create Room";
    btn.style.width = "100px";
    btn.addEventListener("click", async () => {
      if (i.value === "" || !document.getElementById("nameconfirmed")) {
        return;
      }
      let name = document.getElementById("nameconfirmed").textContent;
      let full = await client.isRoomFull(i.value);
      if (full) {
        removeRoomErrors();
        addRoomError("The room you are trying to join is already full");
      } else {
        client.connectToRoom(i.value, name);
        removeWelcomePage();
        loadCanvasLobby();
      }
    });
    this.el.append(h, ul, i, btn, re.el);
  }

  static async loadEvent() {
    await updateRooms();
  }
}

export default RL;
