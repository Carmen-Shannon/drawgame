const rooms = class Rooms extends Map {
  constructor() {
    super();
  }

  findRoomName(id) {
    for (let [k, v] of this) {
      if (this.get(k).players.has(id)) {
        return k;
      }
    }
    return null;
  }

  findPlayersInRoom(id) {
    for (let [k, v] of this) {
      if (this.get(k).players.has(id)) {
        return this.get(k).players.toJson();
      }
    }
    return null;
  }

  toJson() {
    let emittedRooms = {};
    this.forEach((val, key) => {
      emittedRooms[key] = val.players.toJson();
    });
    return emittedRooms;
  }

  returnNames() {
    let names = [];
    this.forEach((val, key) => {
      val.players.forEach((p, k) => {
        names.push(p.name);
      });
    });
    return names;
  }
};

module.exports = { rooms };
