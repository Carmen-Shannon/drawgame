import {
  decreaseLineSize,
  erase,
  increaseLineSize,
  modalColorChange,
  reloadCanvas,
} from "../js/PageEvents.js";
import { client } from "../js/script.js";
import CE from "./CustomElement.js";

class TB extends CE {
  constructor(id) {
    super(id);
    this.el.style.backgroundColor = "white";
    this.el.style.height = "50px";
    this.el.style.width = "400px";
    this.el.style.margin = "auto";
    this.el.style.borderRadius = "0px 0px 8px 8px";
    this.el.style.display = "flex";
    this.el.style.alignItems = "center";
    this.el.style.justifyContent = "space-evenly";
    let eraserBtn = new CE("eraser", "button");
    eraserBtn.el.textContent = "Erase";
    eraserBtn.el.addEventListener("click", () => {
      erase();
      modalColorChange("#faeddd");
    });
    let clearBtn = new CE("clear", "button");
    clearBtn.el.textContent = "Clear";
    clearBtn.el.addEventListener("click", () => {
      reloadCanvas();
      client.clearCanvas();
    });
    let biggerBtn = new CE("bigger", "button");
    biggerBtn.el.textContent = "+";
    biggerBtn.el.addEventListener("click", increaseLineSize);
    let smallerBtn = new CE("smaller", "button");
    smallerBtn.el.textContent = "-";
    smallerBtn.el.addEventListener("click", decreaseLineSize);
    let colorBtn = new CE("colorselect", "button");
    colorBtn.el.style.backgroundColor = "black";
    let colorModal = new CE("colormodal");
    colorModal.el.style.display = "none";
    colorModal.el.style.flexWrap = "wrap";
    colorModal.el.style.width = "240px";
    colorModal.el.style.height = "150px";
    colorModal.el.style.justifyContent = "center";
    colorModal.el.style.alignItems = "center";
    colorModal.el.style.margin = "10px";
    colorModal.el.style.padding = "20px";
    colorModal.el.style.paddingTop = "40px";
    colorModal.el.style.backgroundColor = "#faeddd";
    colorModal.el.style.border = "2px solid black";
    colorModal.el.style.position = "absolute";
    let closeModal = new CE("closemodal", "span");
    closeModal.el.style.position = "fixed";
    closeModal.el.style.display = "none";
    closeModal.el.style.color = "red";
    closeModal.el.style.cursor = "pointer";
    closeModal.el.style.height = "15px";
    closeModal.el.style.width = "15px";
    closeModal.el.style.textAlign = "center";
    closeModal.el.style.userSelect = "none";
    closeModal.el.innerText = "X";
    closeModal.el.addEventListener("click", () => {
      colorModal.el.style.display = "none";
    });
    let btns = [];
    let clrBlack = new CE("black", "button");
    clrBlack.el.style.backgroundColor = clrBlack.id;
    let clrViolet = new CE("violet", "button");
    clrViolet.el.style.backgroundColor = clrViolet.id;
    let clrIndigo = new CE("indigo", "button");
    clrIndigo.el.style.backgroundColor = clrIndigo.id;
    let clrBlue = new CE("blue", "button");
    clrBlue.el.style.backgroundColor = clrBlue.id;
    let clrGreen = new CE("green", "button");
    clrGreen.el.style.backgroundColor = clrGreen.id;
    let clrYellow = new CE("yellow", "button");
    clrYellow.el.style.backgroundColor = clrYellow.id;
    let clrOrange = new CE("orange", "button");
    clrOrange.el.style.backgroundColor = clrOrange.id;
    let clrRed = new CE("red", "button");
    clrRed.el.style.backgroundColor = clrRed.id;
    let preview = new CE("preview");
    preview.el.style.borderRadius = "50%";
    preview.el.style.backgroundColor = "black";
    preview.el.style.position = "inherit";
    preview.el.style.alignSelf = "center";
    preview.el.style.border = "1px solid black";
    preview.el.style.width = "10px";
    preview.el.style.height = "10px";
    colorModal.el.append(
      closeModal.el,
      clrBlack.el,
      clrViolet.el,
      clrIndigo.el,
      clrBlue.el,
      clrGreen.el,
      clrYellow.el,
      clrOrange.el,
      clrRed.el
    );
    this.el.append(
      eraserBtn.el,
      clearBtn.el,
      biggerBtn.el,
      smallerBtn.el,
      colorBtn.el,
      colorModal.el,
      preview.el
    );
    colorBtn.el.addEventListener("click", () => {
      if (colorModal.el.style.display === "none") {
        colorModal.el.style.display = "flex";
        closeModal.el.style.display = "block";
        colorModal.el.style.top = `${
          colorBtn.el.offsetTop + colorBtn.el.offsetWidth
        }px`;
        colorModal.el.style.left = `${colorBtn.el.offsetLeft - 120}px`;
        closeModal.el.style.top =
          colorModal.el.offsetTop +
          Math.round(colorModal.el.offsetHeight * 0.05) +
          "px";
        closeModal.el.style.left =
          colorModal.el.offsetLeft +
          Math.round(colorModal.el.offsetWidth * 0.9) +
          "px";
      } else {
        colorModal.el.style.display = "none";
      }
    });
    btns.push(
      clrBlack,
      clrViolet,
      clrIndigo,
      clrBlue,
      clrGreen,
      clrYellow,
      clrOrange,
      clrRed
    );

    for (let b in btns) {
      btns[b].el.style.width = "60px";
      btns[b].el.style.height = "60px";
      btns[b].el.style.userSelect = "none";
      btns[b].el.style.cursor = "pointer";
      btns[b].el.style.border = "none";
      btns[b].el.addEventListener("click", () => {
        modalColorChange(btns[b].id);
      });
    }
  }
}

export default TB;
