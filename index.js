const processInput = require("./processInput.js");
const offersData = require("./offers.json");

// Ensure filename is supplied from the command line
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

const fs = require("fs"),
  filename = process.argv[2];
fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;
  const packagesObject = processInput(data);
  let outputStr = "";
  for (let pkg in packagesObject) {
    if (packagesObject[pkg].checkDiscountValid(offersData)) {
      packagesObject[pkg].applyDiscount(offersData);
    }
    outputStr += packagesObject[pkg].getSummary() + "\n";
  }
  process.stdout.write(outputStr);
});
