import CE from "./CustomElement.js";

class NE extends CE {
  constructor(id, errorlist) {
    super(id);
    let errors = document.createElement("ul");
    errorlist.forEach((key, value) => {
      let li = document.createElement("li");
      li.textContent = `${key} - ${value}`;
      errors.append(li);
    });
    this.el.append(errors);
  }
}

export default NE;
