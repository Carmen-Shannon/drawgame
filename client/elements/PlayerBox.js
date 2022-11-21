import CE from "./CustomElement.js";

class PB extends CE {
  constructor(id, name) {
    super(id);
    this.el.innerText = name;
    this.el.style.width = "159px";
    this.el.style.height = "19px";
    this.el.style.border = "1px solid black";
    this.el.style.marginTop = "30px";
    this.el.style.marginBottom = "30px";
    this.el.style.textAlign = "center";
  }
}

export default PB;
