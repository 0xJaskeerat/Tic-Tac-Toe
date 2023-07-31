const board = document.querySelector('#board');
const guide = document.querySelector('#guide');

const boardCells = ["" , "" , "" , "" , "" , "" , "" , "" , ""];

let shape = 'circle';
guide.textContent = "Circle will go first"

function createBoard () {
    for(let cellIdx = 0; cellIdx < boardCells.length ; cellIdx++){
        const cellElement = document.createElement("div");
        cellElement.classList.add("squareCell");
        cellElement.id = cellIdx;
        cellElement.addEventListener('click' , onCellClick)
        board.appendChild(cellElement);
    }
}

// handle cell click
function onCellClick (e) {
    const shapeEle = document.createElement('div');
    shapeEle.classList.add(shape);
    e.target.append(shapeEle);
    shape = shape === 'circle' ? 'cross' : 'circle';
    guide.textContent = "It's " + shape + "'s turn now"
    e.target.removeEventListener('click' , onCellClick)
    checkScore();
}

// handle score
function checkScore () {
    const squares = document.querySelectorAll('.squareCell')

    const idxOfWinningPatterns = [
        [0,1,2] , [3,4,5] , [6,7,8] , 
        [0,3,6] , [1,4,7] , [2,5,8] , 
        [0,4,8] , [2,4,6]
    ]

    // for circle
    idxOfWinningPatterns.forEach((pattern) => {
        const isCircleWinning = pattern.every((cell) => squares[cell].firstChild?.classList.contains('circle'));

        // if circle wins
        if(isCircleWinning) {
            guide.textContent = "Circle wins"
            // can't remove event listener simply
            squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })

    // for cross
    idxOfWinningPatterns.forEach((pattern) => {
        const isCrossWinning = pattern.every((cell) => squares[cell].firstChild?.classList.contains('cross'));

        // if cross wins
        if(isCrossWinning) {
            guide.textContent = "Cross wins"
            // can't remove event listener simply
            squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
            return;
        }
    })
}

createBoard();