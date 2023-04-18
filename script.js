// These are the initialized global variables;
const gridSize = 480;
let squaresPerSide = 20;
let numberSquares = squaresPerSide*squaresPerSide;
const grid = document.querySelector(".grid");
const buttons = document.querySelectorAll("button");


// This function addes squares to the main div;
function createNewGrid() {
    for (i = 1; i <= numberSquares; ++i) {
        const createSquare = document.createElement("div");
        const squareSize = `${gridSize/squaresPerSide}px`;
        createSquare.classList.add("square");
        createSquare.style.width = squareSize;
        createSquare.style.height = squareSize;
        grid.appendChild(createSquare);
    }
}  

// This function removes existing squares from the main div when a new grid is being created;
function removeGrid() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.remove();
    }
}

// This function changes the brush color to black;
function blackBrush() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.addEventListener("mouseover", ()=> {
            square.style.backgroundColor = `rgb(0, 0, 0)`;
        });
    }
}

// This function generates a random brush color above each square;
function rainbowBrush() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.addEventListener("mouseover", ()=> {
            let x = Math.random() * 256;
            let y = Math.random() * 256;
            let z = Math.random() * 256;
            square.style.backgroundColor = `rgb(${x}, ${y}, ${z})`;
        });
    }
}

// This function changes the brush color to white in order to "erase" individual squares;
function eraseColor() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.addEventListener("mouseover", ()=> {
            square.style.backgroundColor = `rgb(255, 255, 255)`;
        });
    }
}

// This function reverts the color of all the squares back to whtie;
function clearGrid() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.style.backgroundColor = `rgb(255, 255, 255)`;
    }
}

// This function requests and validates an input for the grid size, invalid entries prevent the body from executing.
function enterGridSize() {
    let valid = false;
    let input = prompt("How many squares per side? (Maximum: 64)");
    while (valid === false) {
        if (input === null) {
            return;
        } else if ((isNaN(Number(input))) || (Number(input) < 1) || (Number(input) > 64)) {
            alert("Enter a valid number.");
            input = prompt("How many squares per side? (Min = 1, Max = 64)");
        } else {
            valid = true;
        }
    }
     
    const mode = document.querySelector(".size");
    mode.innerText = `${input} x ${input}`;
    squaresPerSide = input;
    numberSquares = squaresPerSide*squaresPerSide;
    removeGrid();
    createNewGrid();
}

// This event listener determines which function to call based on what button the user has pressed;
for (const button of buttons) {
    button.addEventListener("click", ()=> {
        switch (true) {
        case (button.classList.contains("gridSizeButton")):
            enterGridSize();
            break;
        case (button.classList.contains("blackButton")):
            blackBrush();
            break;
        case (button.classList.contains("rainbowButton")):
            rainbowBrush();
            break;
        case (button.classList.contains("eraserButton")):
            eraseColor();
            break;
        case (button.classList.contains("clearButton")):
            clearGrid();
            break;
        }
    });
}

// Main program;
createNewGrid();

