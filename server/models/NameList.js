class NL extends Map {
  constructor() {
    super();
  }

  removeName(id) {
    if (this.has(id)) {
      this.delete(id);
    }
  }

  addName(id, name) {
    this.set(id, name);
  }

  toJson() {
    let returnObj = [];
    this.forEach((val, key) => {
      let p = {
        id: key,
        name: val,
      };
      returnObj.push(p);
    });
    return returnObj;
  }
}

module.exports = NL;
