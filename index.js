const boxex = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxex.forEach((box, index) => {
    box.innerText = "";
    boxex[index].style.pointerEvents = "all";
    box.classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxex.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxex[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxex[index].style.pointerEvents = "none";

    swapTurn();
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxex.forEach((box)=>{
        box.style.pointerEvents="none";
      })

      boxex[position[0]].classList.add("win");
      boxex[position[1]].classList.add("win");
      boxex[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
  gameInfo.innerText = `Winner Player - ${answer}`;
  newGameBtn.classList.add("active");
    return;
  }


  let fillCount = 0;

  gameGrid.forEach((box)=>{
    if(box !== ""){
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied";
  newGameBtn.classList.add("active");
  }
}

newGameBtn.addEventListener("click", initGame);
