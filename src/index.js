import "./style.css";
import { initializeBoard } from "./domMethods/initializeBoard.js";
import { renderPage, resetButton } from "./domMethods/renderPage.js";
import { newGame } from "./logicMethods/newGame.js";
import { newPlayer } from "./logicMethods/playerFactory.js";

let player = newPlayer("human");
let computer = newPlayer("computer");
let content = document.querySelector("#content");
renderPage(content);
initializeBoard(content);
resetButton(player, computer);

newGame(player, computer);
