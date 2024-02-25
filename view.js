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
    nodeElement.setAttribute("data-color", currentNode.data);

    zumaListContainer.appendChild(nodeElement);

    currentNode = currentNode.next;
  }
}

// Get a reference to the frog element
const frogElement = document.getElementById("ZumaFrog");

// Add a click event listener to the frog element
frogElement.addEventListener("click", () => {
  // Create a new node element
  const newNode = document.createElement("div");
  newNode.classList.add("node");

  // Set the initial color of the node using the randomColor function
  newNode.style.backgroundColor = model.randomColor();

  
  newNode.addEventListener("click", () => {
   
    newNode.style.backgroundColor = model.randomColor();
  });
 // skal laves om: det kan gøres væsentligt bedre... 
  const frogRect = frogElement.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();

  // giver newnode positionen = frog elementet. men det virker ret dårligt.
  newNode.style.position = "absolute";
  newNode.style.top = `${frogRect.top - bodyRect.top}px`;
  newNode.style.left = `${frogRect.left - bodyRect.left}px`;

  // appender det til html body. virker igen ret dårligt.
  document.body.appendChild(newNode);
});

export default updateView;
