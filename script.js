// These are the initialized global variables;
let black = false;
let rainbow = false;
let erase = false;
let clear = false;
const gridSize = 640; 
let squaresPerSide = 20;
let numberSquares = squaresPerSide*squaresPerSide;
const grid = document.querySelector(".grid");
const buttons = document.querySelectorAll("button");

// This function creates the initial grid, detects which button has been pressed and effects changes to suit the button's purpose;
function buttonChoice() {
    createNewGrid();
    for (const button of buttons) {
        button.addEventListener("click", ()=> {
            switch (true) {
            case (button.classList.contains("gridSizeButton")):
                enterGridSize();
                break;
            case (button.classList.contains("blackButton")):
                black = true;
                rainbow = false;
                erase = false;
                break;
            case (button.classList.contains("rainbowButton")):
                rainbow = true;
                black = false;
                erase = false;
                break;
            case (button.classList.contains("eraserButton")):
                erase = true;
                black = false;
                rainbow = false;
                break;
            case (button.classList.contains("clearButton")):
                clearGrid();
                erase = false;
                black = false;
                rainbow = false;
            }
        });
    }
}

// This function requests and validates an input for the grid size;
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

// This function removes existing squares from the main div when a new grid is being created;
function removeGrid() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        square.remove();
    }
}

// This function adds squares to the main div and calls brushChoice();
function createNewGrid() {
    for (i = 1; i <= numberSquares; ++i) {
        const createSquare = document.createElement("div");
        const squareSize = `${gridSize/squaresPerSide}px`;
        createSquare.classList.add("square");
        createSquare.style.width = squareSize;
        createSquare.style.height = squareSize;
        grid.appendChild(createSquare);
    }
    brushChoice();
}

// This function replaces the entire grid with a new blank grid of equal dimension;
function clearGrid() {
    removeGrid();
    createNewGrid();
}

// This function adds an event listener to each square and governs all color changes cuased by "mouseover" events;
function brushChoice() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
        let intensity = 0.1;
        square.addEventListener("mouseover", ()=> {
            if (black === true) {
                blackBrush(square, intensity);
                    if (intensity < 1) intensity += 0.1;
            } else if (rainbow === true) {
                intensity = 0.1;
                rainbowBrush(square);
            } else if (erase === true) {
                intensity = 0.1;
                eraseColor(square);
            }
        });
    }
}

// This function gradually shades a square by adding 10% of the color black upon each pass;
function blackBrush(square, intensity) {
    square.style.backgroundColor = `rgb(0, 0, 0, ${intensity})`;
}

// This function generates a random brush color above each square;
function rainbowBrush(square) {
    let x = Math.random() * 256;
    let y = Math.random() * 256;
    let z = Math.random() * 256;
    square.style.backgroundColor = `rgb(${x}, ${y}, ${z})`;
}

// This function changes the brush color to white in order to "erase" individual squares;
function eraseColor(square) {
    square.style.backgroundColor = `rgb(255, 255, 255)`;
}

// Main program;
buttonChoice();