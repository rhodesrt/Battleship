export let newShip = (lengthOfShip, type) => {
  let coordinates = {};

  // true is hit, false is not hit
  let isSunk = () => {
    let sunk = true;
    for (let coordinate in coordinates) {
      if (!coordinates[coordinate]) {
        sunk = false;
      }
    }
    return sunk;
  };

  return {
    lengthOfShip,
    coordinates,
    type,
    isSunk
  };
};
