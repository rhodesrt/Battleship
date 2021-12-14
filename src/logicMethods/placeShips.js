import { newShip } from "./shipFactory.js";
import { placePlayerFleet } from "./playerShipPlacement.js";
import { attackPhase } from "./attackPhase.js";

export function placeShips(player, computer) {
  placeComputerFleet(computer);
  placePlayerFleet(player, computer);
}

function placeComputerFleet(computer) {
  let alertBox = document.querySelector(".alert-box");
  alertBox.textContent = "Placing Computer's Fleet";

  let gridArray = Array.from(
    document.querySelector(".computer-board").querySelectorAll(".grid-box")
  );

  let carrier = newShip(5, "carrier");
  findCoordinates(carrier).forEach(coordinate => {
    carrier.coordinates[coordinate] = false;
    gridArray[coordinate].id = carrier.type;
  });
  computer.fleet.push(carrier);

  let battleship = newShip(4, "battleship");
  findCoordinates(battleship).forEach(coordinate => {
    battleship.coordinates[coordinate] = false;
    gridArray[coordinate].id = battleship.type;
  });
  computer.fleet.push(battleship);

  let cruiser = newShip(3, "cruiser");
  findCoordinates(cruiser).forEach(coordinate => {
    cruiser.coordinates[coordinate] = false;
    gridArray[coordinate].id = cruiser.type;
  });
  computer.fleet.push(cruiser);

  let submarine = newShip(3, "submarine");
  findCoordinates(submarine).forEach(coordinate => {
    submarine.coordinates[coordinate] = false;
    gridArray[coordinate].id = submarine.type;
  });
  computer.fleet.push(submarine);

  let destroyer = newShip(2, "destroyer");
  findCoordinates(destroyer).forEach(coordinate => {
    destroyer.coordinates[coordinate] = false;
    gridArray[coordinate].id = destroyer.type;
  });
  computer.fleet.push(destroyer);

  alertBox.textContent = "Placed Computer's Fleet";

  // For testing: remove when in final dev stage
  // computer.fleet.forEach(ship => {
  //   for (let coordinate in ship.coordinates) {
  //     gridArray[coordinate].style.backgroundColor = "gray";
  //   }
  // });
}

function findCoordinates(ship) {
  let grid = Array.from(
    document.querySelector(".computer-board").querySelectorAll(".grid-box")
  );
  let array = [];

  let returnArr = [];
  let orientation = generateOrientation();
  while (array.length < ship.lengthOfShip) {
    returnArr = nextCoord(array, orientation, grid, ship.lengthOfShip);
    if (returnArr[0]) {
      array.push(returnArr[1]);
    } else {
      while (array.length !== 0) {
        array.pop();
      }
      continue;
    }
  }
  return array;

  function generateOrientation() {
    if (Math.floor(Math.random() * 2) === 0) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }
}

function nextCoord(arr, orient, nodeGrid, length) {
  let returnValues = [];
  let coordinate = Math.floor(Math.random() * 100);
  if (arr.length === 0) {
    if (orient === "horizontal") {
      while (nodeGrid[coordinate].id !== "empty" || coordinate % 10 > length) {
        coordinate = Math.floor(Math.random() * 100);
      }
    } else if (orient === "vertical") {
      while (
        nodeGrid[coordinate].id !== "empty" ||
        coordinate >= (length + 1) * 10
      ) {
        coordinate = Math.floor(Math.random() * 100);
      }
    }
    returnValues[0] = true;
    returnValues[1] = coordinate;
    return returnValues;
  } else {
    if (orient === "horizontal") {
      coordinate = arr[arr.length - 1] + 1;
      if (nodeGrid[coordinate].id !== "empty") {
        returnValues[0] = false;
        returnValues[1] = null;
        return returnValues;
      } else {
        returnValues[0] = true;
        returnValues[1] = coordinate;
        return returnValues;
      }
    } else if (orient === "vertical") {
      coordinate = arr[arr.length - 1] + 10;
      if (nodeGrid[coordinate].id !== "empty") {
        returnValues[0] = false;
        returnValues[1] = null;
        return returnValues;
      } else {
        returnValues[0] = true;
        returnValues[1] = coordinate;
        return returnValues;
      }
    }
  }
}
