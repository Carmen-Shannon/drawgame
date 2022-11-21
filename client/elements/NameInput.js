import CE from "./CustomElement.js";
import validate from "../js/ValidateName.js";
import NE from "./NameError.js";
import { lockName } from "../js/SwitchName.js";
import RL from "./RoomList.js";

class NI extends CE {
  #val;
  #input;
  constructor(id) {
    super(id);
    this.el.style.display = "flex";
    this.el.style.flexDirection = "column";
    this.el.style.justifyContent = "center";
    this.el.style.alignItems = "center";
    let txt = (document.createElement("h3").innerText = "Enter your name:");
    let input = document.createElement("input");
    input.type = "text";
    input.maxLength = 12;
    input.style.textAlign = "center";
    input.style.borderRadius = "8px";
    input.style.padding = "2px";
    this.#input = input;
    let btn = document.createElement("button");
    btn.textContent = "Enter";
    btn.addEventListener("click", async () => {
      if (document.getElementById("nameerror")) {
        document.getElementById("nameerror").remove();
      }
      this.capture();
      let v = await validate(this.#val);
      if (v !== true) {
        const ne = new NE("nameerror", v);
        this.el.append(ne.el);
        return;
      }
      lockName(this);
      RL.loadEvent();
    });
    this.el.append(txt, input, btn);
  }

  get val() {
    return this.#val;
  }

  capture() {
    this.#val = this.#input.value;
  }
}

export default NI;
