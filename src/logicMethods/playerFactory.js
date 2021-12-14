import { newShip } from "./shipFactory.js";

export const newPlayer = name => {
  let fleet = [];
  let fleetPush = ship => {
    fleet.push(ship);
  };

  let allSunk = () => {
    let allSunk = true;
    fleet.forEach(ship => {
      if (!ship.isSunk()) {
        allSunk = false;
      }
    });
    return allSunk;
  };

  return {
    name,
    allSunk,
    fleet,
    fleetPush
  };
};
