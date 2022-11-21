const { PlayerList } = require("./PlayerList");

class Room {
  #name;
  #players;
  constructor(name) {
    this.#name = name;
    this.#players = new PlayerList();
  }

  get name() {
    return this.#name;
  }
  get players() {
    return this.#players;
  }

  getConnectedIds() {
    let m = [];
    this.#players.forEach((key) => {
      m.push(key.id);
    });
    return m;
  }
}

module.exports = { Room };
