automatas = {
  "Conway's game of life": {
    palette: ["#000000", "#ffffff"],
    logic: (map, x, y) => {
      const neighbours = 
        map.getPixel(x, y - 1) +
        map.getPixel(x, y + 1) +
        map.getPixel(x + 1, y) +
        map.getPixel(x - 1, y) +
        map.getPixel(x + 1, y + 1) +
        map.getPixel(x - 1, y + 1) +
        map.getPixel(x + 1, y - 1) +
        map.getPixel(x - 1, y - 1);

      const state = map.getPixel(x, y);

      if (neighbours == 3 || (neighbours == 2 && state == 1)) {
        return 1;
      }
      return 0;
    }
  },
  "Wireworld": {
    palette: ["#000000", "#0080ff", "#ff4000", "#ffd700"],
    logic: (map, x, y) => {
      const state = map.getPixel(x, y);

      if (state == 0) {
        return 0;
      }
      if (state == 1 || state == 2) {
        return state + 1;
      }
      const neighbours = 
        (map.getPixel(x, y - 1) == 1 ? 1 : 0) +
        (map.getPixel(x, y + 1) == 1 ? 1 : 0) +
        (map.getPixel(x + 1, y) == 1 ? 1 : 0) +
        (map.getPixel(x - 1, y) == 1 ? 1 : 0) +
        (map.getPixel(x + 1, y + 1) == 1 ? 1 : 0) +
        (map.getPixel(x - 1, y + 1) == 1 ? 1 : 0) +
        (map.getPixel(x + 1, y - 1) == 1 ? 1 : 0) +
        (map.getPixel(x - 1, y - 1) == 1 ? 1 : 0);
      
      if (neighbours == 1 || neighbours == 2) {
        return 1;
      }
      return 3;
    }
  },
  "Rule 90": {
    palette: ["#000000", "#ffffff"],
    logic: (map, x, y) => {
      if (map.getPixel(x, y) == 1) {
        return 1;
      }
      return map.getPixel(x - 1, y - 1) ^ map.getPixel(x + 1, y - 1);
    }
  },
  "Brian's Brain": {
    palette: ["#000000", "#507dc7", "#ffffff"],
    logic: (map, x, y) => {
      const state = map.getPixel(x, y);
      if (state == 0) { 
        const neighbours = 
          (map.getPixel(x, y - 1) == 2 ? 1 : 0) +
          (map.getPixel(x, y + 1) == 2 ? 1 : 0) +
          (map.getPixel(x + 1, y) == 2 ? 1 : 0) +
          (map.getPixel(x - 1, y) == 2 ? 1 : 0) +
          (map.getPixel(x + 1, y + 1) == 2 ? 1 : 0) +
          (map.getPixel(x - 1, y + 1) == 2 ? 1 : 0) +
          (map.getPixel(x + 1, y - 1) == 2 ? 1 : 0) +
          (map.getPixel(x - 1, y - 1) == 2 ? 1 : 0);

        if (neighbours == 2) {
          return 2;
        }
        return 0;
      }
      return state - 1;
    }
  }
}

function useAutomata(name) {
  let obj = automatas[name];
  map.automata = obj.logic;
  map.palette = new Array();
  for (let i = 0; i < obj.palette.length; i++) {
    let code = obj.palette[i];
    let color = [
      parseInt(code.substring(1, 3), 16),
      parseInt(code.substring(3, 5), 16),
      parseInt(code.substring(5, 7), 16)
    ];
    map.palette.push(color);
  }
  updateColorInputs(obj.palette.length - 1);
  if (simPlaying) {
    toggleSimulation();
  }
}