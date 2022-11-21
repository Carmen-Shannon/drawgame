import CE from "./CustomElement.js";

class PL extends CE {
  constructor(id) {
    super(id);
    this.el.style.display = "flex";
    this.el.style.flexDirection = "column";
    this.el.style.alignItems = "center";
    this.el.style.justifyContent = "space-around";
    this.el.style.margin = "15px";
    this.el.style.width = "200px";
  }
}

export default PL;
