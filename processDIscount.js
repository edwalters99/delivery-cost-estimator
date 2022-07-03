const offersData = require("./offers.json");

function processDiscount(packagesObject) {
  for (let p in packagesObject) {
    if (packagesObject[p].checkDiscountValid(offersData)) {
      packagesObject[p].applyDiscount(offersData);
    }
  }
}

module.exports = processDiscount;
