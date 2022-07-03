const Package = require("./package");

function processInput(data) {
  const lines = data.split(/\r?\n/);
  const baseDeliveryCost = Number(lines[0].split(" ")[0]);
  const noOfPackages = Number(lines[0].split(" ")[1]);
  const packages = lines.slice(1);
  if (noOfPackages !== packages.length) {
    throw new Error("Input Data inconsistency");
  }
  const packagesObject = {};

  packages.forEach((package) => {
    package = package.split(" ");
    const [pkgID, pkgWeightInKg, pkgDistanceInKm] = package;
    if (!pkgID || !pkgWeightInKg || !pkgDistanceInKm) {
      throw new Error("Input Data inconsistency");
    }

    const newPackage = new Package(
      pkgID,
      Number(pkgWeightInKg),
      Number(pkgDistanceInKm),
      baseDeliveryCost
    );

    if (!packagesObject[pkgID]) {
      packagesObject[pkgID] = newPackage;
    } else {
      throw new Error("Duplicate package ID");
    }

    // if (newPackage.checkDiscountValid(offerCode, offersData)) {
    //   newPackage.applyDiscount(offerCode, offersData);
    // }

    // console.log(testPackage.getSummary());
    // console.log(testPackage.checkDiscountValid(offerCode, offersData))

    // if (testPackage.checkDiscountValid(offerCode, offersData)) {
    //   testPackage.applyDiscount(offerCode, offersData);
    // }
  });
  return packagesObject;
}

module.exports = processInput;
