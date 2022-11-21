import Socket from "../services/Socket.js";
import { loadCanvasLobby, loadLobby, showTools } from "./PageEvents.js";

const client = new Socket("ws://localhost:8080");
client.init();
export { client };

loadLobby();

window.addEventListener("keypress", (e) => {
  // if (e.key === "e") {
  //   console.log(client.isDrawing());
  // }
  if (e.key === "Enter") {
    if (!document.getElementById("chatinput")) {
      return;
    }
    let ci = document.getElementById("chatinput");
    if (ci.value === "") {
      return;
    }
    client.sendMessage(ci.value);
    ci.value = "";
  }
});
