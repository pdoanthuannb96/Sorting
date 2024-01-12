# Project 1: Sort Visualizer
## Introduction
| Product       | Caro Game                       |
| ------------- | ------------------------------- |
| Author (Name) | Thuan, Phan Doan                |
| StudentID     | 20210822                        |
| Email         | pdoanthuannb96@gmail.com        |
| Student Mail  | Thuan.PD210822@sis.hust.edu.vn  |
| Frontend      | HTML, CSS, JavaScript           |

## Project Demo
You can experience the "Sort Visualizer" through my website below: [Demo Sort Visualizer](https://project1.buckytank.site)

## Project Overview
Visualize 5 Sort Algorithms (Quick, Merge, Bubble, Insertion, Selection). Below is a detailed description of the progess/ideal and function in project:


### Using Animation
- JavaScript will sort imidiately all element in 1 array (if only algorithm).
- So I using the algorithm for create the step for random array
- Implement each step with animation
- The step - solution can stop with "pause" function

### File in Project:
| File          | Usage                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| index.html    | Html file of project                                                                                      |
| style.css     | Style sheet file                                                                                          |
| script.js     | For the header "SORT VISUALIZER"                                                                          |
| object.js     | The object file: define the object to contain step for each sort algorithm and function to generate step  |
| sort.js       | Implement the step in object.js with animation to visualize the Sort Algorithm                            |

## Run
- Run file [index.html](index.html) with any brower
- Access to [Demo Sort Visualizer](https://project1.buckytank.site)

## Code Explain:

- The Step Class in [object.js](object.js). This class save a step (like swap element) an push it to Solution Class

```javascript
# -*- coding: utf-8 -*-
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
```

- For each Algorithm have a function to generate the Solution. Example with the Bubble Sort:

```javascript
# -*- coding: utf-8 -*-
function genBubbleSortSolution() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      if (array[j] > array[j + 1]) {
        swapArray(j,j+1,array);
        let step = new Step(j, j + 1, 1);
        solution.addObject(step);
      }
    }
  }
}
```

- After have all step ob Bubble Sort, implement the step with animation:
```javascript
# -*- coding: utf-8 -*-
function bubbleSort() {
    genBubbleSortSolution();

    //create the moves array to format the step
    const moves = [];
    solution.getArray().forEach(step => {
        moves.push({ i: step.return1(),j : step.return2(), k: step.return3()});
    });

    //run 1 move (1 step) with animation swap
    const performMove = () => {
        const currentMove = moves[currentIndex];
        if (currentMove && currentMove.k) {
            move(currentMove.i, currentMove.j);
        }
        currentIndex++;

        if (currentIndex < moves.length && !isPaused) {
            timer = setTimeout(performMove, 2 * delaySorting * barWidth / 2);
        } else {
            timer = setTimeout(performMove, 2 * delaySorting * barWidth / 2 + 5 * delaySorting);
            //endSort(array);
        }
    };
    performMove();
}
```

- Additional function:
```javascript
# -*- coding: utf-8 -*-
//first: create the index count variable
//second: create the isPaused variable to save the state: Pause/Resume
function pause() {
    document.getElementById('startSorting').disabled = false;
    document.getElementById('pauseSorting').disabled = true;
    isPaused = true;
    clearTimeout(timer);
}
//count the current step

//start or resume the visualize
function startSorting(algorithm) {
  isPaused = false;
  document.getElementById('startSorting').disabled = true;
  document.getElementById('pauseSorting').disabled = false;
  switch (algorithm) {
    case 'quickSort':
      quickSort();
      break;
    case 'mergeSort':
      mergeSort();
      break;
    case 'bubbleSort':
      bubbleSort();
      break;
    case 'selectionSort':
      selectionSort();
      break;
    case 'insertionSort':
      insertionSort();
      break;
    default:
      console.error('Invalid sorting algorithm');
  }
}
```

Thank you for visiting and using this project!
