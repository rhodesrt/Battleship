import { placeShips } from "./placeShips.js";

export function newGame(player, computer) {
  while (player.fleet[0]) {
    player.fleet.shift();
  }
  while (computer.fleet[0]) {
    computer.fleet.shift();
  }
  placeShips(player, computer);
  // End Game
}
