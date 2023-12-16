
    let array = [];

    function generateBars() {
      const elementCount = document.getElementById("elementCount").value;
      array = Array.from({ length: parseInt(elementCount, 10) }, () => Math.floor(Math.random() * 100) + 20);
      createBars();
    }

    const HIGHLIGHT_CLASS = "highlight";

    function createBars() {
      const container = document.getElementById("container");
      container.innerHTML = "";
    
      array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${value}px`;
        bar.setAttribute("data-index", index);
        container.appendChild(bar);
      });
    }


    async function swap(i, j) {
      await new Promise(resolve => setTimeout(resolve, 100));
    
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      const bars = document.querySelectorAll(".bar");
      bars[i].classList.add(HIGHLIGHT_CLASS);
      bars[j].classList.add(HIGHLIGHT_CLASS);
    
      createBars();
    }

    function randomizePositions() {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      createBars();
    }

    function startSorting(algorithm) {
      createBars();

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
        default:
          console.error('Invalid sorting algorithm');
      }
    }

    async function quickSort(start = 0, end = array.length - 1) {
      if (start >= end) return;
    
      const pivotIndex = await partition(start, end);
    
      await Promise.all([
        quickSort(start, pivotIndex - 1),
        quickSort(pivotIndex + 1, end)
      ]);
    }

    async function partition(start, end) {
      const pivotValue = array[end];
      let pivotIndex = start;
    
      for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
          await swap(i, pivotIndex);
          pivotIndex++;
        }
      }
    
      await swap(pivotIndex, end);
      removeHighlight();
      
      return pivotIndex;
    }

    async function mergeSort(start = 0, end = array.length - 1) {
      if (start >= end) return;

      const middle = Math.floor((start + end) / 2);

      await Promise.all([
        mergeSort(start, middle),
        mergeSort(middle + 1, end),
        merge(start, middle, end)
      ]);
    }

    async function merge(start, middle, end) {
  const left = array.slice(start, middle + 1);
  const right = array.slice(middle + 1, end + 1);

  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }

  while (i < left.length) {
    array[k++] = left[i++];
  }

  while (j < right.length) {
    array[k++] = right[j++];
  }

  createBars();
  await new Promise(resolve => setTimeout(resolve, 200));
}

    async function bubbleSort() {
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            await swap(j, j + 1);
          }
        }
      }
    }

    async function selectionSort() {
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          await swap(i, minIndex);
        }
      }
    }

    function removeHighlight() {
      const bars = document.querySelectorAll(".bar");
      bars.forEach(bar => bar.classList.remove(HIGHLIGHT_CLASS));
    }