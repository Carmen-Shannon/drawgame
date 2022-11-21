import NI from "../elements/NameInput.js";
import RL from "../elements/RoomList.js";
import WP from "../elements/WelcomePage.js";
import C from "../elements/Canvas.js";
import GC from "../elements/GameContainer.js";
import PL from "../elements/PlayerList.js";
import TB from "../elements/ToolBar.js";
import CE from "../elements/CustomElement.js";
import { client } from "./script.js";
import PB from "../elements/PlayerBox.js";
import MB from "../elements/MessageBubble.js";
import ND from "../elements/NameDisplay.js";

function addMessage(message, sender) {
  if (!document.getElementById("canvas")) {
    return;
  }
  let s = document.getElementById(sender);
  let newMsg = new MB(message);
  newMsg.el.id = `${message}-${sender}`;
  newMsg.el.style.left = `${s.offsetLeft + 80}`;
  newMsg.el.style.top = `${s.offsetTop}`;
  s.append(newMsg.el);
}

function removeMessage(sender) {
  if (!document.getElementById("canvas")) {
    return;
  }
  let s = document.getElementById(sender);
  for (let i = s.children.length - 1; i >= 0; i--) {
    s.children[i].remove();
  }
}

function addRoomError(error) {
  if (!document.getElementById("roomerrors")) {
    return;
  }
  let errors = document.getElementById("roomerrors");
  let newError = document.createElement("p");
  newError.textContent = error;
  errors.append(newError);
}

function removeRoomErrors() {
  if (!document.getElementById("roomerrors")) {
    return;
  }
  let errors = document.getElementById("roomerrors").children;
  for (let i = errors.length - 1; i >= 0; i--) {
    errors[i].remove();
  }
}

function erase() {
  if (!document.getElementById("canvas")) {
    return;
  }
  const clrSelect = document.getElementById("colorselect");
  const preview = document.getElementById("preview");
  clrSelect.style.backgroundColor = "#faeddd";
  preview.style.backgroundColor = "#faeddd";
}

function increaseLineSize() {
  if (!document.getElementById("canvas")) {
    return;
  }
  const preview = document.getElementById("preview");
  let currentSize = parseInt(preview.style.width.slice(0, 2));
  let updatedSize = Math.min(45, currentSize + 5);
  preview.style.width = updatedSize + "px";
  preview.style.height = updatedSize + "px";
}

function decreaseLineSize() {
  if (!document.getElementById("canvas")) {
    return;
  }
  const preview = document.getElementById("preview");
  let currentSize = parseInt(preview.style.width.slice(0, 2));
  let updatedSize = Math.max(10, currentSize - 5);
  preview.style.width = updatedSize + "px";
  preview.style.height = updatedSize + "px";
}

function startPaint(e) {
  if (!document.getElementById("canvas")) {
    return;
  }
  client.enablePainting();
  draw(e);
}

function drawClient(coordObj) {
  if (!document.getElementById("canvas")) {
    return;
  }
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.strokeStyle = coordObj.clr;
  ctx.lineWidth = coordObj.ls;
  ctx.lineCap = "round";
  ctx.lineTo(coordObj.x, coordObj.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(coordObj.x, coordObj.y);
}

function finishPaintClient() {
  if (!document.getElementById("canvas")) {
    return;
  }
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
}

function finishPaint() {
  if (!document.getElementById("canvas")) {
    return;
  }
  client.disablePainting();
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.beginPath();
  client.finishDraw();
}

function draw(e) {
  if (!document.getElementById("canvas") || !client.isPainting()) {
    return;
  }
  const ctx = document.getElementById("canvas").getContext("2d");
  const color = document.getElementById("preview").style.backgroundColor;
  const ls = document.getElementById("preview").style.width.slice(0, 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = ls;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  const coord = {
    x: e.offsetX,
    y: e.offsetY,
    ls: ls,
    clr: color,
  };
  client.sendCoords(coord);
}

function reloadCanvas() {
  if (document.getElementById("canvas")) {
    document.getElementById("canvas").width =
      document.getElementById("canvas").width;
  }
}

function removeGame() {
  if (document.getElementById("container")) {
    document.getElementById("container").remove();
  }
}

function loadLobby() {
  const body = document.body;
  const wp = new WP("welcomepage");
  const ni = new NI("nameinput");
  const rl = new RL("roomlist");
  wp.el.append(ni.el, rl.el);
  body.appendChild(wp.el);
}

function unloadCanvasLobby() {
  if (document.getElementById("container")) {
    document.getElementById("container").remove();
    loadLobby();
    const nd = new ND("namedisplay", client.name);
    document.getElementById("nameinput").replaceWith(nd.el);
  }
}

function removeWelcomePage() {
  if (document.getElementById("welcomepage")) {
    document.getElementById("welcomepage").remove();
  }
}

function clearPlayers(list) {
  for (let i = list.children.length - 1; i >= 0; i--) {
    list.children[i].remove();
  }
}

function showChatInput() {
  if (
    !document.getElementById("container") ||
    document.getElementById("chatinput")
  ) {
    return;
  }
  const chatinput = document.createElement("input");
  chatinput.id = "chatinput";
  chatinput.style.width = "220px";
  chatinput.style.margin = "0px auto";
  chatinput.style.padding = "2px";
  chatinput.style.borderRadius = "5px";
  document.getElementById("container").append(chatinput);
}

function hideChatInput() {
  if (!document.getElementById("chatinput")) {
    return;
  }
  document.getElementById("chatinput").remove();
}

function showTools() {
  if (!document.getElementById("tools")) {
    return;
  }
  document.getElementById("tools").style.display = "flex";
}

function hideTools() {
  if (!document.getElementById("tools")) {
    return;
  }
  document.getElementById("tools").style.display = "none";
}

function modalColorChange(color) {
  if (!document.getElementById("colormodal")) {
    return;
  }
  document.getElementById("colorselect").style.backgroundColor = color;
  document.getElementById("preview").style.backgroundColor = color;
  for (let c of document.getElementById("colormodal").children) {
    if (c.id === "closemodal") {
      continue;
    }
    if (c.id === color) {
      c.style.width = "30px";
      c.style.height = "30px";
      c.style.margin = "15px";
    } else {
      c.style.width = "60px";
      c.style.height = "60px";
      c.style.margin = "0px";
    }
  }
}

async function updatePlayerList() {
  const players = await client.requestPlayers();
  const leftP = document.getElementById("leftplayers");
  const rightP = document.getElementById("rightplayers");
  clearPlayers(leftP);
  clearPlayers(rightP);
  for (let p in players) {
    const pb = new PB(players[p].id, players[p].name);
    if (leftP.children.length < 4) {
      leftP.append(pb.el);
    } else {
      rightP.append(pb.el);
    }
  }
}

async function loadCanvasLobby() {
  const body = document.body;
  const mc = new CE("container");
  mc.el.style.display = "flex";
  mc.el.style.flexDirection = "column";
  const t = new CE("title", "p");
  t.el.style.textAlign = "center";
  t.el.textContent = "Please wait while players join...";
  t.el.style.display = "flex";
  t.el.style.justifyContent = "space-evenly";
  const leave = new CE("leaveroom", "button");
  leave.el.textContent = "Leave Room";
  leave.el.addEventListener("click", () => {
    client.disconnectFromRoom();
    unloadCanvasLobby();
  });
  const gc = new GC("gamecontainer");
  const c = new C("canvas", 700, 600);
  const leftP = new PL("leftplayers");
  const rightP = new PL("rightplayers");
  const tb = new TB("tools");
  t.el.append(leave.el);
  gc.el.append(leftP.el, c.el, rightP.el);
  mc.el.append(t.el, gc.el, tb.el);
  body.append(mc.el);
  hideTools();
  await updatePlayerList();
}

export {
  loadLobby,
  removeWelcomePage,
  loadCanvasLobby,
  updatePlayerList,
  removeGame,
  showTools,
  hideTools,
  modalColorChange,
  showChatInput,
  hideChatInput,
  reloadCanvas,
  draw,
  startPaint,
  finishPaint,
  erase,
  increaseLineSize,
  decreaseLineSize,
  drawClient,
  finishPaintClient,
  removeRoomErrors,
  addRoomError,
  addMessage,
  removeMessage,
  unloadCanvasLobby,
};
