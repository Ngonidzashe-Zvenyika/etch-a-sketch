const grid = document.querySelector(".grid");

function createGrid () {
    for (i = 1; i <= 256; ++i) {
        let createDiv = document.createElement("div");
        createDiv.classList.add("pixel");
        createDiv.addEventListener("mouseover", () => createDiv.classList.add("black"));
        grid.appendChild(createDiv);
    }
}

createGrid();