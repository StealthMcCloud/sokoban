//Create a keyboard listener to ensure that the piece will move starting from the Start
//Ensure that the piece can not move through walls
//Have the starting piece start at the start area.
//Have a win condition when the piece reaches the finish area


const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];



const main = document.getElementById("maze")

for (let y = 0; y < map.length; y++) {
    let row = map[y];
    let mazeBoard = document.createElement("div");
    mazeBoard.classList.add("mazeRow");

    for (let x = 0; x < row.length; x++) {
        let wall = document.createElement("div")
        wall.dataset.rowIndex = y;
        wall.dataset.cellIndex = x;
        mazeBoard.appendChild(wall);

        switch (row[x]) {
            case "W":
                wall.classList.add("borderWall")
                wall.dataset.cellType = "border";
                break;

            case "S":
                wall.setAttribute("id", "start");
                wall.dataset.cellType = "start";
                break;

            case " ":
                wall.classList.add("blankSpace");
                wall.dataset.cellType = "floor";
                break;

            case "F":
                wall.setAttribute("id", "finish");
                wall.dataset.cellType = "end"
                break;
        }
    }
    main.appendChild(mazeBoard);
}

let boxTop;
let boxLeft;
let x;
let y;

const dashie = document.getElementById("dashie")

let start = document.getElementById("start")
let currentPosition = start;
currentPosition.appendChild(dashie);



document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            let nextPositionUp = Number(currentPosition.dataset.rowIndex) - 1;
            let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveUp.dataset.cellType === "floor") {
                nextMoveUp.appendChild(dashie);
                currentPosition = nextMoveUp;
                dashie.style.transform = "rotate(-90deg)"
            }
            break;
        case 'ArrowDown':
            let nextPositionDown = Number(currentPosition.dataset.rowIndex) + 1;
            let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            if (nextMoveDown.dataset.cellType === "floor") {
                nextMoveDown.appendChild(dashie);
                currentPosition = nextMoveDown;
                dashie.style.transform = "rotate(90deg)"
            }
            break;
        case 'ArrowLeft':
            let nextPositionLeft = Number(currentPosition.dataset.cellIndex) - 1;
            let nextMoveLeft = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionLeft + "']");
            if (nextMoveLeft.dataset.cellType === "floor") {
                nextMoveLeft.appendChild(dashie);
                currentPosition = nextMoveLeft;
                dashie.style.transform = "scaleX(-1)"
            }
            break;
        case 'ArrowRight':
            let nextPositionRight = Number(currentPosition.dataset.cellIndex) + 1;
            let nextMoveRight = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionRight + "']");
            if (nextMoveRight.dataset.cellType === "floor") {
                nextMoveRight.appendChild(dashie);
                currentPosition = nextMoveRight;
                dashie.style.transform = "rotate(0deg)"
            } else if (nextMoveRight.dataset.cellType === "end") {
                nextMoveRight.appendChild(dashie);
                currentPosition = nextMoveRight;
                setTimeout(function () {
                    alert("You Win!");
                    
                }, 1);
            }
            break;
    }
    document.getElementById("dashie").style.top = boxTop + "px";
    document.getElementById("dashie").style.left = boxLeft + "px";
})
