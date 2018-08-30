//map layout
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
                wall.dataset.cellType = "borderWall";
                break;

            case "S":
                wall.setAttribute("id", "start");
                wall.dataset.cellType = "start";
                break;

            case " ":
                wall.classList.add("blankSpace");
                wall.dataset.cellType = "blankSpace";
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
const box = document.getElementsByClassName("box")
const border = document.getElementsByClassName("border")

let start = document.getElementById("start")
let currentPosition = start;
currentPosition.appendChild(rarity);



document.addEventListener('keydown', (event) => {
    const rowPosition = currentPosition.dataset.rowIndex
    const cellPosition = currentPosition.dataset.cellIndex
    switch (event.key) {
        // case 'ArrowUp':
        //     let nextPositionUp = Number(rowPosition) - 1;
        //     let twoPositionUp = Number(rowPosition) - 2;
        //     let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + cellPosition + "']");
        //     let boxMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + twoPositionUp + "']");
        //     const moveUp = nextMoveUp.dataset.cellType
        //     if (moveUp === "blankSpace" || moveUp === "floor" || moveUp === "winLocations" || moveUp === "box" || moveUp === "start" || moveUp === "boxOnWinLocation") {
        //         nextMoveUp.appendChild(rarity);
        //         currentPosition = nextMoveUp;
        //         rarity.style.transform = "rotate(-90deg)" + "scaleX(-1)"
        //     }
        //     break;
        // case 'ArrowDown':
        //     let nextPositionDown = Number(rowPosition) + 1;
        //     let twoPositionDown = Number(rowPosition) + 2;
        //     let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + cellPosition + "']");
        //     let boxMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + twoPositionDown + "']");
        //     const moveDown = nextMoveDown.dataset.cellType
        //     if (moveDown === "blankSpace" || moveDown === "floor" || moveDown === "winLocations" || moveDown === "box" || moveDown === "start" || moveDown === "boxOnWinLocation") {
        //         nextMoveDown.appendChild(rarity);
        //         currentPosition = nextMoveDown;
        //         rarity.style.transform = "rotate(90deg)" + "scaleX(-1)"
        //     }
        //     if (moveDown === "box") {
        //         nextMoveDown.classList.replace("box", "blankSpace")
        //         nextMoveDown.setAttribute("data-cell-type", "blankSpace")
        //         nextMoveDown.appendChild(rarity)
        //         rarity.style.transform = "scaleX(-1)"
        //         boxMoveDown.setAttribute("data-cell-type", "box")
        //         boxMoveDown.classList.replace("blankSpace", "box")  || nextMoveDown.classList.replace("winLocations", "boxOnWinLocation")}
        //     break;
        case 'ArrowLeft':
            let nextPositionLeft = Number(cellPosition) - 1;
            let twoPositionLeft = Number(cellPosition) - 2;
            let nextMoveLeft = document.querySelector("[data-row-index = '" + rowPosition + "'][data-cell-index = '" + nextPositionLeft + "']");
            let boxMoveLeft = document.querySelector("[data-row-index = '" + rowPosition + "'][data-cell-index = '" + twoPositionLeft + "']")
            const moveLeft = nextMoveLeft.dataset.cellType
            const boxLeft = boxMoveLeft.dataset.cellType
            if (moveLeft === "blankSpace" || moveLeft === "floor" || moveLeft === "winLocations" || moveLeft === "start") {
                nextMoveLeft.appendChild(rarity);
                currentPosition = nextMoveLeft;
                rarity.style.transform = "rotate(0deg)"
            }

            else if (moveLeft === "box" && boxleft === "borderWall") {
                console.log("Stop")
            }

            else if (moveLeft === "box") {
                nextMoveleft.classList.replace("box", "blankSpace");
                nextMoveLeft.setAttribute("data-cell-type", "box");
                nextMoveLeft.appendChild(rarity);
                currentPosition = nextMoveLeft;
                rarity.style.transform = "rotate(0deg)";
                boxMoveLeft.setAttribute("data-cell-type", "box");
                boxMoveLeft.classList.replace("blankSpace", "box");
            }
            break;

        case 'ArrowRight':
            let nextPositionRight = Number(cellPosition) + 1;
            let twoPositionRight = Number(cellPosition) + 2;
            let nextMoveRight = document.querySelector("[data-row-index = '" + rowPosition + "'][data-cell-index = '" + nextPositionRight + "']");
            let boxMoveRight = document.querySelector("[data-row-index = '" + rowPosition + "'][data-cell-index = '" + twoPositionRight + "']")
            const moveRight = nextMoveRight.dataset.cellType;
            const boxRight = boxMoveRight.dataset.cellType;
            if (moveRight === "blankSpace" || moveRight === "floor" || moveRight === "start" || moveRight === "winLocations") {
                nextMoveRight.appendChild(rarity);
                currentPosition = nextMoveRight;
                rarity.style.transform = "scaleX(-1)"
            }
            else if (moveRight === "box" && boxRight === "borderWall") {
                console.log("Stop");
            }

            else if (moveRight === "box") {
                nextMoveRight.classList.replace("box", "blankSpace")
                nextMoveRight.setAttribute("data-cell-type", "blankSpace")
                nextMoveRight.appendChild(rarity)
                currentPosition = nextMoveRight;
                rarity.style.transform = "scaleX(-1)"
                boxMoveRight.setAttribute("data-cell-type", "box")
                boxMoveRight.classList.replace("blankSpace", "box")
            }
            break;
    }
}
);