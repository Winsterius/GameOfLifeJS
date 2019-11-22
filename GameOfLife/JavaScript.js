let size = 800;
let sizeOfCell = 20;
let countOfRandomCells;
let delay;

let play = false;

let canvasField = document.getElementById("field");
let ctx = canvasField.getContext("2d");
var cells;

canvasField.addEventListener("click", function (event) {

    let x = event.pageX - 32;
    let y = event.pageY - 102;
    drawCell(x, y);

});

document.getElementById("randomButton").addEventListener("click", function () {
    drawField(document.getElementById("sizeRange").value);
    drawRandomCells();
});
document.getElementById("clearButton").addEventListener("click", () => drawField(document.getElementById("sizeRange").value) );
document.getElementById("stepButton").addEventListener("click", () => makeStep());

document.getElementById("startButton").addEventListener("click",  function () {

    play = true;
    startGame();

});
document.getElementById("stopButton").addEventListener("click", () => stopGame());

document.getElementById("saveButton").addEventListener("click", () => saveGame());
document.getElementById("loadButton").addEventListener("click", () => loadGame());
document.getElementById("countOfCells").addEventListener("input", function () {
    countOfRandomCells = document.getElementById("countOfCells").value;
    document.getElementById("countOfCellsLabel").innerHTML = "Count: " + countOfRandomCells
});
document.getElementById("speedRange").addEventListener("input", function () {
    delay = document.getElementById("speedRange").value * document.getElementById("speedRange").value * 0.005;
    document.getElementById("speedRangeLabel").innerHTML = "Delay: " + Math.round(delay) + "ms";

});
document.getElementById("sizeRange").addEventListener("change", function () {
    size = document.getElementById("sizeRange").value;
    console.log(size);
    drawField(size);
});
document.getElementById("sizeCellRange").addEventListener("change", function () {
    sizeOfCell = document.getElementById("sizeCellRange").value;
    console.log(sizeOfCell)
    drawField(size);
});
function drawField(x) {

    
    countOfRandomCells = document.getElementById("countOfCells").value;
    document.getElementById("countOfCellsLabel").innerHTML = "Count: " + countOfRandomCells;
    delay = document.getElementById("speedRange").value * document.getElementById("speedRange").value * 0.005;
    document.getElementById("speedRangeLabel").innerHTML = "Delay: " + Math.round(delay) + "ms";

    delay = document.getElementById("speedRange").value * document.getElementById("speedRange").value * 0.005;

    document.getElementById("buttons").style.top = 150 + +x + "px";
    document.getElementById("buttons").style.width = +x + "px";
    document.getElementById("settings").style.left = +x + 70 + "px";
    document.getElementById("settings").style.top = 180 + "px";


    let count = Math.round(x / sizeOfCell);
    cells = undefined;
    cells = [];

    for (let i = 0; i < count * count; i++) {
        
        cells[i]  = true;
        
    }
    canvasField.width = +x + +sizeOfCell + 2;
    canvasField.height = +x + +sizeOfCell + 2;
    ctx.fillStyle = "#808080";
    xn = +x + +sizeOfCell - x % sizeOfCell + 2;
    //x = +x + +sizeOfCell + 2;
    console.log("x: ", +x + +sizeOfCell, "cell", sizeOfCell);
    for (let j = 1; j < +x + +sizeOfCell + 5; j += +sizeOfCell) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, xn);
        ctx.moveTo(0, j);
        ctx.lineTo(xn, j);
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

function drawRandomCells() {

    let count = countOfRandomCells;

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

    for (let i = 0; i < arrToRemove.length; i++) {
        if (arrToRemove[i] === -3) {
            unsetCell(i);
        }
        if (arrToRemove[i] === -2) {
            setCell(i);
        }
    }
}


function startGame() {
    let ms = delay;

    setTimeout(function () {    
        makeStep();          
        if (play) {            
            startGame(ms);             
        }                        
    }, ms)
}

function stopGame() {
    play = false;
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

    if ((cell + 1) % (size / sizeOfCell) !== 0) {
        neighbours.push(cell + 1);
        neighbours.push(cell - (size / sizeOfCell) + 1);
        neighbours.push(cell + (size / sizeOfCell) + 1);
    }
    if (cell % (size / sizeOfCell) !== 0) {
        neighbours.push(cell - 1);
        neighbours.push(cell - (size / sizeOfCell) - 1);
        neighbours.push(cell + (size / sizeOfCell) - 1);
    }
    neighbours.push(cell - (size / sizeOfCell));
    neighbours.push(cell + (size / sizeOfCell));

    for (let i = 0; i < neighbours.length; i++) {
        if (cells[neighbours[i]] === false) count++;
    }

    return count;
}

function saveGame() {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("game", JSON.stringify(cells));
    }
    else {
        concole.log("does not support local storage")
    }
}
function loadGame() {
    if (localStorage.getItem("game") !== null) {

        cells = JSON.parse(localStorage.getItem("game"));
        for (let i = 0; i < cells.length; i++) {

            if (cells[i] === false) {
                setCell(i);

            }
            else unsetCell(i);

        }

    }
    else {
        concole.log("_")
    }
}

drawField(size);
