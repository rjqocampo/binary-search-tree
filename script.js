function createRandomArray() {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }

  return arr;
}

function createNode(input) {
  const data = input;
  const left = null;
  const right = null;
  return { data, left, right };
}

function read(node) {
  console.log(node.data);
}

function timesTwo(node) {
  return node.data * 2;
}

function createTree(arr) {
  function buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = createNode(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }

  function bubbleSort(arr) {
    const len = arr.length;
    let swapped;

    for (let i = 0; i < len - 1; i++) {
      swapped = false;
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }
    }

    return arr;
  }

  function removeDupe(arr) {
    const unique = [];

    arr.forEach((data) => {
      if (!unique.includes(data)) {
        unique.push(data);
      }
    });

    return unique;
  }

  console.log("Original", arr);
  const array = removeDupe(bubbleSort(arr));
  const root = buildTree(array, 0, array.length - 1);

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function insertNode(input, node = root) {
    if (node === null) {
      node = createNode(input);
      console.log(`Insert node: ${input}`);
      return node;
    }

    if (input === node.data) {
      console.log("Existing node");
    }

    if (input < node.data) {
      node.left = insertNode(input, node.left);
    } else if (input > node.data) {
      node.right = insertNode(input, node.right);
    }

    return node;
  }

  function deleteNode(input, node = root) {
    if (node === null) {
      return node;
    }

    if (input < node.data) {
      node.left = deleteNode(input, node.left);
      return node;
    } else if (input > node.data) {
      node.right = deleteNode(input, node.right);
      return node;
    }

    if (node.left === null) {
      let temp = node.right;
      delete node;
      return temp;
    } else if (node.right === null) {
      let temp = node.left;
      delete node;
      return temp;
    } else {
      let succParent = node;
      let succ = node.right;

      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;

      delete succ;
      return node;
    }
  }

  function find(input, node = root) {
    if (node === null) return;

    if (input === node.data) {
      return node;
    }

    let a = find(input, node.left);
    if (a) return a;

    let b = find(input, node.right);
    if (b) return b;

    return null;
  }

  function levelOrder(callback, node = root) {
    let arr = [];
    let queue = [];

    if (node === null) return;

    queue.push(node);

    while (queue.length !== 0) {
      let current = queue.shift();

      if (callback) {
        callback(current);
      }

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      arr.push(current.data);
    }

    return arr;
  }

  function preOrder(callback, node = root, arr) {
    let array = arr || [];
    if (node === null) return [];

    if (callback) {
      array.push(callback(node));
    } else {
      array.push(node.data);
    }

    preOrder(callback, node.left, array);
    preOrder(callback, node.right, array);

    return array;
  }

  function inOrder(callback, node = root, arr) {
    let array = arr || [];
    if (node === null) return [];

    inOrder(callback, node.left, array);

    if (callback) {
      array.push(callback(node));
    } else {
      array.push(node.data);
    }

    inOrder(callback, node.right, array);

    return array;
  }

  function postOrder(callback, node = root, arr) {
    let array = arr || [];
    if (node === null) return [];

    postOrder(callback, node.left, array);
    postOrder(callback, node.right, array);

    if (callback) {
      array.push(callback(node));
    } else {
      array.push(node.data);
    }

    return array;
  }

  function height(node = root) {
    if (node === null) return -1;
    let a = height(node.left);
    let b = height(node.right);
    return Math.max(a, b) + 1;
  }

  function depth(input, node = root, edge) {
    let total = edge + 1 || 0;

    if (node === null) return;

    if (input === node) {
      return total;
    }

    let a = depth(input, node.left, total);
    if (a) return a;

    let b = depth(input, node.right, total);
    if (b) return b;
  }

  function isBalanced(node = root) {
    /* 
      Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

      I: bst root
      O: true or false

      Problem: 
      must get heights, check their difference, should not be more than 1

      Pseudocode:
      Traverse leaf and return height of each leaf
      Store the height of leaf
      Check difference

      Current Challenges:
      How to evaluate to true or false while returning height in my base case
      Difference will evaluate to 2 or more if long list. See Node 6

      Notes:
      When a recursive call evaluates to false, just bubble it up don't compare
    */

    if (node === null) return true;

    let leftHeight = bst.height(node.left);
    let rightHeight = bst.height(node.right);
    let difference = Math.abs(leftHeight - rightHeight);

    console.log(
      `Node: ${node.data} || A:${leftHeight} B:${rightHeight} || Diff: ${difference}`,
    );

    if (difference >= 2) {
      console.log("unbalanced");
      return false;
    }

    let leftBalance = isBalanced(node.left);
    let rightBalance = isBalanced(node.right);

    return leftBalance && rightBalance;
  }

  return {
    prettyPrint,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}

const testArray = [1, 2, 3];
const orderedTestArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const randomTestArray = createRandomArray();

const bst = createTree(orderedTestArray);
// bst.insertNode(9);
// bst.insertNode(21);
// console.log(bst.insertNode(13));
bst.prettyPrint();
// console.log(bst.levelOrder(read));
// console.log(bst.preOrder());
// console.log(bst.inOrder());
// console.log(bst.postOrder());
// console.log(bst.find(3));
// console.log(bst.height(bst.find(5)));
// console.log(bst.depth(bst.find(10)));
console.log(bst.isBalanced());

/* 
Must check if existing value before inserting
*/
