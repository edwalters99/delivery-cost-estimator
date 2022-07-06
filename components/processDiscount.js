function processDiscount(packagesObject, offersData) {
  if (!packagesObject) {
    throw new Error('PackagesObject unavailable. Unable to process discount');
  }
  if (!offersData) {
    throw new Error('offersData unavailable. Unable to process discount');
  }
  Object.keys(packagesObject).forEach((key) => {
    if (packagesObject[key].checkDiscountValid(offersData)) {
      packagesObject[key].applyDiscount(offersData);
    }
  });
}

module.exports = processDiscount;
