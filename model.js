let headNode;
let tailNode;

const node1 = {
  prev: null,
  next: null,
  data: "red",
};

const node2 = {
  prev: null,
  next: null,
  data: "green",
};

const node3 = {
  prev: null,
  next: null,
  data: "blue",
};

const node4 = {
  prev: null,
  next: null,
  data: "yellow",
};

const node5 = {
  prev: null,
  next: null,
  data: "green",
};
// node 1-2
node1.next = node2;
node2.prev = node1;
// node 2-3
node2.next = node3;
node3.prev = node2;

node3.next = node4;
node4.prev = node3;

node4.next = node5;
node5.prev = node4;

class LinkedList {
  constructor() {
    // test-code: change later
    this.head = node1;
    this.tail = node5;
  }

  dumpList() {
    let a_node = this.head;
    while (a_node != null) {
      console.log(`
      node: ${a_node.data}
      -----------
        prev: ${a_node.prev?.data}
        next: ${a_node.next?.data}
      `);
      // find den næste node
      a_node = a_node.next;
    }
  }

   randomColor() {
    const colors = ["red", "blue","green","yellow"]
    return colors[Math.floor(Math.random()*colors.length)]
  }
  // Functions:
  add(payload) {
    const newNode = {
      prev: null,
      next: null,
      data: payload,
    };
    // siger !- hvis ikke der er et head- på this- list så:
    if (!this.head) {
      // sæt head- på this- liste til at være newNode
      this.head = newNode;
      // og sæt tail- på this- liste til at være NewNode
      this.tail = newNode;
    } else {
      // siger den der kommer før den nye node skal være lige med den nuværende tail.
      newNode.prev = this.tail;
      // siger den næste node der kommer efter denne listes tail skal være lige med den nye node
      this.tail.next = newNode;
      // siger at denne listes tail skal være den nye node.
      this.tail = newNode;
    }
  }

  addFirst(payload) {
    const newNode = {
      prev: null,
      next: null,
      data: payload,
    };
    // siger !- hvis ikke der er et head- på this- list så :
    if (!this.head) {
      // sæt head- på this- liste til at være newNode
      this.head = newNode;
      // og sætter tail- på this. liste til at være newNode også. fordi hvis en Liste ikke har et Head - så er den per definition tom
      this.tail = newNode;
    } else {
      // siger at den node der kommer næstefter denne nye node skal være linkListens head. "newNode { prex: ..., next: Linkedlist.head}"
      newNode.next = this.head;
      // siger at den node der kommer før denne linkedLists.head skal være den nye node "node A { prev: newNode}"
      this.head.prev = newNode;
      // siger at den nuværende linkedlists.head skal være lige med den nye node. testList = new LinkedList{ head = newnode, tail: .....}
      this.head = newNode;
    }
  }

  removeLast() {
    // undersøger om der findes en tail / eller at listen er tom
    if (!this.tail) {
      console.log("der er ikke noget at fjerne.");
      return;
    }
    // undersøger om der kun er en node tilbage i listen.
    if (this.tail === this.head) {
      // hvis der kun er en node tilbage, ændres dens properties til null så der ikke er nogle referencer til den. og så er den "fjernet"
      this.head = null;
      this.tail = null;
      return;
    }
    // fjerner den sidste node ved at. give tail propertien af den sidst node til den næstsidste node
    this.tail = this.tail.prev;
    // og derefter fjerne referencen til den næste note.
    this.tail.next = null;
  }

  removeFirst() {
    //undersøger om der er et head.
    if (!this.head) {
      console.log("der er ikke nogen nodes i listen");
      return;
    }
    // hvis der kun er en node tilbage, fjernes ref. til denne og derved slettes denne.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }
    // giver head propertie videre til den næste node i rækken.
    this.head = this.head.next;
    // tager den node der nu er head og fjerne dens prev. ref. og derved sletter den første i listen
    this.head.prev = null;
  }

  removeNode(node) {
    // node = navnet på elementet, ikke den pejer på, så i dette tilfælge  "node1, node2, node3"
    let currentNode = this.head;
    console.log("trying to remove a node");

    let nodeRemoved = false;
    //
    while (currentNode) {
      // så længe at currentNode ikke er null så fortsætter while loopet:
      if (currentNode === node) {
        // hvis current node er lige med node parameteret  så gå ind i ad if døren:
        if (currentNode.prev !== null) {
          // så længe at den tidligere node end den nuværende node ikke er null så fortsæt ind ad if døren:
          currentNode.prev.next = currentNode.next; // den tidligere node's næste note bliver ligemed "currentNode"'s næste node.
        } else {
          // ellers :
          this.head = currentNode.next; // gør denne listes hoved til den nuværendes node næste node. " [denne node] --> [næste node, bliver til head]"
        }

        if (currentNode.next !== null)
          // hvis denne node's næste node ikke er null så fortsæt ind ad if døren:
          currentNode.next.prev = currentNode.prev;
        // sætter denne nodes næste node's "prev" key-value pair til  at være denne nodes tidligere node "[tidliger node bliver til :] <-- [denne node]"
        else {
          // ellers :
          this.tail = currentNode.prev; // sætter denne listes tail til at være den nuværendes node's tidligere node.
        }

        currentNode.prev = null; // sætter dennes nodes key-value pair "prev: til null"
        currentNode.next = null;
        nodeRemoved = true; // sætter dennes nodes key-values pair "next: til null"
        break; // breaker while loopet.
      }
      currentNode = currentNode.next; // den nuværende bliver ligemed den næste node:
    }
    if (!nodeRemoved) {
      console.log("node blev ikke fundet i linkedlist");
    }
  }

  insertBeforeNode(payload, node) {
    const newNode = {
      // laves et ny node element.
      prev: null,
      next: null,
      data: payload,
    };

    let currentNode = this.head; // peger på hovedet i linkedList
    console.log("går ind i listen fra head");

    while (currentNode !== null) {
      // så længe at currentNode ikke er null :
      if (currentNode === node) {
        // hvis currentNode er ligemed parameter noden så :
        newNode.next = currentNode; // sæt newNodes next pointer til at være currentNode
        newNode.prev = currentNode.prev; // og sæt newNodes prev pointer til at være currentNodes prev.

        if (currentNode.prev !== null) {
          // hvis currentNodes prev pointer ikke er null så:
          currentNode.prev.next = newNode; // sæt den nuværende( currentNode) tidligere nodes, next pointer til at være newNode
        } else {
          this.head = newNode; // hvis ikke så sæt den nye node til at være head
        }

        currentNode.prev = newNode; // sætter den nuværendes node prev pointer til at pege på newnode
        break; // break loopet
      }
      currentNode = currentNode.next; // opdater currentNode variabel for at itere videre igennem listen
    }

    console.log(newNode);
  }

  insertAfterNode(payload, node) {
    const newNode = {
      // lav en ny node
      prev: null,
      next: null,
      data: payload,
    };

    let currentNode = this.head; // currentNode variable der peger på head i listen
    console.log("går ind i listen fra head");

    while (currentNode !== null) {
      // så længe curretnode ikke er null
      console.log("inde i loop");
      if (currentNode === node) {
        // hvis current node er lige med node paramter
        console.log("vi giver ny node dens variabler");
        newNode.next = currentNode.next; // så sæt newNodes next pointer til at være lige med currentnodes next pointer
        newNode.prev = currentNode; // og sæt newnodes prev pointer til at være den nuværende node.

        if (currentNode.next !== null) {
          // hvis den nuværende nodes next pointer ikke er null så
          currentNode.next.prev = newNode; // sæt den nuværende nodes næste node's prev pointer til at pege på newnode.
        } else {
          this.tail = newNode; // ellers så sæt den nye node til at være tail
        }
        currentNode.next = newNode; // sæt den nuværendes node next pointer til at pege på newNode
        console.log(newNode);
        console.log("lige inden break");
        break; // breaker loopet
      }
      currentNode = currentNode.next; // opdatere currentnode så der kan iteres igennem listen
      console.log(currentNode);
    }
  }

  swapNodes(nodeA, nodeB) {
    let currentNode = this.head;
    let nodeAPlaceHolder = null;
    let nodeBPlaceHolder = null;

    while (currentNode !== null) {
      if (currentNode === nodeA) {
        nodeAPlaceHolder = nodeA;
      }
      if (currentNode === nodeB) {
        nodeBPlaceHolder = nodeB;
      }
      currentNode = currentNode.next;
    }
    if (nodeAPlaceHolder && nodeBPlaceHolder) {
      // hvis begge nodes bliver fundet
      [nodeA.prev, nodeB.prev] = [nodeB.prev, nodeA.prev]; // skift nodeA og NodeB prev med hinanden
      [nodeA.next, nodeB.next] = [nodeB.next, nodeA.next]; // skift nodeA og nodeB prev med hinanden

      // NodeA's Naboer:
      if (nodeA.prev !== null) {
        // hvis nodeA.prev ikke er ligemed null så sæt nodeA.prev.next = nodeA
        nodeA.prev.next = nodeA;
      } else {
        // hvis nodeA.prev er null. så lav nodeA om til head på linklisted
        this.head = nodeA;
      }
      if (nodeA.next !== null) {
        // hvis nodeA.next ikke er null så få nodeA.next.prev til at pege på NodeA
        nodeA.next.prev = nodeA;
      } else {
        // hvis nodeA.next er null. så sæt nodeA til at være tail på linkedList
        this.tail = nodeA;
      }

      //NodeB's naboer :
      if (nodeB.prev !== null) {
        // hvis nodeB.prev ikke er null så få nodeB.prev.next til at pege på nodeB
        nodeB.prev.next = nodeB;
      } else {
        this.head = nodeB; // ellers sæt hoved på denne linkedList til at være NodeB
      }

      if (nodeB.next !== null) {
        // hvis nodeB.next ikke er null så sæt nodeB.next.prev til at pege på nodeB.
        nodeB.next.prev = nodeB;
      } else {
        this.tail = nodeB; // hvis nodeB.next er null så sæt nodeB til at være tail på denne LinkedList
      }
    }

    // opdater de naboerne med nye ref. til de ombyttede nodes:
  }
  NodeAt(index) {
    // samme som get(index)
    if (index < 0) {
      // hvis index parameter er negativt så return null
      console.log("Index kan ikke være negativt.");
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      // hvis currentNode ikke er null og currentIndex er mindre end parameter indexet så opdater currentnode og index
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      // hvis currentNode er null så returner null
      console.log("Index findes ikke");
      return null;
    }

    return currentNode;
  }

  remove(index) {
    if (index < 0) {
      // hvis index parameter er negativt så return null
      console.log("Index kan ikke være negativt.");
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      // hvis currentNode ikke er null og currentIndex er mindre end parameter indexet så opdater currentnode og index
      currentNode = currentNode.next;
      currentIndex++;
    }

    if (currentNode === null) {
      // hvis currentNode er null så returner null
      console.log("Index findes ikke");
      return null;
    }

    if (currentNode === this.head) {
      // hvis currentNode er head så :
      this.head = currentNode.next; // sæt den næste node til at være head.
      if (this.head !== null) {
        // hvis head på listen ikke er null så
        this.head.prev = null; // så opdater heads prev værdi til at være null
      }
    } else if (currentNode === this.tail) {
      // hvis currentNde er tail på listen så :
      this.tail = currentNode.prev; // sæt den tidligere node til at være tail
      if (this.tail !== null) {
        // hvis tail på listen ikke er null så :
        this.tail.next = null; // sæt tail på listen next pointer til at være null
      }
    } else {
      // ellers :
      currentNode.prev.next = currentNode.next; // håndter ref mellem nabo nodes til currentnode
      currentNode.next.prev = currentNode.prev;
    }
    currentNode.next = null; // og slet refs. fra currentNode så den dør i limbo.
    currentNode.prev = null;
  }

  first() {
    return this.head;
  }

  last() {
    return this.tail;
  }

  clear() {
    // hvis ikke listen har et head eller tail så er der ikke noget der binder listen og den forsvinder i limbo.
    this.head = null;
    this.tail = null;
  }

  indexOf(payload) {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null) {
      if (currentNode.data === payload) {
        return currentIndex;
      }

      currentNode = currentNode.next;
      currentIndex++;
    }

    return -1;
  }

  insertBefore(index, payload) {
    const newNode = {
      // laves et ny node element.
      prev: null,
      next: null,
      data: payload,
    };

    // samme some nodeAt()
    if (index < 0) {
      // hvis index parameter er negativt så return null
      console.log("Index kan ikke være negativt.");
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      // hvis currentNode ikke er null og currentIndex er mindre end parameter indexet så opdater currentnode og index
      currentNode = currentNode.next;
      currentIndex++;
    }
    if (currentNode === null) {
      // hvis currentNode er null så returner null
      console.log("Index findes ikke");
      return null;
    }

    if (currentIndex === 0) {
      // hvis currentindex === 0 så sæt den nye node til at være head.
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      // ellers indsættes newNode før currentNode
      newNode.prev = currentNode.prev;
      newNode.next = currentNode;
      currentNode.prev.next = newNode;
      currentNode.prev = newNode;
    }
    console.log(currentNode);
  }

  insertAfter(index, payload) {
    const newNode = {
      prev: null,
      next: null,
      data: payload,
    };

    // validere indtastet index.
    if (index < 0) {
      console.log("Index cannot be negative.");
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode !== null && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    // validere index parameter igen.
    if (currentNode === null) {
      console.log("Index not found.");
      return null;
    }

    newNode.prev = currentNode;
    newNode.next = currentNode.next;

    // hvis current.next ikke er null så :
    if (currentNode.next !== null) {
      currentNode.next.prev = newNode; // sæt currentNode's næste's prev til at pege på newNode.
    }

    currentNode.next = newNode;

    console.log(currentNode);
  }
}

// start med definationerne , tegn Alting, udskriv hele tiden hele listen, lav en ting ad gangen.
const testList = new LinkedList();
console.log(testList);
console.log(testList.NodeAt(0));
console.log(testList.NodeAt(2));
console.log(testList.NodeAt(4));

export default LinkedList;
