import { newGame } from "../logicMethods/newGame.js";

export function renderPage(contentDiv) {
  let uiContainer = document.createElement("div");
  uiContainer.classList.add("ui-container");

  // let resetGame = document.createElement("button");
  // resetGame.textContent = "Reset";
  // resetGame.id = "reset-game";
  let placeShip = document.createElement("button");
  placeShip.textContent = "Place Ships";
  placeShip.id = "place-ship";
  placeShip.disabled = true;
  let rotateBtn = document.createElement("button");
  rotateBtn.textContent = "Rotate";
  rotateBtn.id = "rotate-button";
  rotateBtn.disabled = true;
  let alertBox = document.createElement("div");
  alertBox.classList.add("alert-box");

  // uiContainer.appendChild(resetGame);
  uiContainer.appendChild(placeShip);
  uiContainer.appendChild(rotateBtn);
  uiContainer.appendChild(alertBox);

  contentDiv.appendChild(uiContainer);
}

export function resetButton(player1, player2) {
  let resetBtn = document.querySelector("#reset-game");
  resetBtn.addEventListener("click", resetBoard);
  resetBtn.addEventListener("click", function() {
    newGame(player1, player2);
  });
}

function resetBoard() {
  let gridArray = Array.from(document.querySelectorAll(".grid-box"));
  gridArray.map(box => {
    box.id = "empty";
    box.style.backgroundColor = "white";
    box.replaceWith(box.cloneNode(true));
    return box.cloneNode(true);
  });
}
