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

  const n = arr.length;
  const root = buildTree(arr, 0, n - 1);

  console.log(root);

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

  return { prettyPrint };
}

const testArray = [1, 2, 3, 4, 5, 6, 7];
const bst = createTree(testArray);
bst.prettyPrint();
