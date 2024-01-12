let array = [];
var originArray = [];
var delaySorting;
var barWidth;
let arrayPos = [];

function onLoad() {
  saveSpeed();
  saveElement(1);
  document.getElementById('pauseSorting').disabled = true;
}

//save speed of sorting to variable speed
function saveSpeed() {
  delaySorting = document.getElementById("mySlider").value;
  delaySorting = Math.floor(delaySorting/100);
  console.log("speed :" + Math.floor(delaySorting/100) + "ms");
}

//save number of element, create element (random), and show in UI
function saveElement(x) {
    const elementCount = document.getElementById("elementCount").value;
    console.log("number of element :" + elementCount);
    if (x == 1) {
      array = [213,78,95,201,124,161,190,179,180,134,68];
    } else {
      array = Array.from({ length: parseInt(elementCount, 10) }, () => Math.floor(Math.random() * 300) + 20);
    }
    //Thật là một khám phá khoa học đến từ Edward XD
    originArray = null;
    originArray = [...array];
    arrayPos = [];
    createBars(array);
}

//create element in UI
function createBars(array) {
    const container = document.getElementById("container");
    container.innerHTML = "";
  
    array.forEach((value, index) => {
      let n = array.length;
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${value}px`;
      //Lấy width của brower
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      barWidth = Math.floor((windowWidth - 300)/n);
      while(barWidth%4) {
        barWidth = barWidth - 1;
      }
      //console.log("bar-width :" + barWidth);
      bar.style.width = `${barWidth-4}px`;
      console.log("barWidth: " + barWidth);
      //let targetElement = document.querySelector(`.bar[data-index="${index}"]`);
      // let root = document.querySelector(`.bar[data-index="${0}"]`);
      // let x = targetElement.getBoundingClientRect();
      // let y = root.getBoundingClientRect();
      // console.log("pos :" + (x.left - y.left));
      bar.setAttribute("data-index", index);
      container.appendChild(bar);
      let targetElement = document.querySelector(`.bar[data-index="${index}"]`);
      let root = document.querySelector(`.bar[data-index="${0}"]`);
      let x = targetElement.getBoundingClientRect();
      let y = root.getBoundingClientRect();
      console.log("x :" + x.left);
      console.log("y :" + y.left);
      //console.log("pos :" + (x.left - y.left));
      arrayPos.push(x.left - y.left);
    });
}

function createMergedBars(array,i,j) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  array.forEach((value, index) => {
    let n = array.length;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    //Lấy width của brower
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    barWidth = Math.floor((windowWidth - 300)/n);
    while(barWidth%4) {
      barWidth = barWidth - 1;
    }
    //console.log("bar-width :" + barWidth);
    bar.style.width = `${barWidth-4}px`;
    bar.setAttribute("data-index", index);
    if (index >= i && index <= j) {
      bar.style.backgroundColor = "#999900";  // Corrected line
    } else {
      bar.style.backgroundColor = "#5500ff";  // Corrected line
    }
    container.appendChild(bar);
  });
}

function createMergeColor(array,start,middle,end) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  array.forEach((value, index) => {
    let n = array.length;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    //Lấy width của brower
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    barWidth = Math.floor((windowWidth - 300)/n);
    while(barWidth%4) {
      barWidth = barWidth - 1;
    }
    //console.log("bar-width :" + barWidth);
    bar.style.width = `${barWidth-4}px`;
    bar.setAttribute("data-index", index);
    if (index >= start && index <= middle) {
      bar.style.backgroundColor = "#b30000";  // Corrected line
    } else if (index > middle && index <= end) {
      bar.style.backgroundColor = "#00802b";  // Corrected line
    } else {
      bar.style.backgroundColor = "#5500ff";
    }
    container.appendChild(bar);
  });
}

function endSort(array) {
  document.getElementById('startSorting').disabled = true;
  document.getElementById('pauseSorting').disabled = true;
  const container = document.getElementById("container");
  container.innerHTML = "";

  array.forEach((value, index) => {
    let n = array.length;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    //Lấy width của brower
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    barWidth = Math.floor((windowWidth - 300)/n);
    while(barWidth%4) {
      barWidth = barWidth - 1;
    }
    //console.log("bar-width :" + barWidth);
    bar.style.width = `${barWidth-4}px`;
    bar.style.backgroundColor = '#b30000';
    bar.setAttribute("data-index", index);
    container.appendChild(bar);
  });
}

//switch-case choose algorithm
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

function changeBarColor(index, color) {
  const targetElement = document.querySelector(`.bar[data-index="${index}"]`);
  if (targetElement) targetElement.style.backgroundColor = color;
}

