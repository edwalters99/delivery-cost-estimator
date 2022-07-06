function processOutput(packagesObject) {
  if (!packagesObject) {
    throw new Error(
      'PackagesObject unavailable. Unable to process output String',
    );
  }
  let outputStr = '';
  Object.keys(packagesObject).forEach((key) => {
    outputStr += `${packagesObject[key].getSummary()}\n`;
  });

  return outputStr;
}

module.exports = processOutput;
