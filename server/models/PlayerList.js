const Player = require("./Player");

class PlayerList extends Map {
  constructor() {
    super();
  }

  removePlayer(id) {
    this.delete(id);
  }

  findById(id) {
    if (this.has(id)) {
      return this.get(id).name;
    }
    return null;
  }

  addPlayer(player, id) {
    if (this.size < 8) {
      this.set(id, player);
    }
  }

  toJson() {
    let jsonObj = {};
    this.forEach((val, key) => {
      jsonObj[val.id] = { name: val.name, id: key };
    });
    return jsonObj;
  }
}

module.exports = { PlayerList };
