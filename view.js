import * as model from "./model.js";

// Function der opdatere viewet baseret på linklisten
export function updateView(linkedList) {
  const zumaListContainer = document.getElementById("Zuma-view-container");
  zumaListContainer.innerHTML = "";

  let currentNode = linkedList.head;
  while (currentNode !== null) {
    // visuel repræsentation af en node :
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.textContent = currentNode.data;
    nodeElement.setAttribute("data-color", currentNode.data)

    zumaListContainer.appendChild(nodeElement);

    currentNode = currentNode.next;
  }
}



export default updateView;