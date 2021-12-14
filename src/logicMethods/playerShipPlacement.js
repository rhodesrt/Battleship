import { newShip } from "./shipFactory.js";
import { attackPhase } from "./attackPhase.js";

export function placePlayerFleet(player, computer) {
  createFleet(player);
  getFleetCoordinates(player.fleet, player, computer);
}

function createFleet(player) {
  let carrier = newShip(5, "carrier");
  player.fleetPush(carrier);
  let battleship = newShip(4, "battleship");
  player.fleetPush(battleship);
  let cruiser = newShip(3, "cruiser");
  player.fleetPush(cruiser);
  let submarine = newShip(3, "submarine");
  player.fleetPush(submarine);
  let destroyer = newShip(2, "destroyer");
  player.fleetPush(destroyer);
}

function getFleetCoordinates(fleet, player, computer) {
  let placeShipBtn = document.querySelector("#place-ship");
  placeShipBtn.disabled = false;
  placeShipBtn.addEventListener("click", () => {
    placeShipBtn.disabled = true;
    getShipCoordinates(fleet, "horizontal", 0, player, computer);
  });
}

function getShipCoordinates(fleet, orientation, i, player, computer) {
  if (i > fleet.length - 1) {
    let grid = Array.from(
      document.querySelector(".player-board").querySelectorAll(".grid-box")
    );
    grid = grid.map(box => {
      let newBox = box.cloneNode(true);
      box.replaceWith(newBox);
      return newBox;
    });
    attackPhase(player, computer);
    return;
  }

  let grid = Array.from(
    document.querySelector(".player-board").querySelectorAll(".grid-box")
  );
  grid = grid.map(box => {
    let newBox = box.cloneNode(true);
    box.replaceWith(newBox);
    return newBox;
  });
  let rotateBtn = document.querySelector("#rotate-button");
  rotateBtn.disabled = false;
  rotateBtn.addEventListener("click", () => {
    if (orientation === "horizontal") {
      getShipCoordinates(fleet, "vertical", i, player, computer);
    } else {
      getShipCoordinates(fleet, "horizontal", i, player, computer);
    }
  });
  shadeBoxesOnHover(fleet[i], orientation);
  grid.forEach((box, index, grid) => {
    if (checkIfValid(index, grid, orientation, fleet[i])) {
      box.addEventListener("click", () => {
        recordCoordinates(index, orientation, fleet[i]);
        addShipToDom(fleet[i], grid);
        getShipCoordinates(fleet, orientation, i + 1, player, computer);
      });
    }
  });
}

function shadeBoxesOnHover(ship, orient) {
  let grid = Array.from(
    document.querySelector(".player-board").querySelectorAll(".grid-box")
  );
  grid.forEach((box, index, array) => {
    box.addEventListener("mouseover", function() {
      let boxesToShade = [];
      if (orient === "horizontal") {
        for (let i = 0; i < ship.lengthOfShip; i++) {
          if ((index + i) % 10 >= index % 10) {
            boxesToShade.push(array[index + i]);
          }
        }
        if (boxesToShade.length !== ship.lengthOfShip) {
          boxesToShade.forEach(square => {
            square.style.backgroundColor = "red";
          });
        } else {
          boxesToShade.forEach(square => {
            if (square.id !== "empty") {
              square.style.backgroundColor = "red";
            } else {
              square.style.backgroundColor = "black";
              square.style.borderColor = "gray";
            }
          });
        }
      } else if (orient === "vertical") {
        for (let i = 0; i < ship.lengthOfShip * 10; i += 10) {
          if (index + i < 100) {
            boxesToShade.push(array[index + i]);
          }
        }
        if (boxesToShade.length !== ship.lengthOfShip) {
          boxesToShade.forEach(square => {
            square.style.backgroundColor = "red";
          });
        } else {
          boxesToShade.forEach(square => {
            if (square.id !== "empty") {
              square.style.backgroundColor = "red";
            } else {
              square.style.backgroundColor = "black";
              square.style.borderColor = "gray";
            }
          });
        }
      }
    });

    box.addEventListener("mouseout", function() {
      let boxesToShade = [];
      if (orient === "horizontal") {
        for (let i = 0; i < ship.lengthOfShip; i++) {
          if ((index + i) % 10 >= index % 10) {
            boxesToShade.push(array[index + i]);
          }
        }
        boxesToShade.forEach(square => {
          if (square.id === "empty") {
            square.style.backgroundColor = "white";
            square.style.borderColor = "black";
          } else {
            square.style.backgroundColor = "black";
            square.style.borderColor = "gray";
          }
        });
      } else if (orient === "vertical") {
        for (let i = 0; i < ship.lengthOfShip * 10; i += 10) {
          if (index + i < 100) {
            boxesToShade.push(array[index + i]);
          }
        }
        boxesToShade.forEach(square => {
          if (square.id === "empty") {
            square.style.backgroundColor = "white";
            square.style.borderColor = "black";
          } else {
            square.style.backgroundColor = "black";
            square.style.borderColor = "gray";
          }
        });
      }
    });
  });
}

function checkIfValid(index, grid, orientation, ship) {
  if (orientation === "horizontal") {
    if (index % 10 > 10 - ship.lengthOfShip) {
      return false;
    } else {
      for (let i = 0; i < ship.lengthOfShip; i++) {
        if (grid[index + i].id !== "empty") {
          return false;
        }
      }
      return true;
    }
  } else if (orientation === "vertical") {
    if (index > 99 - (ship.lengthOfShip - 1) * 10) {
      return false;
    } else {
      for (let i = 0; i < ship.lengthOfShip * 10; i += 10) {
        if (grid[index + i].id !== "empty") {
          return false;
        }
      }
      return true;
    }
  }
}

function recordCoordinates(index, orientation, ship) {
  if (orientation === "horizontal") {
    for (let i = 0; i < ship.lengthOfShip; i++) {
      ship.coordinates[index + i] = false;
    }
  } else {
    for (let i = 0; i < ship.lengthOfShip * 10; i += 10) {
      ship.coordinates[index + i] = false;
    }
  }
}

function addShipToDom(ship, grid) {
  for (let coordinate in ship.coordinates) {
    grid[coordinate].id = ship.type;
  }
}
