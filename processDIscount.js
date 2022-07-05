function processDiscount(packagesObject, offersData) {
  if (!packagesObject) {
    throw new Error("PackagesObject unavailable. Unable to process discount");
  }
  if (!offersData) {
    throw new Error("offersData unavailable. Unable to process discount");
  }
  for (let p in packagesObject) {
    if (packagesObject[p].checkDiscountValid(offersData)) {
      packagesObject[p].applyDiscount(offersData);
    }
  }
}

module.exports = processDiscount;
