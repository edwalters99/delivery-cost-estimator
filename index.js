const processInput = require("./processInput");
const processDiscount = require("./processDiscount");
const processOutput = require("./processOutput");
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
  processDiscount(packagesObject, offersData);
  process.stdout.write(processOutput(packagesObject));
});
