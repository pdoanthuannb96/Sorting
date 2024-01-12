var solution = new Solution();
let isPaused = false;
let currentIndex = 0;
let currentStepIndex = 0;
let timer;
let stepTimer;
var id = null;
let sortingInterval;
var widthBaseOnArray = 2;
var frameRate = 1;
var tmpArray = [213,78,95,201,124,161,190,179,180,134,68];

function pause() {
    document.getElementById('startSorting').disabled = false;
    document.getElementById('pauseSorting').disabled = true;
    isPaused = true;
    clearTimeout(timer);
    clearTimeout(stepTimer);
}

function bubbleSort() {
    genBubbleSortSolution();
    
    const moves = [];
    solution.getArray().forEach(step => {
        moves.push({ i: step.return1(),j : step.return2(), k: step.return3()});
    });

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

function move(i,j) {
    let targetElementI = document.querySelector(`.bar[data-index="${i}"]`);
    let targetElementJ = document.querySelector(`.bar[data-index="${j}"]`);
    let rectI = targetElementI.getBoundingClientRect();
    let rectJ = targetElementJ.getBoundingClientRect();
    let x = rectJ.left - rectI.left;
    setTimeout(() => {
        let xx = 0;
        animateFrame();
        
        function animateFrame() {
            if (xx == x) {
                swapArray(i, j, originArray);
                targetElementI.style.backgroundColor = '#5500ff';
                targetElementJ.style.backgroundColor = '#5500ff';
                createBars(originArray);
            } else {
                xx += 4;
                targetElementI.style.position = "relative";
                targetElementI.style.left = xx + 'px';
                targetElementI.style.backgroundColor = '#b30000';
                targetElementJ.style.position = "relative";
                targetElementJ.style.left = - xx + 'px';
                targetElementJ.style.backgroundColor = '#b30000';
                setTimeout(animateFrame, delaySorting); 
            }
        }
    }, delaySorting * barWidth * (j - i) / 2);
}

function up(des,i) {
    let frame;
    let elementI = document.querySelector(`.bar[data-index="${i}"]`);
    let rectI = elementI.getBoundingClientRect();    
    x = arrayPos[des] - arrayPos[i];
    if(des > i) {
        frame = 4;
    } else {
        frame = -4;
    }
    //300
    setTimeout(() => {
        let xx = rectI.top - 231.5;
        console.log("xx :" + xx );
        animateFrame();
        function animateFrame() {
            if (xx == 0) {
                // elementI.style.backgroundColor = '#999900';
            } else {
                xx -= 4;
                elementI.style.position = "relative";
                elementI.style.top = xx + 'px';
                // elementI.style.backgroundColor = '#b30000';
                setTimeout(animateFrame, delaySorting); 
            }
        }
    }, 200);

    setTimeout(() => {
        let xxx = 0;
        animateFrame();
        function animateFrame() {
            if (xxx == x) {
                elementI.style.backgroundColor = '#999900';
            } else {
                xxx += frame;
                elementI.style.position = "relative";
                elementI.style.left = xxx + 'px';
                elementI.style.backgroundColor = '#b30000';
                setTimeout(animateFrame, delaySorting);
            }
        }
    }, 400);
}

function downSubArray(i,mid,j) {
    for(let k = i; k < j; k++) {
        let color;
        if(k <= mid) {
            console.log("left");
            color = "#b30000";
        } else if (k > mid) {
            console.log("right");
            color = "#009900";
        }
        let targetElement = document.querySelector(`.bar[data-index="${k}"]`);
        setTimeout(() => {
            let x = 0;
            animateFrame();
            function animateFrame() {
                if (x == 300) {
                    // targetElement.style.backgroundColor = '#5500ff';
                } else {
                    x += 4;
                    targetElement.style.position = "relative";
                    targetElement.style.top = x + 'px';
                    targetElement.style.backgroundColor = color;
                    setTimeout(animateFrame, delaySorting);
                }
            }
        }, 200);
    }
}

function selectionSort() {
    //console.log("Sorting: Selection Sort")
    genSelectionSortSolution();
    const moves = [];
    solution.getArray().forEach(step => {
        moves.push({ i: step.return1(),j : step.return2(), k: step.return3()});
        //console.log("Selection Sort Step :" + step.return1() + " " + step.return2() + " " + step.return3());
    });

    const performMove = () => {
        const currentMove = moves[currentIndex];
        if (currentMove) {
            move(currentMove.i, currentMove.j);
        }
        currentIndex++;

        if (currentIndex < moves.length && !isPaused) {
            var timePerform = (currentMove.j - currentMove.i) * delaySorting * barWidth
            timer = setTimeout(performMove, timePerform);
        } else {
            timer = setTimeout(performMove, timePerform + 400 * delaySorting);
            endSort(array);
        }
    };
    performMove();
}

function insertionSort() {
    console.log("Sorting: Insertion Sort")
    genInsertionSortSolution();
    const moves = [];
    solution.getArray().forEach(step => {
        moves.push({ i: step.return1(),j : step.return2(), k: step.return3()});
    });

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
            endSort(array);
        }
    };
    performMove();
}

function mergeSort() {
    //     genMergeSortSolution();
    // const function1 = () => {
    //     const currentStepX = mergeSteps[currentIndex];

    //     if(currentIndex < mergeSolution.length && !isPaused) {
    //         if(currentIndex > 0) {
    //             createMergeColor(mergeSolution[currentIndex - 1],currentStepX.left1,currentStepX.left2,currentStepX.right2);
    //         }
    //     }
    //     currentIndex++;    
    //     setTimeout(function1, 120 * delaySorting);
    // };

    // const function2 = () => {
    //     const currentStep = mergeSteps[currentStepIndex];
    //     const currentArrayX = mergeSolution[currentStepIndex];

    //     if(currentStepIndex < mergeSteps.length && !isPaused) {
    //         createMergedBars(currentArrayX,currentStep.left1,currentStep.right2);
    //     }
    //     currentStepIndex++;
    //     setTimeout(function2, 120 * delaySorting);
    // };

    // timer = setTimeout(function1, 0);
    // stepTimer = setTimeout(function2, 60 * delaySorting);
    // 
    test();
}

function quickSort() {
    genQuickSortSolution();
    const moves = [];
    solution.getArray().forEach(step => {
        if(step.return1() != step.return2()) {
            moves.push({ i: step.return1(),j : step.return2(), k: step.return3()});
        }
    });

    const performMove = () => {
        const currentMove = moves[currentIndex];
        //k = -1 => move pivot and array[pivotIndex]
        if (currentMove.k === -1) {
            move(currentMove.i, currentMove.j);
        } else {
            changeBarColor(currentMove.k, 'green');
            move(currentMove.i, currentMove.j);
        }
        currentIndex++;
    
        if (currentIndex < moves.length && !isPaused) {
            var timePerform = (currentMove.j - currentMove.i) * barWidth * delaySorting;  
            timer = setTimeout(performMove, timePerform);
        } else {
            timer = setTimeout(performMove, timePerform + 400 * delaySorting);
            endSort(array);
        }
    };
    performMove();
}

function changeBarColor(index, color) {
  const targetElement = document.querySelector(`.bar[data-index="${index}"]`);
  if (targetElement) targetElement.style.backgroundColor = color;
}

function test() {
    console.log(arrayPos.join(' '));
    createBars(tmpArray);
    array = tmpArray;
    genMergeSortSolution();
    console.log(mergeSteps[0].left1);

    setTimeout(() => {
        downSubArray(mergeSteps[0].left1,mergeSteps[0].left2,mergeSteps[0].right2 + 1);
    },1000*1);

    setTimeout(() => {
        up(0, 1);
    },1000*2);

    setTimeout(() => {
        up(1, 0);
    },1000*3);

    setTimeout(() => {
        createBars(mergeSolution[0]);
    },1000*4);

    setTimeout(() => {
        downSubArray(mergeSteps[1].left1,mergeSteps[1].left2,mergeSteps[1].right2 + 1);
    },1000*5);

    setTimeout(() => {
        up(0, 0);
    },1000*6);

    setTimeout(() => {
        up(1, 2);
    },1000*7);

    setTimeout(() => {
        up(2, 1);
    },1000*8);

    setTimeout(() => {
        createBars(mergeSolution[1]);
    },1000*9);

    setTimeout(() => {
        downSubArray(mergeSteps[2].left1,mergeSteps[2].left2,mergeSteps[2].right2 + 1);
    },1000*10);

    setTimeout(() => {
        up(3, 4);
    },1000*11);

    setTimeout(() => {
        up(4, 3);
    },1000*12);

    setTimeout(() => {
        createBars(mergeSolution[2]);
    },1000*13);

    setTimeout(() => {
        downSubArray(mergeSteps[3].left1,mergeSteps[3].left2,mergeSteps[3].right2 + 1);
    },1000*14);

    setTimeout(() => {
        up(3,3);
    },1000*15);

    setTimeout(() => {
        up(4, 5);
    },1000*16);

    setTimeout(() => {
        up(5, 4);
    },1000*17);

    setTimeout(() => {
        createBars(mergeSolution[3]);
        //001110
    },1000*18);

    setTimeout(() => {
        downSubArray(mergeSteps[4].left1,mergeSteps[4].left2,mergeSteps[4].right2 + 1);
    },1000*19);

    setTimeout(() => {
        up(0, 0);
    },1000*20);

    setTimeout(() => {
        up(1, 1);
    },1000*21);

    setTimeout(() => {
        up(2, 3);
    },1000*22);

    setTimeout(() => {
        up(3, 4);
    },1000*23);

    setTimeout(() => {
        up(4, 5);
    },1000*24);

    setTimeout(() => {
        up(5, 2);
    },1000*25);

    setTimeout(() => {
        createBars(mergeSolution[4]);
        //10
    },1000*26);

    setTimeout(() => {
        downSubArray(mergeSteps[5].left1,mergeSteps[5].left2,mergeSteps[5].right2 + 1);
    },1000*27);

    setTimeout(() => {
        up(6, 7);
    },1000*28);

    setTimeout(() => {
        up(7, 6);
    },1000*29);

    setTimeout(() => {
        createBars(mergeSolution[5]);
        //010
    },1000*30);

    setTimeout(() => {
        downSubArray(mergeSteps[6].left1,mergeSteps[6].left2,mergeSteps[6].right2 + 1);
    },1000*31);

    setTimeout(() => {
        up(6, 6);
    },1000*32);

    setTimeout(() => {
        up(7, 8);
    },1000*33);

    setTimeout(() => {
        up(8, 7);
    },1000*34);

    setTimeout(() => {
        createBars(mergeSolution[6]);
        //10
    },1000*35);

    setTimeout(() => {
        downSubArray(mergeSteps[7].left1,mergeSteps[7].left2,mergeSteps[7].right2 + 1);
    },1000*36);

    setTimeout(() => {
        up(9, 10);
    },1000*37);

    setTimeout(() => {
        up(10, 9);
    },1000*38);

    setTimeout(() => {
        createBars(mergeSolution[7]);
        //11000
    },1000*39);

    setTimeout(() => {
        downSubArray(mergeSteps[8].left1,mergeSteps[8].left2,mergeSteps[8].right2 + 1);
    },1000*40);

    setTimeout(() => {
        up(6, 9);
    },1000*41);

    setTimeout(() => {
        up(7, 10);
    },1000*42);

    setTimeout(() => {
        up(8, 6);
    },1000*43);

    setTimeout(() => {
        up(9, 7);
    },1000*44);

    setTimeout(() => {
        up(10, 8);
    },1000*45);

    setTimeout(() => {
        createBars(mergeSolution[8]);
        //1 0 0 0 1 0 1 1 1 0 0
    },1000*46);

    setTimeout(() => {
        downSubArray(mergeSteps[9].left1,mergeSteps[9].left2,mergeSteps[9].right2 + 1);
    },1000*47);

    setTimeout(() => {
        up(0, 6);
    },1000*48);

    setTimeout(() => {
        up(1, 0);
    },1000*50);

    setTimeout(() => {
        up(2, 1);
    },1000*51);

    setTimeout(() => {
        up(3, 2);
    },1000*52);

    setTimeout(() => {
        up(4, 7);
    },1000*53);

    setTimeout(() => {
        up(5, 3);
    },1000*54);

    setTimeout(() => {
        up(6, 8);
    },1000*55);

    setTimeout(() => {
        up(7, 9);
    },1000*56);

    setTimeout(() => {
        up(8, 10);
    },1000*57);

    setTimeout(() => {
        up(9, 4);
    },1000*58);

    setTimeout(() => {
        up(10, 5);
    },1000*59);

    setTimeout(() => {
        createBars(mergeSolution[9]);
        //1 0 0 0 1 0 1 1 1 0 0
    },1000*60);
}

function testX() {
    let x = 0;
    genMergeSortSolution();
    // downSubArray(0,6);
    // setTimeout(() => {
    //     up(0, 0);
    // },1000*1);
    // setTimeout(() => {
    //     up(1, 3);
    // },1000*2);
    // setTimeout(() => {
    //     up(2, 1);
    // },1000*3);
    // setTimeout(() => {
    //     up(3, 4);
    // },1000*4);
    // setTimeout(() => {
    //     up(4, 2);
    // },1000*5);
    // setTimeout(() => {
    //     up(5, 5);
    // },1000*6);
    // merge01.forEach((value,index) => {
    //     let currentStepY = mergeSteps[index];
    //     let first = currentStepY.left1;
    //     let left = currentStepY.left1;
    //     let right = currentStepY.right1;
    //     value.forEach((each,i) => {
    //         setTimeout(() => {
    //             if(each == 0) {
    //                 up(first++,left++);
    //                 console.log("left");
    //             } else {
    //                 up(first++,right++);
    //                 console.log("right");
    //             }
    //         },i*200);
    //     });
    // });
}

