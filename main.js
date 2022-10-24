// alert('Привет! Чтобы начать игру, жми Start!')
const root = document.querySelector('.root');
// const field = document.querySelector('.field');
const fieldArea = document.createElement('div');
fieldArea.className = 'field';
let cellSize = 100;

let movesValue = 0;
let minutes = 9;
let seconds = 59;
let numbersBricks = 15;
let numberCols = 4;
let sizeArea = 400;

let timerAction;

const container = document.createElement('div');
container.className = 'container';

root.append(container);
container.append(fieldArea);
let field = document.querySelector('.field');


const buttonsArea = document.createElement('div');
buttonsArea.className = 'buttons-area';
const moves = document.createElement('div');
moves.className = 'moves';
container.prepend(moves);
const moveCount = document.createElement('div');
moveCount.className = 'move-count';
const time = document.createElement('div');
time.className = 'time';

moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;
time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;

moves.append(moveCount);
moves.append(time);

container.prepend(buttonsArea);
const buttonStart = document.createElement('button');
buttonStart.className = 'button-start';
buttonStart.textContent = 'Shuffle and start';
const buttonStop = document.createElement('button');
buttonStop.className = 'button-stop';
buttonStop.textContent = 'Start';
const buttonSave = document.createElement('button');
buttonSave.className = 'button-save';
buttonSave.textContent = 'Save';
const buttonResult = document.createElement('button');
buttonResult.className = 'button-result';
buttonResult.textContent = 'Results';

buttonsArea.append(buttonStart);
buttonsArea.append(buttonStop);
buttonsArea.append(buttonSave);
buttonsArea.append(buttonResult);

let x1 = 0;

function stopButtonListener() {
    if(x1 === 0) {
        field.classList.add('field_play');
        document.querySelector('.button-stop').classList.add('button-stop-noactive');
        buttonStop.textContent = "Stop";
        x1 = 1;
        timerAction = setInterval(() => {
            if(seconds < 0) {
                seconds = 59;
                minutes--;
            }
            if(minutes < 0) {
                alert('Ты проиграл!');
                clearInterval(timerAction);
            }
            time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
            seconds--;

        }, 1000);
    } else if (x1 === 1) {
        field.classList.remove('field_play');
        document.querySelector('.button-stop').classList.remove('button-stop-noactive');
        buttonStop.textContent = "Start";
        x1 = 0;
        clearInterval(timerAction);
    }   
}

document.querySelector('.button-stop').addEventListener('click', stopButtonListener);

const frameSize = document.createElement('div');
frameSize.className = 'frame-size';
frameSize.innerHTML = '<strong>Frame size:</strong> <span class="size"></span>';

container.append(frameSize);
let size = document.querySelector('.size');
size.innerHTML = '4x4';

const otherSizes = document.createElement('div');
otherSizes.className = 'other-sizes';
container.append(otherSizes);
otherSizes.innerHTML = '<strong>Other sizes:</strong> <span class="sizes-button1">3x3</span> <span class="sizes-button2">4x4</span> <span class="sizes-button3">5x5</span> <span class="sizes-button4">6x6</span> <span class="sizes-button5">7x7</span> <span class="sizes-button6">8x8</span>'



let empty = {
    value: 0,
    top: 0,
    left: 0
};

let cells = [];
cells.push(empty);

function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if(leftDiff + topDiff > 1) {
        return;
    }
    movesValue++;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    let isFinished = cells.every(cell => {
        return cell.value === cell.top * numberCols + cell.left;
    })

    if(isFinished) {
        alert(`Hooray! You solved the puzzle in ${minutes}:${seconds} and ${movesValue} moves!`);
    }
}

let numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);

for (let i = 1; i <= numbersBricks; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1
    cell.className = 'cell';
    cell.innerHTML = value;

    const left = i % numberCols;
    const top = (i - left) / numberCols;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell,
    })

    

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    fieldArea.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    });
}


document.querySelector('.button-start').addEventListener('click', () => {
    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;

    timerAction = setInterval(() => {
        if(seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if(minutes < 0) {
            alert('Ты проиграл!');
            clearInterval(timerAction);
        }
        time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
        seconds--;

    }, 1000);

    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;
    field.classList.add('field_play');
        document.querySelector('.button-stop').classList.add('button-stop-noactive');
        buttonStop.textContent = "Stop";
        x1 = 1;

    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);
    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);

for (let i = 1; i <= numbersBricks; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1
    cell.className = 'cell';
    cell.innerHTML = value;

    const left = i % numberCols;
    const top = (i - left) / numberCols;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell,
    })

    

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    fieldArea.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    });
}
})


document.querySelector('.sizes-button1').addEventListener('click', () => {
    sizeArea = 300;
    size.innerHTML = '3x3';
    numbersBricks = 8;
    numberCols = 3;
    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});

document.querySelector('.sizes-button2').addEventListener('click', () => {
    sizeArea = 400;
    size.innerHTML = '4x4';
    numbersBricks = 15;
    numberCols = 4;
    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});

document.querySelector('.sizes-button3').addEventListener('click', () => {
    sizeArea = 500;
    size.innerHTML = '5x5';
    numbersBricks = 24;
    numberCols = 5;
    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});

document.querySelector('.sizes-button4').addEventListener('click', () => {
    sizeArea = 600;
    size.innerHTML = '6x6';
    numbersBricks = 35;
    numberCols = 6;

    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});

document.querySelector('.sizes-button5').addEventListener('click', () => {
    sizeArea = 700;
    size.innerHTML = '7x7';
    numbersBricks = 48;
    numberCols = 7;
    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});

document.querySelector('.sizes-button6').addEventListener('click', () => {
    sizeArea = 800;
    size.innerHTML = '8x8';
    numbersBricks = 63;
    numberCols = 8;
    x1 = 1;
    stopButtonListener();
    x1 = 0;
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    
    cells = [];
    cells.push(empty);

    clearInterval(timerAction);
    let minutes = 9;
    let seconds = 59;
    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;
    movesValue = 0;
    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;

    document.querySelector('.field').style.width = `${sizeArea}px`;
    document.querySelector('.field').style.height = `${sizeArea}px`;

    numbers = [...Array(numbersBricks).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= numbersBricks; i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1
        cell.className = 'cell';
        cell.innerHTML = value;
    
        const left = i % numberCols;
        const top = (i - left) / numberCols;
    
        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell,
        })
    
        
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        fieldArea.append(cell);
    
        cell.addEventListener('click', () => {
            move(i);
        });
    }
});


let buttonSaveAction = document.querySelector('.button-save');
let savesContainer;

storageNumber = 0;
storageOn = 0;
buttonSaveAction.addEventListener('click', () => {
    storageNumber++;
    let arr = [];
    arr.push(cells, movesValue, minutes, seconds, numbers, empty, numbersBricks, numberCols);
    localStorage.setItem(`Save${storageNumber}`, JSON.stringify(arr));
    

    if(storageOn === 0) {
        savesContainer = document.createElement('div');
        savesContainer.className = 'saves-container';
        container.append(savesContainer);
        let saveTitle = document.createElement('div');
        saveTitle.className = 'save-title';
        saveTitle.textContent = 'Save games';
        savesContainer.append(saveTitle);

        let saveTitleButton = document.createElement('button');
        saveTitleButton.className = 'save-title-button';
        saveTitleButton.textContent = 'Clear';
        saveTitle.append(saveTitleButton);

        document.querySelector('.save-title-button').addEventListener('click', () => {
            localStorage.clear();
            document.querySelector('.saves-container').remove();
            storageOn = 0;
            storageNumber = 0;
        })

    }
    storageOn = 1;

    let saveInform = document.createElement('div');
    saveInform.innerHTML = `<p style="margin-top: 10px; text-align: center; cursor: pointer; color: rgb(88, 88, 206); text-decoration: underline;" class="save-inform${storageNumber}"><strong>Save ${storageNumber}</strong></p>`;
    savesContainer.append(saveInform);




    document.querySelector(`.save-inform${storageNumber}`).onclick = () => {


        let arrSave = JSON.parse(localStorage.getItem(`Save${storageNumber}`));
        cells = arrSave[0];
        movesValue = arrSave[1];
        minutes = arrSave[2];
        seconds = arrSave[3];
        numbers = arrSave[4];
        empty = arrSave[5];
        numbersBricks = arrSave[6];
        numberCols = arrSave[7];




        clearInterval(timerAction);

    time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
    field.innerHTML = null;

    timerAction = setInterval(() => {
        if(seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if(minutes < 0) {
            alert('Ты проиграл!');
            clearInterval(timerAction);
        }
        time.innerHTML = `<strong>Time:</strong> ${minutes}:${seconds}`;
        seconds--;

    }, 1000);

    moveCount.innerHTML = `<strong>Moves:</strong> ${movesValue}`;
    field.classList.add('field_play');
        document.querySelector('.button-stop').classList.add('button-stop-noactive');
        buttonStop.textContent = "Stop";
        x1 = 1;

for (let i = 1; i <= numbersBricks; i++) {
    let cell = document.createElement('div');
    let value = numbers[i - 1] + 1
    cell.className = 'cell';
    cell.innerHTML = value;

    let left = cells[i].left;
    let top = cells[i].top;

    // cells.push({
    //     value: value,
    //     left: left,
    //     top: top,
    //     element: cell,
    // })

    

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    fieldArea.append(cell);


    }
       

    }

})


// if(storageOn === 1) {
//     document.querySelector('.save-title-button').addEventListener('click', () => {
//         localStorage.clear();
//         document.querySelector('.saves-container').innerHTML = '';
//     })
// }


