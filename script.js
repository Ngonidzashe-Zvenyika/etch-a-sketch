const grid = document.querySelector(".grid");

function createSixteenGrid () {
    for (i = 1; i <= 256; ++i) {
        let createDiv = document.createElement("div");
        createDiv.classList.add("pixel");
        grid.appendChild(createDiv);
    }
}

createSixteenGrid ();