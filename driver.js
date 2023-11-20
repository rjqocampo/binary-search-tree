import { createRandomArray, createTree } from "./script.js";

// const testArray = [1, 2, 3];
// const orderedTestArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const randomTestArray = createRandomArray();

const bst = createTree(randomTestArray);
console.log(bst.isBalanced());
bst.prettyPrint();

console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.inOrder());
console.log(bst.postOrder());

bst.insertNode(105);
bst.insertNode(127);
bst.insertNode(144);
console.log(bst.isBalanced());
bst.prettyPrint();

console.log(bst.isBalanced(bst.rebalance()));
bst.prettyPrint(bst.rebalance());
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.inOrder());
console.log(bst.postOrder());
