const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".game");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");

let isXTurn = true;
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  isXTurn = true;
  gameActive = true;
  statusMessage.textContent = "X's turn";
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";

  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? "X" : "O";

  if (checkWin(currentClass)) {
    statusMessage.textContent = `${isXTurn ? "X" : "O"} wins!`;
    gameActive = false;
    endGame();
  } else if (isDraw()) {
    statusMessage.textContent = "It's a draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
    statusMessage.textContent = `${isXTurn ? "X" : "O"}'s turn`;
  }
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener("click", handleClick);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index =>
      cells[index].classList.contains(currentClass)
    );
  });
}

function isDraw() {
  return [...cells].every(cell => 
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}
