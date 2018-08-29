const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
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

            case "B":
                wall.classList.add("box");
                wall.dataset.cellType = "box";
                break;

            case "O":
                wall.classList.add("winLocations");
                wall.dataset.cellType = "winLocations";
                break;

            case "X":
                wall.classList.add("box" || "winLocations");
                wall.dataset.cellType = "boxOnWinLocation";
                break;
        }
    }
    main.appendChild(mazeBoard);
}

const rarity = document.getElementById("rarity")

let start = document.getElementById("start")
let currentPosition = start;
currentPosition.appendChild(rarity);


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            let nextPositionUp = Number(currentPosition.dataset.rowIndex) - 1;
            let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            const moveUp = nextMoveUp.dataset.cellType
            if (moveUp === "floor" || moveUp === "winLocations" || moveUp === "box" || moveUp === "start" || moveUp === "boxOnWinLocation") {
                nextMoveUp.appendChild(rarity);
                currentPosition = nextMoveUp;
                rarity.style.transform = "rotate(-90deg)" + "scaleX(-1)"
            }
            break;
        case 'ArrowDown':
            let nextPositionDown = Number(currentPosition.dataset.rowIndex) + 1;
            let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + currentPosition.dataset.cellIndex + "']");
            const moveDown = nextMoveDown.dataset.cellType
            if (moveDown === "floor" || moveDown === "winLocations" || moveDown === "box" || moveDown === "Start" || moveDown === "boxOnWinLocation") {
                nextMoveDown.appendChild(rarity);
                currentPosition = nextMoveDown;
                rarity.style.transform = "rotate(90deg)" + "scaleX(-1)"
            }
            break;
        case 'ArrowLeft':
            let nextPositionLeft = Number(currentPosition.dataset.cellIndex) - 1;
            let nextMoveLeft = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionLeft + "']");
            const moveLeft = nextMoveLeft.dataset.cellType
            if (moveLeft === "floor" || moveLeft === "winLocations" || moveLeft === "box" || moveLeft === "start" || moveLeft === "boxOnWinLocation") {
                nextMoveLeft.appendChild(rarity);
                currentPosition = nextMoveLeft;
                rarity.style.transform = "rotate(0deg)"
            }
            break;
        case 'ArrowRight':
            let nextPositionRight = Number(currentPosition.dataset.cellIndex) + 1;
            let nextMoveRight = document.querySelector("[data-row-index = '" + currentPosition.dataset.rowIndex + "'][data-cell-index = '" + nextPositionRight + "']");
            const moveRight = nextMoveRight.dataset.cellType;
            if (moveRight === "floor" || moveRight === "box" || moveRight === "start" || moveRight === "winLocations" || moveRight === "boxOnWinLocation") {
                nextMoveRight.appendChild(rarity);
                currentPosition = nextMoveRight;
                rarity.style.transform = "scaleX(-1)"}
                else if (moveRight === "box") { 
                    nextMoveRight.appendChild(rarity);
                    nextMoveRight.appendChild(box)
                    currentPosition = nextMoveRight;
                    boxLocation = nextMoveRight;
            }
            break;
        }
    }
)