ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
const map = new Map();

resizeMap(resolutionInput.value << 0);
scaleCanvas();
updateSpeed(speedInput.value);

useAutomata(automataInput.options[automataInput.selectedIndex].text);

loop();