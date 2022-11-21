import CE from "./CustomElement.js";

class WP extends CE {
  constructor(id) {
    super(id);
    this.el.style.display = "flex";
    this.el.style.justifyContent = "space-around";
    this.el.style.alignItems = "center";
    this.el.style.width = "80%";
    this.el.style.height = "80%";
  }
}

export default WP;
