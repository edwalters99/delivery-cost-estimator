const processOutput = require("./processOutput");
const Package = require("./package");

const pkg1 = new Package(
  "PKG1", // pkgID,
  10, //   pkgWeightInKg,
  100, //   pkgDistanceInKm,
  100, //   baseDeliveryCost,
  "xxxxxx" //   offerCode
);
const pkg2 = new Package(
  "PKG2", // pkgID,
  10, //   pkgWeightInKg,
  100, //   pkgDistanceInKm,
  50, //   baseDeliveryCost,
  "xxxxxx" //   offerCode
);
const pkg3 = new Package(
  "PKG3", // pkgID,
  10, //   pkgWeightInKg,
  100, //   pkgDistanceInKm,
  20, //   baseDeliveryCost,
  "xxxxxx" //   offerCode
);

const packagesObject = { PKG1: pkg1, PKG2: pkg2, PKG3: pkg3 };

describe("processOutput", () => {
  it("returns a multi line output string concatenating the return values from the getSummary() method of each Package in packagesObject ", () => {
    const output = processOutput(packagesObject);
    expect(output.split("\n")[0]).toEqual(pkg1.getSummary());
    expect(output.split("\n")[1]).toEqual(pkg2.getSummary());
    expect(output.split("\n")[2]).toEqual(pkg3.getSummary());
  });
  it("returns an output string that matches expected output for this case", () => {
    const output = processOutput(packagesObject);
    expect(output.split("\n")[0]).toEqual("PKG1 0 700");
    expect(output.split("\n")[1]).toEqual("PKG2 0 650");
    expect(output.split("\n")[2]).toEqual("PKG3 0 620");
  });
  it("returns an empty string when packagesObject is undefined", () => {
    const output = processOutput(undefined);
    expect(output).toEqual("");
  });
});
