var mergeSolution = [];
var mergeSteps = [];
var merge01 = [];

class Step {
    constructor(firstIndex, secondIndex, swap) {
        this.firstIndex = firstIndex;
        this.secondIndex = secondIndex;
        this.swap = swap;
    }
  
    display() {
        return `index 1: ${this.firstIndex} swap to index 2: ${this.secondIndex} swap ${this.swap}`;
    }
    return1() {
        return this.firstIndex;
    }
    return2() {
        return this.secondIndex;
    }
    return3() {
        return this.swap;
    }
}
    
class Solution {
    constructor() {
        this.solution = [];
    }
    addObject(step) {
        this.solution.push(step);
    }
    displayAll() {
        this.solution.forEach((step) => {
            console.log(step.display());
        });
    }
    countK() {
        let x = 0;
        this.solution.forEach((step) => {
          x = step.return3();
        });
        return x;
    }
    getLength() {
        return this.solution.length;
    }
    getArray() {
        return this.solution;
    }
}

function swapArray(i, j , array) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function genQuickSortSolution(start = 0, end = array.length - 1) {
    if(start >= end) return;
    const pivotIndex = partition(start,end);
    Promise.all([
      genQuickSortSolution(start,pivotIndex - 1),
      genQuickSortSolution(pivotIndex + 1, end)
    ]);
}

function partition(start,end) {
  let distance = 0;
  const pivotValue = array[end];
  let pivotIndex = start;

  for(let i = start; i < end; i++) {
    if(array[i] < pivotValue) {
      swapArray(i,pivotIndex,array);
      let step = new Step(pivotIndex,i,end);
      solution.addObject(step);
      pivotIndex++;
    }
  }
  let step = new Step(pivotIndex, end, -1);
  solution.addObject(step);
  swapArray(pivotIndex,end,array);
  return pivotIndex;
}

function genBubbleSortSolution() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      if (array[j] > array[j + 1]) {
        swapArray(j,j+1,array);
        let step = new Step(j, j + 1, 1);
        solution.addObject(step);
      } else {
        // let step = new Step(j, j + 1, 0);
        // solution.addObject(step);
      }
    }
  }
  //solution.displayAll();
}

function genSelectionSortSolution() {
    const n = array.length;
    let distance = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        swapArray(i, minIndex,array);
        let step = new Step(i,minIndex,distance);
        distance = (minIndex - i);
        solution.addObject(step);
      }
    }
}

function genInsertionSortSolution() {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0 && array[j] < array[j - 1]) {
      let step = new Step(j-1,j,1);
      solution.addObject(step);
      swapArray(j,j-1,array);
      j--;
    }
  }
}

function genMergeSortSolution(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const middle = Math.floor((start + end) / 2);
  Promise.all([
    genMergeSortSolution(start, middle),
    genMergeSortSolution(middle + 1, end),
    merge(start, middle, end)
  ]);
}

function merge(start, middle, end) {
  let x = [];
  
  const left = array.slice(start, middle + 1);
  const right = array.slice(middle + 1, end + 1);

  mergeSteps.push({left1: start, left2: middle, right1: middle + 1, right2: end});
  console.log("left: " + start + " + " + middle + " right: " + (middle + 1) + " + " + end);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      x.push('0');
      array[k++] = left[i++];
    } else {
      x.push('1');
      array[k++] = right[j++];
    }
  }

  while (i < left.length) {
    x.push(0)
    array[k++] = left[i++];
  }

  while (j < right.length) {
    x.push('1');
    array[k++] = right[j++];
  }
  let mergeArray = [...array];
  mergeSolution.push(mergeArray);
  merge01.push(x);
  console.log(x.join(' '));
}

