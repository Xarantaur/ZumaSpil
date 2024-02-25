import * as model from "./model.js";
import * as view from "./view.js";

function initializeGame() {
  const linkedList = new model.default();
  setInterval(() => {
    linkedList.addFirst(model.randomColor());
    console.log("tilføjet ny node");
    view.updateView(linkedList);
  }, 3000);

  const zumaListContainer = document.getElementById("Zuma-view-container");

  zumaListContainer.addEventListener("click", function (event) {
    const clickedNode = event.target.closest(".node");
    if (clickedNode && zumaListContainer.contains(clickedNode)) {
      const nodeList = Array.from(zumaListContainer.querySelectorAll(".node"));
      const clickedIndex = nodeList.indexOf(clickedNode);
      console.log("Clicked node index:", clickedIndex);

      const newNode = document.createElement("div");
      newNode.classList.add("node");
      newNode.data = "green"; // skal sætte farven til at være den samme farve som der nede ved frøøen

      linkedList.insertBefore(clickedIndex, newNode);

      view.updateView(linkedList);
    }
  });
}

initializeGame();
console.log("Game initialized");
