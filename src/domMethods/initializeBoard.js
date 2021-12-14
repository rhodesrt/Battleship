export function initializeBoard(contentDiv) {
  let gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");

  let computerBoard = document.createElement("div");
  computerBoard.classList.add("computer-board");
  let playerBoard = document.createElement("div");
  playerBoard.classList.add("player-board");

  for (let i = 0; i < 100; i++) {
    let gridBox = document.createElement("div");
    gridBox.classList.add("grid-box");
    gridBox.id = "empty";
    playerBoard.appendChild(gridBox);
  }

  for (let i = 0; i < 100; i++) {
    let gridBox = document.createElement("div");
    gridBox.classList.add("grid-box");
    gridBox.id = "empty";
    computerBoard.appendChild(gridBox);
  }

  gameBoard.appendChild(computerBoard);
  gameBoard.appendChild(playerBoard);
  contentDiv.appendChild(gameBoard);
}
