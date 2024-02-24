import * as model from "./model.js";
import * as view from "./view.js";

function initializeGame() {
  const linkedList = new model.default();
  setInterval(() => {
    linkedList.addFirst(linkedList.randomColor());
    console.log("tilføjet ny node");
    view.updateView(linkedList);
  }, 3000);
}
initializeGame();
console.log("Game initialized");
