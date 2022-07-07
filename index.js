const fs = require('fs');
const processInput = require('./components/processInput');
const processDiscount = require('./components/processDiscount');
const processOutput = require('./components/processOutput');
const offersData = require('./offers.json');

function main() {
  if (process.argv.length < 3) {
    process.stdout.write(`Usage: node ${process.argv[1]} FILENAME\n`);
    process.exit(1);
  }

  const filename = process.argv[2];
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    try {
      const packagesObject = processInput(data);
      processDiscount(packagesObject, offersData);
      process.stdout.write(processOutput(packagesObject));
    } catch (error) {
      throw new Error(`Internal processing error: ${error}`);
    }
  });
}

main();

module.exports = main;
