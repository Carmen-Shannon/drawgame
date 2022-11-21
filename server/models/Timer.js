class Timer {
  constructor(server, limit) {
    this.time = limit;
    this.limit = limit;
    this.running = false;
    this.server = server;
    this.instance = undefined;
  }
  reset() {
    this.time = this.limit;
    this.running = false;
  }

  stop() {
    clearInterval(this.instance);
  }

  start(
    room = undefined,
    event,
    data = undefined,
    func = function () {
      return;
    }
  ) {
    this.running = true;
    const t = setInterval(() => {
      if (this.time === 0) {
        func();
        if (room) {
          this.server.to(room).emit(event, data);
        } else {
          this.server.emit(event, data);
        }
        this.reset();
        clearInterval(t);
        return;
      }
      this.tick();
    }, 1000);
    this.instance = t;
  }

  tick() {
    this.time--;
  }
}

module.exports = Timer;
