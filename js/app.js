let barSize = [];
let arraySize = 60;
let delay;
GenrateNewArray(arraySize);


function changeDelay(){
    var slider = document.getElementById("delayTime");
    delay = slider.value;

}
function changeArray(){
    arraySize = document.getElementById("ArraySize").value;
    barSize.length=0;
    var width = Math.floor(750 / arraySize)
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".bar"));
    GenrateNewArray(arraySize,width);
}


function GenrateNewArray(arraySize,tempWidth){
    for(let i=0;i<arraySize;i++)
    {
        barSize.push(Math.floor(Math.random()*(400-20)+20));
        let bar = document.getElementById("bars-container");
        let node = document.createElement("DIV");
        node.style.height = ` ${barSize[i]}px `;
        node.style.width = ` ${tempWidth}px `;
        node.classList.add("bar");
        node.setAttribute('id', `${i}`);
        bar.appendChild(node);
   
    }

}

function GenrateArray(){
    for(let i=0;i<arraySize;i++)
    {
        barSize[i] = Math.floor(Math.random()*(400-20)+20);
        let bar = document.getElementById(`${i}`);
        bar.style.height = ` ${barSize[i]}px `;
    }
}

//disable buttons
function disableButton(buttonId, status) {
    button = [bubbleSort, selectionsort, insertionsort, quicksort, mergesort, newArray];
    for (let i = 0; i < button.length; i++) {
        if (i !== buttonId) {
            if (status) {
                button[i].disabled = true;
                document.getElementById("ArraySize").disabled = true;
    
            } else {
                button[i].disabled = false;
                document.getElementById("ArraySize").disabled = false;
 
            }
        }
    }
}

//bubble sort
async function BubbleSort(){
    disableButton(0, 1)
    let n = arraySize;
    let BarArray = document.querySelectorAll(".bar");
    for(let i=0;i<n;i++)
    {
        for(let j=0;j<n-i-1;j++)
        {
            BarArray[j].style.background="Blue";
            BarArray[j+1].style.background="Blue";

            //wait for .1s
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if (barSize[j] > barSize[j + 1]) {
                [barSize[j], barSize[j + 1]] = [barSize[j + 1], barSize[j]];
                BarArray[j].style.height = `${barSize[j]}px`;
                BarArray[j+1].style.height = `${barSize[j + 1]}px`;
                BarArray = document.querySelectorAll(".bar");
            }
            BarArray[j].style.background="rgb(2, 31, 84)";
            BarArray[j+1].style.background="rgb(2, 31, 84)";

        }
        BarArray[n-i-1].style.background="rgb(239 169 140)";
    }
    BarArray.forEach(element => {
        element.style.backgroundColor = "rgb(2, 31, 84)";
    });
    disableButton(0, 0)
}

//selection sort
async function SelectionSort(){
    disableButton(1, 1)
    let n = arraySize;
    let BarArray = document.querySelectorAll(".bar");

    for(let i=0;i<n;i++)
    {
        let min= i;

        for(let j=i+1;j<n;j++)
        {
            BarArray[min].style.background="blue";
            BarArray[j].style.background="gray";

            //wait for .1s
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            if(barSize[min]>barSize[j])
            {
                BarArray[min].style.background="rgb(2, 31, 84)"; 
                min = j;
                BarArray[min].style.background="blue";   
            }
            BarArray[j].style.background="rgb(2, 31, 84)";
        
        }   
        
        [barSize[i], barSize[min]] = [barSize[min], barSize[i]];
        BarArray[i].style.height = `${barSize[i]}px`;
        BarArray[min].style.height = `${barSize[min]}px`;
        BarArray[i].style.background="rgb(239 169 140)";
        

    }
    BarArray.forEach(element => {
        element.style.backgroundColor = "rgb(2, 31, 84)";
    });

    disableButton(1, 0)
    
}



//insertion sort
async function insertionSort() {
    disableButton(2, 1)
    let i, j, key;
    let BarArray = document.querySelectorAll(".bar");
    // sorted side color change to white
    BarArray[0].style.backgroundColor = "rgb(239 169 140)";
    for (i = 1; i < barSize.length; i++) {

        BarArray[i].style.backgroundColor = "blue"

        //pause for delay sec
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )

        key = barSize[i];
        j = i - 1;

        // Algorithm
        while (j >= 0 && key < barSize[j]) {
            BarArray[j].style.backgroundColor = "blue";
            BarArray[j + 1].style.height = BarArray[j].style.height;
            barSize[j + 1] = barSize[j];
            j = j - 1;

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            )
            // Provide white color to the sorted part
            for (let k = i; k >= 0; k--) {
                BarArray[k].style.backgroundColor = "rgb(239 169 140)";
            }
        }
        barSize[j + 1] = key;
        BarArray[j + 1].style.height = `${key}px`;
    }
    BarArray.forEach(element => {
        element.style.backgroundColor = "rgb(2, 31, 84)";
    });
    disableButton(2, 0)
}

//quick sort
async function quickSort() {
    disableButton(3, 1)
    // call the quickSort recursive function
    startIdx = 0;
    endIdx = barSize.length - 1;
    await quickSortHelper(barSize, startIdx, endIdx);
    let BarArray = document.querySelectorAll(".bar");

    BarArray.forEach(element => {
        element.style.backgroundColor = "rgb(2, 31, 84)";
    });
    disableButton(3, 0)
}

async function quickSortHelper(array, startIdx, endIdx) {
    if (startIdx < endIdx) {
        let partitionIdx = await partition(array, startIdx, endIdx);
        //recursive call for left half and right half
        await quickSortHelper(array, startIdx, (partitionIdx - 1));
        await quickSortHelper(array, (partitionIdx + 1), endIdx);
    }
    else
    {
        let BarArray = document.querySelectorAll(".bar")
        BarArray[startIdx].style.backgroundColor = "rgb(239 169 140)";
    }
}

async function partition(array, startIdx, endIdx) {
    let BarArray = document.querySelectorAll(".bar")

    let pivot = array[endIdx]; //select last elem as pivot
    BarArray[endIdx].style.backgroundColor = "blue"

    let pivotIdx = startIdx;

    //wait
    let temp;
    for (let i = startIdx; i < endIdx; i++) {
        BarArray[i].style.backgroundColor = "darkgrey"
        //wait
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )
        if (array[i] < pivot) {
            //swap
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            //swap
            temp = BarArray[i].style.height;
            BarArray[i].style.height = BarArray[pivotIdx].style.height;
            BarArray[pivotIdx].style.height = temp;
            pivotIdx++;
            BarArray = document.querySelectorAll(".bar")
        }
        BarArray[i].style.backgroundColor = "rgb(2, 31, 84)"
    }

    ///swap pivot elem to its correct position
    [array[endIdx], array[pivotIdx]] = [array[pivotIdx], array[endIdx]]

    temp = BarArray[endIdx].style.height;
    BarArray[endIdx].style.height = BarArray[pivotIdx].style.height;
    BarArray[pivotIdx].style.height = temp;
    BarArray[pivotIdx].style.backgroundColor = "rgb(239 169 140)";
    BarArray[endIdx].style.backgroundColor = "rgb(239 169 140)";
    //wait
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
    )
    return pivotIdx;
}

//Mergesort
async function mergeSort() {
    disableButton(4, 1)
    await mergeSortHelper(barSize, 0, barSize.length - 1);
    let BarArray = document.querySelectorAll(".bar")
    BarArray.forEach(element => {
        element.style.backgroundColor = "#021f54";
    });
    disableButton(4, 0)
}

async function mergeSortHelper(array, startIdx, endIdx) {
    if (startIdx < endIdx) {
        let midIdx = Math.floor((startIdx + endIdx) / 2);
        await mergeSortHelper(array, startIdx, midIdx)
        await mergeSortHelper(array, midIdx + 1, endIdx)
        await mergeArrays(array, startIdx, midIdx, endIdx)
    }
}

async function mergeArrays(array, startIdx, midIdx, endIdx) {
    let BarArray = document.querySelectorAll(".bar")
    let i, j, k;
    i = startIdx;
    j = midIdx + 1;
    k = startIdx; // to keep track of temp array
    let tempArray = [];

    while (i <= midIdx && j <= endIdx) {
        BarArray[i].style.backgroundColor = "rgb(239 169 140)"
        BarArray[j].style.backgroundColor = "rgb(239 169 140)"
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        )
        if (barSize[i] <= barSize[j]) {
            tempArray[k++] = barSize[i++]
        } else {
            tempArray[k++] = barSize[j++]
        }
    }

    while (i <= midIdx) tempArray[k++] = barSize[i++];
    while (j <= endIdx) tempArray[k++] = barSize[j++];

    for (let p = startIdx; p <= endIdx; p++) {
        barSize[p] = tempArray[p]
        BarArray[p].style.height = `${tempArray[p]}px`
        BarArray[p].style.backgroundColor = "#2c5cb3"
    }
}