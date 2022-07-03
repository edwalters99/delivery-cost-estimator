const Package = require("./package");

function processInput(data) {
  if (!data) {
    throw new Error("Missing Data");
  }

  const lines = data.split(/\r?\n/);
  const baseDeliveryCost = Number(lines[0].split(" ")[0]);
  const noOfPackages = Number(lines[0].split(" ")[1]);
  const packagesRows = lines.slice(1);
  const packagesObject = {};
  if (noOfPackages !== packagesRows.length) {
    throw new Error("Input Data inconsistency (number of packages)");
  }

  packagesRows.forEach((row) => {
    row = row.split(" ");
    const [pkgID, pkgWeightInKg, pkgDistanceInKm, offerCode] = row;
    if (
      !pkgID ||
      !pkgWeightInKg ||
      isNaN(pkgWeightInKg) ||
      pkgWeightInKg <=0 ||
      !pkgDistanceInKm ||
      isNaN(pkgDistanceInKm) ||
      pkgDistanceInKm <= 0
    ) {
      throw new Error("Input Data incomplete / incorrect format");
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
