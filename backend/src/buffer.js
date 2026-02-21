class BoundedBuffer {
  constructor(maxSize) {
    this.queue = [];
    this.maxSize = maxSize;
  }

  async put(item) {
    if (this.queue.length >= this.maxSize) {
      // buffer full, wait until space available
      await new Promise((r) => setTimeout(r, 50));
      return this.put(item);
    }
    this.queue.push(item);
  }

  async take() {
    if (this.queue.length === 0) {
      // empty, wait until an item appears
      await new Promise((r) => setTimeout(r, 50));
      return this.take();
    }
    return this.queue.shift();
  }
}

function runSimulation({
  durationMs = 60000,
  capacity = 5,
  producersCount = 2,
  consumersCount = 2,
} = {}) {
  return new Promise((resolve) => {
    const buffer = new BoundedBuffer(capacity);
    let running = true;
    let log = [];

    function logEvent(evt) {
      const t = ((Date.now() - start) / 1000).toFixed(2);
      log.push(`${t}s: ${evt}`);
    }

    async function producer(id) {
      while (running) {
        const item = `item-${id}-${Math.random().toString(36).substr(2, 4)}`;
        await buffer.put(item);
        logEvent(`producer ${id} produced ${item} (size=${buffer.queue.length})`);
        await new Promise((r) => setTimeout(r, 100 + Math.random() * 400));
      }
    }

    async function consumer(id) {
      while (running) {
        const item = await buffer.take();
        logEvent(`consumer ${id} consumed ${item} (size=${buffer.queue.length})`);
        await new Promise((r) => setTimeout(r, 100 + Math.random() * 400));
      }
    }

    const producers = [];
    for (let i = 1; i <= producersCount; i++) producers.push(producer(i));

    const consumers = [];
    for (let i = 1; i <= consumersCount; i++) consumers.push(consumer(i));

    const start = Date.now();

    setTimeout(() => {
      running = false;
      // wait a little to let loops finish current iteration
      setTimeout(() => resolve(log.join("\n")), 500);
    }, durationMs);
  });
}

module.exports = { runSimulation };
