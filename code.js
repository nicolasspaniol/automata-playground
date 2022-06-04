const ctx = document.getElementById("cnv").getContext("2d");

let simPlaying = false;
let interval = 0;
let sliceSize = 0;

class Map {
  constructor() {
    this.automata = (_, x, y) => this.getPixel(x, y);
    this.palette = ["#000000"];
    this.size = 0;
    this.buffer = null;
    this.backBuffer = null;
  }

  update(start, end) {
    for (let x = start; x < Math.min(end, this.size); x++) {
      for (let y = 0; y < this.size; y++) {
        this.buffer[x + y * this.size] = this.automata(this, x, y);
      }
    }
  }

  resize(size) {
    this.buffer = new Array(size ** 2).fill(0);

    let offset = (this.size - size) >> 1;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.buffer[x + y * size] = this.getPixel(x + offset, y + offset);
      }
    }

    this.backBuffer = new Array(size ** 2).fill(0);

    this.swapBuffers();
    this.size = size;
  }

  swapBuffers() {
    let aux = this.buffer;
    this.buffer = this.backBuffer;
    this.backBuffer = aux;
  }

  clear() {
    this.buffer.fill(0);
    this.backBuffer.fill(0);
  }
  
  setPixel = (x, y, value) => this.backBuffer[x + y * this.size] = value;
  getPixel = (x, y) => {
    if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
      return this.backBuffer[x + y * this.size];
    }
    return 0;
  }
}

let leftColor = 1;
let rightColor = 0;

function paint(x, y, right) {
  if (!simPlaying && x >= 0 && x < map.size && y >= 0 && y < map.size) {
    map.setPixel(x, y, right ? rightColor : leftColor);
    render();
  }
}

function resizeMap(size) {
  map.resize(size);
  updateSliceSize();
  render();
}
function clearMap() {
  map.clear();
  render();
}
function updateSliceSize() {
  sliceSize = Math.ceil(map.size / interval);
  frame = 0;
}
function updateSpeed(speed) {
  interval = 60 - speed;
  updateSliceSize();
}

function render() {
  let imgData = ctx.createImageData(map.size, map.size);

  for (let i = 0; i < map.buffer.length; i++) {
    let p = i << 2;
    let c = map.palette[map.backBuffer[i]];

  if (!c) console.log(map.backBuffer[i]);
    imgData.data[p] = c[0];
    imgData.data[p + 1] = c[1];
    imgData.data[p + 2] = c[2];
    imgData.data[p + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
}

let frame = 0;
function loop() {
  if (!simPlaying) {
    frame = 0;
    requestAnimationFrame(loop);
    return;
  }
  
  map.update(frame * sliceSize, (frame + 1) * sliceSize);

  frame++;
  if (frame % interval == 0) {
    frame = 0;
    map.swapBuffers();
    render();
  }

  requestAnimationFrame(loop);
}