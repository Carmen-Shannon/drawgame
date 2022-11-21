class Player {
  #name;
  #id;
  #points;
  constructor(name, id) {
    this.#name = name;
    this.#id = id;
    this.#points = 0;
  }

  get name() {
    return this.#name;
  }
  get id() {
    return this.#id;
  }
  get points() {
    return this.#points;
  }

  resetPoints() {
    this.#points = 0;
  }
  addPoints(amount) {
    this.#points += amount;
  }
}

module.exports = { Player };
