const processInput = require("./processInput.js");
const processDiscount = require("./processDiscount.js");

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
  processDiscount(packagesObject);
  let outputStr = "";
  for (let p in packagesObject) {
    // if (packagesObject[p].checkDiscountValid(offersData)) {
    //   packagesObject[p].applyDiscount(offersData);
    // }
    outputStr += packagesObject[p].getSummary() + "\n";
  }
  process.stdout.write(outputStr);
});
