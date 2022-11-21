import CE from "./CustomElement.js";

class MB extends CE {
  constructor(message) {
    super();
    this.el.style.width = `${message.length * 12}px`;
    this.el.style.textAlign = "center";
    this.el.style.backgroundColor = "white";
    this.el.style.borderRadius = "4px";
    this.el.innerText = message;
    this.el.style.position = "absolute";
    this.el.className = "message";
  }
}

export default MB;
