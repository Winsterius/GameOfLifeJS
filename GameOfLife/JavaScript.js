let size = 600;
let sizeOfCell = 20;
let randomCells = 300;

let canvasField = document.getElementById("field");
let ctx = canvasField.getContext("2d");
var cells;

canvasField.addEventListener("click", function (event) {

    let x = event.clientX - 32;
    let y = event.clientY - 102;

    drawCell(x, y);

});

document.getElementById("randomButton").addEventListener("click", function () {
    drawField(size + 2);
    drawRandomCells(randomCells);
    console.log(cells);
});
document.getElementById("clearButton").addEventListener("click",  () => drawField(size + 2) );
document.getElementById("stepButton").addEventListener("click", () => makeStep());

document.getElementById("startButton").addEventListener("click",  function () {

    startGame(500);
    

});

function drawField(x) {
    let count = Math.round(x / sizeOfCell);
    cells = undefined;
    cells = [];

    for (let i = 0; i < count * count; i++) {
        
        cells[i]  = true;
        
    }
    canvasField.width = x;
    canvasField.height = x;
    ctx.fillStyle = "#808080";

    for (let j = 1; j < x; j += sizeOfCell) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, x);
        ctx.moveTo(0, j);
        ctx.lineTo(x, j);
    }
    ctx.stroke(); 
}

function drawCell(x, y) {

    x = x - (x % sizeOfCell) + 3;
    y = y - (y % sizeOfCell) + 3;
    let arrX = (x - 3) / sizeOfCell + 1;
    let arrY = (y - 3) / sizeOfCell + 1;
    let arr;

    if (arrY === 1) arr = (arrX * arrY - 1);
    else arr = ((arrY - 1) * size / sizeOfCell + arrX - 1);

    if (cells[arr] === false) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, sizeOfCell - 4, sizeOfCell - 4);
        cells[arr] = true;
    }
    else {
        cells[arr] = false;
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(x, y, sizeOfCell - 4, sizeOfCell - 4);
    }
}

function drawRandomCells(count) {

    for (let i = 0; i < count; i++) {
        drawCell(Math.random() * size, Math.random() * size);
    }

}

function makeStep() {

    let arrToRemove = [];

    for (let i = 0; i < cells.length; i++) {

        arrToRemove.push(i);

        if (getCountOfNeighbours(i) > 3 && cells[i] === false) {

            arrToRemove[i] = -3;
        }
        else if (getCountOfNeighbours(i) === 3 && cells[i] === true) {
            
            arrToRemove[i] = -2;
        }
        else if (getCountOfNeighbours(i) < 2 && cells[i] === false) {
            arrToRemove[i] = -3;
        }
        else if ((getCountOfNeighbours(i) === 2 || getCountOfNeighbours(i) === 3) && cells[i] === false) {

            arrToRemove[i] = -1;
        }
    }

    console.log(arrToRemove);
    for (let i = 0; i < arrToRemove.length; i++) {
        if (arrToRemove[i] === -3) {
            unsetCell(i);
        }
        if (arrToRemove[i] === -2) {
            setCell(i);
        }
    }

}
function startGame(ms) {

    while (true) {
        setTimeout(() => makeStep(), ms);
        
    }
}
function setCell(a) {
    let x = a % (size / sizeOfCell);
    let y = Math.floor(a / (size / sizeOfCell));

    x = (x * sizeOfCell) + 3;
    y = (y * sizeOfCell) + 3;

    cells[a] = false;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y, sizeOfCell - 4, sizeOfCell - 4);
}
function unsetCell(a) {


    let x = a % (size / sizeOfCell);
    let y = Math.floor(a / (size / sizeOfCell));

    x = (x * sizeOfCell) + 3;
    y = (y * sizeOfCell) + 3;

    cells[a] = true;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, sizeOfCell - 4, sizeOfCell - 4);


}

function getCountOfNeighbours(cell) {
    let count = 0;
    let neighbours = [];
    neighbours.push(cell - 1);
    neighbours.push(cell + 1);
    neighbours.push(cell - (size / sizeOfCell) - 1);
    neighbours.push(cell - (size / sizeOfCell));
    neighbours.push(cell - (size / sizeOfCell) + 1);
    neighbours.push(cell + (size / sizeOfCell) - 1);
    neighbours.push(cell + (size / sizeOfCell));
    neighbours.push(cell + (size / sizeOfCell) + 1);

    for (let i = 0; i < neighbours.length; i++) {
        if (cells[neighbours[i]] === false) count++;
    }

    return count;
}

const delay = ms => {
    setTimeout(() => r(), ms);
}

drawField(size + 2);
