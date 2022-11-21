import { unlockName } from "../js/SwitchName.js";
import CE from "./CustomElement.js";

class ND extends CE {
  constructor(id, n) {
    super(id);
    let name = document.createElement("p");
    name.id = "nameconfirmed";
    name.style.fontSize = "15px";
    name.textContent = n;
    let btn = document.createElement("button");
    btn.textContent = "Change Name";
    btn.addEventListener("click", () => {
      unlockName();
    });
    this.el.append(name, btn);
  }
}

export default ND;
