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
    const [pkgID, pkgWeightInKg, pkgDistanceInKm, offerCode] = package;
    if (!pkgID || !pkgWeightInKg || !pkgDistanceInKm) {
      throw new Error("Input Data inconsistency");
    }

    const newPackage = new Package(
      pkgID,
      Number(pkgWeightInKg),
      Number(pkgDistanceInKm),
      baseDeliveryCost,
      offerCode
    );

    if (!packagesObject[pkgID]) {
      packagesObject[pkgID] = newPackage;
    } else {
      throw new Error("Duplicate package ID");
    }
  });
  return packagesObject;
}

module.exports = processInput;
