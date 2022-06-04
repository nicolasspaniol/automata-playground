// Scale / resolution

function scaleCanvas() {
  const resolution = resolutionInput.value;
  const scale = scaleInput.value;

  ctx.canvas.width = resolution;
  ctx.canvas.height = resolution;
  ctx.canvas.style.width = resolution * scale + "px";
  ctx.canvas.style.height = resolution * scale + "px";

  render();
}

const scaleInput = document.getElementById("scale");
scaleInput.onchange = scaleCanvas;

const resolutionInput = document.getElementById("resolution");
resolutionInput.onchange = () => {
  scaleCanvas();
  resizeMap(resolutionInput.value);
}

// Play / pause menu

function toggleSimulation() {
  simPlaying = !simPlaying;
  playInput.value = simPlaying ? "Pause" : "Play";
  ctx.canvas.style.outlineColor = simPlaying ? "#0f0" : "#fff";
}
const playInput = document.getElementById("play");
playInput.onclick = toggleSimulation;
window.onkeydown = e => {
  if (e.code === "Space") {
    toggleSimulation();
    e.preventDefault();
  }
}

// Other inputs

const speedInput = document.getElementById("speed");
speedInput.onchange = () => updateSpeed(speedInput.value);

const clearInput = document.getElementById("clear");
clearInput.onclick = clearMap;

// Painting

let painting = 0;
function tryPaint(e) {
  if (painting == 1 || painting == 2) {
    const scale = scaleInput.value;
    const x = e.offsetX;
    const y = e.offsetY;

    paint(x / scale >> 0, y / scale >> 0, painting != 1);
  }
}

ctx.canvas.onmousedown = e => {
  painting = e.buttons;
  tryPaint(e);
}
ctx.canvas.onmouseup = e => painting = e.buttons;
ctx.canvas.oncontextmenu = e => e.preventDefault();
ctx.canvas.onmouseenter = e => painting = e.buttons;
ctx.canvas.onmousemove = e => tryPaint(e);

// Automatas select

const automataInput = document.getElementById("automatas");

for (const [k, v] of Object.entries(automatas)) {
  const option = document.createElement("option");
  option.innerHTML = k;
  automataInput.appendChild(option);
}
automataInput.onchange = () => {
  useAutomata(automataInput.options[automataInput.selectedIndex].text);
  clearMap();
}

// Color select

const leftColorInput = document.getElementById("color-l");
const rightColorInput = document.getElementById("color-r");

leftColorInput.onclick = () => leftColor = parseInt(leftColorInput.value);
rightColorInput.onclick = () => rightColor = parseInt(rightColorInput.value);

function updateColorInputs(max) {
  leftColorInput.max = max;
  rightColorInput.max = max;

  leftColor = 1;
  rightColor = 0;
  leftColorInput.value = 1;
  rightColorInput.value = 0;
}