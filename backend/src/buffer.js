class BoundedBuffer {
  constructor(maxSize) {
    this.queue = []
    this.maxSize = maxSize
  }

  async put(item, producerId) {
    console.log(`Productor ${producerId} intentando entrar a sección crítica`)

    while (this.queue.length >= this.maxSize) {
      await new Promise((r) => setTimeout(r, 50))
    }

    console.log(`Productor ${producerId} ENTRÓ a sección crítica`)
    this.queue.push(item)
    console.log(`Productor ${producerId} SALIÓ de sección crítica`)
  }

  async take(consumerId) {
    console.log(`Consumidor ${consumerId} intentando entrar a sección crítica`)

    while (this.queue.length === 0) {
      await new Promise((r) => setTimeout(r, 50))
    }

    console.log(`Consumidor ${consumerId} ENTRÓ a sección crítica`)
    const item = this.queue.shift()
    console.log(`Consumidor ${consumerId} SALIÓ de sección crítica`)
    return item
  }
}

function runSimulationRealtime(io) {

  //CONFIGURACIÓN DEL LABORATORIO 
  const BUFFER_SIZE = 10
  const NUM_PRODUCERS = 3      
  const NUM_CONSUMERS = 2      
  const SIMULATION_TIME = 60000

  const buffer = new BoundedBuffer(BUFFER_SIZE)

  let running = true

  setTimeout(() => {
    console.log("Simulación finalizada (60 segundos) :]")
    running = false
  }, SIMULATION_TIME)

  async function producer(id) {
    while (running) {
      const item = `P${id}-${Math.floor(Math.random() * 100)}`
      await buffer.put(item, id)
      io.emit("bufferUpdate", buffer.queue)
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  async function consumer(id) {
    while (running) {
      await buffer.take(id)
      io.emit("bufferUpdate", buffer.queue)
      await new Promise((r) => setTimeout(r, 700))
    }
  }

  // Crear productores configurables
  for (let i = 1; i <= NUM_PRODUCERS; i++) {
    producer(i)
  }

  // Crear consumidores configurables
  for (let i = 1; i <= NUM_CONSUMERS; i++) {
    consumer(i)
  }
}

module.exports = { runSimulationRealtime }