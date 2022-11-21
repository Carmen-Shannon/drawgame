import CE from "./CustomElement.js";

class GC extends CE {
  constructor(id) {
    super(id);
    this.el.style.display = "flex";
    this.el.style.alignItems = "center";
    this.el.style.justifyContent = "center";
  }
}

export default GC;
