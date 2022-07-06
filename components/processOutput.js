function processOutput(packagesObject) {
  if (!packagesObject) {
    throw new Error(
      "PackagesObject unavailable. Unable to process output String"
    );
  }
  let outputStr = "";
  for (let p in packagesObject) {
    outputStr += packagesObject[p].getSummary() + "\n";
  }
  return outputStr;
}

module.exports = processOutput;
