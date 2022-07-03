function processOutput(packagesObject) {
  let outputStr = "";
  for (let p in packagesObject) {
    outputStr += packagesObject[p].getSummary() + "\n";
  }
  return outputStr;
}

module.exports = processOutput;
