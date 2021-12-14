export function attackPhase(player, computer) {
  let attackBtn = document.querySelector("#place-ship");
  let newAttackBtn = attackBtn.cloneNode(true);
  attackBtn.replaceWith(newAttackBtn);
  attackBtn = newAttackBtn;
  attackBtn.id = "attack-button";
  attackBtn.textContent = "Make Attacks";
  attackBtn.disabled = false;

  let playerGrid = Array.from(
    document.querySelector(".player-board").querySelectorAll(".grid-box")
  );
  let computerGrid = Array.from(
    document.querySelector(".computer-board").querySelectorAll(".grid-box")
  );
  playerGrid = cloneGrid(playerGrid);

  attackBtn.addEventListener("click", () => {
    attackBtn.disabled = true;
    attackCycle(playerGrid, computerGrid, player, computer);
  });
}

function attackCycle(playerGrid, computerGrid, player, computer) {
  if (sankFleet(player, computer)) {
    return;
  } else {
    makeAttacks(playerGrid, computerGrid, player, computer);
  }
}

function makeAttacks(playerGrid, computerGrid, player, computer) {
  computerGrid = cloneGrid(computerGrid);
  attackHover(computerGrid);
  computerGrid.forEach((square, index) => {
    if (validateSquare(square)) {
      square.addEventListener("click", () => {
        playerAttack(square, index, computer);
        if (sankFleet(player, computer)) {
          return;
        }
        computerAttack(playerGrid, player);
        attackCycle(playerGrid, computerGrid, player, computer);
        return;
      });
    }
  });
}

function computerAttack(grid, player) {
  let rand = Math.floor(Math.random() * 100);
  while (!validateSquare(grid[rand])) {
    rand = Math.floor(Math.random() * 100);
  }
  let square = grid[rand];
  if (square.id === "empty") {
    square.classList.add("miss");
  } else {
    square.classList.add("hit");
    square.style.backgroundColor = "red";
    square.style.borderColor = "black";
    square.textContent = "X";
    let shipType = square.id;
    let shipHit;
    player.fleet.forEach(ship => {
      if (ship.type === shipType) {
        shipHit = ship;
      }
    });
    for (let coordinate in shipHit.coordinates) {
      if (coordinate === rand) {
        shipHit.coordinates[coordinate] = true;
      }
    }
  }
}

function playerAttack(square, index, computer) {
  if (square.id === "empty") {
    square.classList.add("miss");
    square.textContent = "";
  } else {
    square.classList.add("hit");
    let shipType = square.id;
    console.log(`Hit ship: ${shipType} at ${index}`);
    let shipHit;
    computer.fleet.forEach(ship => {
      if (ship.type === shipType) {
        shipHit = ship;
      }
    });
    for (let coordinate in shipHit.coordinates) {
      if (parseInt(coordinate) === index) {
        shipHit.coordinates[coordinate] = true;
        console.log(
          `Changed ${shipHit.type} ${coordinate} to ${shipHit.coordinates[coordinate]}.`
        );
      }
    }
  }
}

function cloneGrid(grid) {
  grid = grid.map(box => {
    let newBox = box.cloneNode(true);
    box.replaceWith(newBox);
    return newBox;
  });
  return grid;
}

function sankFleet(player, computer) {
  let playerFleetSunk = true;
  let computerFleetSunk = true;
  player.fleet.forEach(ship => {
    for (let coordinate in ship.coordinates) {
      if (!ship.coordinates[coordinate]) {
        playerFleetSunk = false;
      }
    }
  });
  computer.fleet.forEach(ship => {
    for (let coordinate in ship.coordinates) {
      if (!ship.coordinates[coordinate]) {
        computerFleetSunk = false;
      }
    }
  });
  if (computerFleetSunk === true) {
    let computerGrid = Array.from(
      document.querySelector(".computer-board").querySelectorAll(".grid-box")
    );
    computerGrid = cloneGrid(computerGrid);
    displayWinMessage(player);
    return true;
  } else if (playerFleetSunk === true) {
    let computerGrid = Array.from(
      document.querySelector(".computer-board").querySelectorAll(".grid-box")
    );
    computerGrid = cloneGrid(computerGrid);
    displayWinMessage(computer);
    return true;
  } else {
    return false;
  }
}

function attackHover(grid) {
  grid.forEach(square => {
    if (validateSquare(square)) {
      square.addEventListener("mouseover", () => {
        square.textContent = "X";
      });
      square.addEventListener("mouseout", () => {
        square.textContent = "";
      });
    }
  });
}

function validateSquare(square) {
  if (square.classList.contains("miss")) {
    return false;
  } else if (square.classList.contains("hit")) {
    return false;
  } else {
    return true;
  }
}

function displayWinMessage(winner) {
  let alertBox = document.querySelector(".alert-box");
  alertBox.textContent = `${winner.name} wins!!!`;
}
