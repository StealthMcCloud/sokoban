function rightMove(nextMoveRight, boxMoveRight) {
    nextMoveRight.classList.replace("box", "blankSpace");
    nextMoveRight.setAttribute("data-cell-type", "blankSpace");
    nextMoveRight.appendChild(rarity);
    currentPosition = nextMoveRight;
    rarity.style.transform = "scaleX(-1)";
    boxMoveRight.setAttribute("data-cell-type", "box");
}

function leftMove(nextMoveLeft, boxMoveLeft) {
    nextMoveLeft.classList.replace("box", "blankSpace");
    nextMoveLeft.setAttribute("data-cell-type", "blankSpace");
    nextMoveLeft.appendChild(rarity);
    currentPosition = nextMoveLeft;
    rarity.style.transform = "rotate(0deg)";
}

function upMove(nextMoveUp, boxMoveUp) {
    nextMoveUp.classList.replace("box", "blankSpace");
    nextMoveUp.setAttribute("data-cell-type", "blankSpace");
    nextMoveUp.appendChild(rarity);
    currentPosition = nextMoveUp;
    rarity.style.transform = "rotate(-90deg)" + "scaleX(-1)";
}

function downMove(nextMoveDown, boxMoveDown) {
    nextMoveDown.classList.replace("box", "blankSpace");
    nextMoveDown.setAttribute("data-cell-type", "blankSpace");
    nextMoveDown.appendChild(rarity);
    currentPosition = nextMoveDown;
    rarity.style.transform = "rotate(90deg)" + "scaleX(-1)";
}

let winCounter = 1;

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
//Creates the game map
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
                wall.classList.add("winLocations", "box");
                wall.dataset.cellType = "boxOnWinLocation";
                break;
        }
    }
    main.appendChild(mazeBoard);
}


//Brings player piece rarity over from css
const rarity = document.getElementById("rarity")
const box = document.getElementsByClassName("box")
const border = document.getElementsByClassName("border")

//Places player piece rarity onto starting space
let start = document.getElementById("start")
let currentPosition = start;
currentPosition.appendChild(rarity);

document.addEventListener('keydown', (event) => {
    const rowPosition = currentPosition.dataset.rowIndex
    const cellPosition = currentPosition.dataset.cellIndex
    switch (event.key) {
        //moves player up, and pushes boxes
        case 'ArrowUp':
            let nextPositionUp = Number(rowPosition) - 1;
            let twoPositionUp = Number(rowPosition) - 2;
            let nextMoveUp = document.querySelector("[data-row-index = '" + nextPositionUp + "'][data-cell-index = '" + cellPosition + "']");
            let boxMoveUp = document.querySelector("[data-row-index = '" + twoPositionUp + "'][data-cell-index = '" + cellPosition + "']");
            const moveUp = nextMoveUp.dataset.cellType
            const boxUp = boxMoveUp.dataset.cellType
            if (moveUp === "blankSpace" || moveUp === "floor" || moveUp === "winLocations" || moveUp === "start") {
                nextMoveUp.appendChild(rarity);
                currentPosition = nextMoveUp;
                rarity.style.transform = "rotate(-90deg)" + "scaleX(-1)"
            }

            else if (moveUp === "box" && boxUp === "borderWall" || moveUp === "box" && boxUp === "box") {
            }

            else if (boxUp === "winLocations") {
                nextMoveUp.classList.replace("box", "blankSpace");
                nextMoveUp.setAttribute("data-cell-type", "blankSpace");
                nextMoveUp.appendChild(rarity);
                currentPosition = nextMoveUp;
                rarity.style.transform = "rotate(-90deg)" + "scaleX(-1)";
                boxMoveUp.setAttribute("data-cell-type", "boxOnWinLocation");
                winCounter++;
                boxMoveUp.classList.add("box")
            }

            else if (moveUp === "boxOnWinLocation") {
                nextMoveUp.classList.replace("box", "winLocations");
                nextMoveUp.setAttribute("data-cell-type", "winLocations");
                nextMoveUp.appendChild(rarity);
                currentPosition = nextMoveUp;
                rarity.style.transform = "scaleX(-1)";
                boxMoveUp.setAttribute("data-cell-type", "box");
                winCounter--;
                boxMoveUp.classList.replace("blankSpace", "box");
            }

            else if (moveUp === "box") {
                upMove(nextMoveUp, boxMoveUp)
                boxMoveUp.setAttribute("data-cell-type", "box");
                boxMoveUp.classList.replace("blankSpace", "box");
            }
            checkWin();
            break;
        //moves player down and pushes boxes
        case 'ArrowDown':
            let nextPositionDown = Number(rowPosition) + 1;
            let twoPositionDown = Number(rowPosition) + 2;
            let nextMoveDown = document.querySelector("[data-row-index = '" + nextPositionDown + "'][data-cell-index = '" + cellPosition + "']");
            let boxMoveDown = document.querySelector("[data-row-index = '" + twoPositionDown + "'][data-cell-index = '" + cellPosition + "']");
            const moveDown = nextMoveDown.dataset.cellType
            const boxDown = boxMoveDown.dataset.cellType
            if (moveDown === "blankSpace" || moveDown === "floor" || moveDown === "winLocations" || moveDown === "start") {
                nextMoveDown.appendChild(rarity);
                currentPosition = nextMoveDown;
                rarity.style.transform = "rotate(90deg)" + "scaleX(-1)"
            }

            else if (moveDown === "box" && boxDown === "borderWall" || moveDown === "box" && boxDown === "box" || moveDown === "boxOnWinLocation" && boxDown === "box" || moveDown === "boxOnWinLocation" && boxDown === "borderWall") {
            }

            else if (boxDown === "winLocations") {
                nextMoveDown.classList.replace("box", "blankSpace");
                nextMoveDown.setAttribute("data-cell-type", "blankSpace");
                nextMoveDown.appendChild(rarity);
                currentPosition = nextMoveDown;
                rarity.style.transform = "rotate(90deg)" + "scaleX(-1)";
                boxMoveDown.setAttribute("data-cell-type", "boxOnWinLocation");
                winCounter++;
                boxMoveDown.classList.add("box")
            }

            else if (moveDown === "boxOnWinLocation") {
                nextMoveDown.classList.replace("box", "winLocations");
                nextMoveDown.setAttribute("data-cell-type", "winLocations");
                nextMoveDown.appendChild(rarity);
                currentPosition = nextMoveDown;
                rarity.style.transform = "scaleX(-1)";
                boxMoveDown.setAttribute("data-cell-type", "box");
                winCounter--;
                boxMoveDown.classList.replace("blankSpace", "box");
            }

            else if (moveDown === "box") {
                downMove(nextMoveDown, boxMoveDown)
                boxMoveDown.setAttribute("data-cell-type", "box");
                boxMoveDown.classList.replace("blankSpace", "box");
            }
            checkWin();
            break;
        //moves player left and pushes boxes
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

            else if (moveLeft === "box" && boxLeft === "borderWall" || moveLeft === "box" && boxLeft === "box" || moveLeft === "boxOnWinLocation" && boxLeft === "borderWall") {//This stops the player from moving boxes through the wall or through other boxes.
            }

            else if (boxLeft === "winLocations") {
                nextMoveLeft.classList.replace("box", "blankSpace");
                nextMoveLeft.setAttribute("data-cell-type", "blankSpace");
                nextMoveLeft.appendChild(rarity);
                currentPosition = nextMoveLeft;
                rarity.style.transform = "rotate(0deg)";
                boxMoveLeft.setAttribute("data-cell-type", "boxOnWinLocation");
                winCounter++;
                boxMoveLeft.classList.add("box")
            }

            else if (moveLeft === "box" && boxLeft === "borderWall" || moveLeft === "box" && boxLeft === "boxOnWinLocation") {
            }

            else if (boxLeft === "start") {
                leftMove(nextMoveLeft, boxMoveLeft)
                document.getElementById("start").removeAttribute("id");
                boxMoveLeft.classList.add("box");
                boxMoveLeft.setAttribute("data-cell-type", "box");
            }

            else if (moveLeft === "boxOnWinLocation") {
                nextMoveLeft.classList.replace("box", "winLocations");
                nextMoveLeft.setAttribute("data-cell-type", "winLocations");
                nextMoveLeft.appendChild(rarity);
                currentPosition = nextMoveLeft;
                rarity.style.transform = "rotate(0deg)";
                winCounter--;
                boxMoveLeft.setAttribute("data-cell-type", "box");
                boxMoveLeft.classList.replace("blankSpace", "box");
            }

            else if (moveLeft === "box") {
                leftMove(nextMoveLeft, boxMoveLeft);
                boxMoveLeft.classList.replace("blankSpace", "box");
                boxMoveLeft.setAttribute("data-cell-type", "box");
            }
            checkWin();
            break;

        //moves player right and pushes boxes
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
            else if (moveRight === "box" && boxRight === "borderWall" || moveRight === "box" && boxRight === "box" || moveRight === "boxOnWinLocation" && boxRight === "borderWall") {
            }

            else if (boxRight === "winLocations") {
                nextMoveRight.classList.replace("box", "blankSpace");
                nextMoveRight.setAttribute("data-cell-type", "blankSpace");
                nextMoveRight.appendChild(rarity);
                currentPosition = nextMoveRight;
                rarity.style.transform = "scaleX(-1)";
                boxMoveRight.setAttribute("data-cell-type", "boxOnWinLocation");
                winCounter++;
                boxMoveRight.classList.add("box")
            }

            else if (moveRight === "boxOnWinLocation") {
                nextMoveRight.classList.replace("box", "winLocations");
                nextMoveRight.setAttribute("data-cell-type", "winLocations");
                nextMoveRight.appendChild(rarity);
                currentPosition = nextMoveRight;
                rarity.style.transform = "scaleX(-1)";
                boxMoveRight.setAttribute("data-cell-type", "box");
                winCounter--;
                boxMoveRight.classList.replace("blankSpace", "box");
            }

            else if (moveRight === "box") {
                rightMove(nextMoveRight, boxMoveRight);
                boxMoveRight.classList.replace("blankSpace", "box");
            }
            checkWin();
            break;
    }
});

function checkWin() {
    if (winCounter == 7) {
        setTimeout(function(){ alert("Winner"); }, 200);
    }
}
console.log(winCounter)