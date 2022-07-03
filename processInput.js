const Package = require("./package");
const offersData = require("./offers.json");

function processInput(data) {
  const lines = data.split(/\r?\n/);
  const baseDeliveryCost = Number(lines[0].split(" ")[0]);
  const noOfPackages = Number(lines[0].split(" ")[1]);
  const packages = lines.slice(1);
  if (noOfPackages !== packages.length) {
    throw new Error("Input Data inconsistency");
  }

  packages.forEach((package) => {
    package = package.split(" ");
    const [pkgID, pkgWeightInKg, pkgDistanceInKm, offerCode] = package;
    if (!pkgID || !pkgWeightInKg || !pkgDistanceInKm) {
      throw new Error("Input Data inconsistency");
    }
    let testPackage = new Package(
      pkgID,
      Number(pkgWeightInKg),
      Number(pkgDistanceInKm),
      baseDeliveryCost
    );
    // console.log(testPackage.getSummary());
    // console.log(testPackage.checkDiscountValid(offerCode, offersData))

    if (testPackage.checkDiscountValid(offerCode, offersData)) {
      testPackage.applyDiscount(offerCode, offersData);
    }
  });
}

module.exports = processInput;
