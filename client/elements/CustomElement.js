class CE {
  #el;
  #id;
  constructor(id = undefined, type = "div") {
    this.#el = document.createElement(type);
    if (id) {
      this.#id = id;
      this.#el.id = this.#id;
    }
  }

  get el() {
    return this.#el;
  }
  get id() {
    return this.#id;
  }
  remove() {
    document.getElementById(this.#id).remove();
  }
}

export default CE;
