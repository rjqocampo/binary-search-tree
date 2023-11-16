function createRandomArray() {
  const arr = [];

  for (let i = 0; i < 15; i++) {
    arr.push(Math.floor(Math.random() * 15));
  }

  return arr;
}

function createNode(input) {
  const data = input;
  const left = null;
  const right = null;
  return { data, left, right };
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
  console.log("Parsed", array);
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

  function insert(input, node = root) {
    console.log(node);
    if (node === null) {
      node = createNode(input);
      return node;
    }

    if (input === node.data) {
      console.log("Existing node");
    }

    if (input < node.data) {
      node.left = insert(input, node.left);
    } else if (input > node.data) {
      node.right = insert(input, node.right);
    }

    return node;
  }

  return { prettyPrint, insert };
}

const orderedTestArray = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const randomTestArray = createRandomArray();

const bst = createTree(orderedTestArray);
bst.insert(1);
bst.prettyPrint();

/* 
Must check if existing value before inserting
*/
