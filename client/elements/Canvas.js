import { draw, finishPaint, startPaint } from "../js/PageEvents.js";
import CE from "./CustomElement.js";

class C extends CE {
  constructor(id, width, height) {
    super(id, "canvas");
    this.el.width = width;
    this.el.height = height;
    this.el.style.backgroundColor = "#faeddd";
    this.el.style.display = "block";
    this.el.style.margin = "auto";
    this.el.style.borderRadius = "30px";
    this.el.addEventListener("mousedown", startPaint);
    this.el.addEventListener("mouseup", finishPaint);
    this.el.addEventListener("mousemove", draw);
    this.el.addEventListener("mouseout", finishPaint);
  }

  refresh() {
    this.el.width = this.el.width;
  }
}

export default C;
