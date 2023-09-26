'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
let from;
let to;
let fromStack;
let toStack;
// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (from , to) => {
  fromStack = stacks[from];
  toStack = stacks[to];
if (isLegal(from, to)) {
  const piece = fromStack.pop();
  toStack.push(piece);
 } else {
  console.log ("This move is Illegal! Try again.")
 }
 }


//this function should check if the proposed move is legal or not

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (from, to) => {

  fromStack = stacks[from];
  toStack = stacks[to];

  return fromStack.length > 0 && (toStack.length === 0 || fromStack[fromStack.length - 1] < toStack[toStack.length - 1]);

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
 return stacks.b.length === 4 || stacks.c.length === 4;

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);

  if (checkForWin()){
    console.log("You won!");
    process.exit(0);
  }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
