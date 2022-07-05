const Package = require("./package");
const offersData = {
  OFR001: {
    discountPercent: 10,
    distanceMin: 0,
    distanceMax: 200,
    weightMin: 70,
    weightMax: 200,
  },
  OFR002: {
    discountPercent: 7,
    distanceMin: 50,
    distanceMax: 150,
    weightMin: 100,
    weightMax: 250,
  },
  OFR003: {
    discountPercent: 5,
    distanceMin: 50,
    distanceMax: 250,
    weightMin: 10,
    weightMax: 150,
  },
};

describe("Package", () => {
  const pkg = new Package(
    "PKG3", // pkgID,
    10, //   pkgWeightInKg,
    100, //   pkgDistanceInKm,
    100, //   baseDeliveryCost,
    "OFR003" //   offerCode
  );

  test("defines getSummary()", () => {
    expect(typeof pkg.getSummary).toBe("function");
  });
  test("defines checkDiscountValid()", () => {
    expect(typeof pkg.checkDiscountValid).toBe("function");
  });
  test("defines applyDiscount()", () => {
    expect(typeof pkg.applyDiscount).toBe("function");
  });
  test("getSummary() returns string", () => {
    expect(typeof pkg.getSummary()).toBe("string");
  });
  test("getSummary() return string contains 3 space-separated substrings", () => {
    expect(pkg.getSummary().split(" ")).toHaveLength(3);
  });
  test("getSummary() return string contains package ID in first position", () => {
    expect(pkg.getSummary().split(" ")[0]).toBe(pkg.getPkgID());
  });
  test("getSummary() return string contains positive numeric value in second position (discount)", () => {
    expect(Number(pkg.getSummary().split(" ")[1])).toBeGreaterThanOrEqual(0);
  });
  test("getSummary() return string contains positive numeric value in third position (total)", () => {
    expect(Number(pkg.getSummary().split(" ")[2])).toBeGreaterThanOrEqual(0);
  });
  test("applyDiscount(offersData) sets this.#discount correctly when offerCode is valid (test1)", () => {
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(35);
  });
  test("applyDiscount(offersData) sets this.#discount correctly when offerCode is valid (test2)", () => {
    const pkg = new Package(
      "PKG2", // pkgID,
      150, //   pkgWeightInKg,
      100, //   pkgDistanceInKm,
      50, //   baseDeliveryCost,
      "OFR002" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(143.5);
  });
  test("applyDiscount(offersData) sets this.#discount correctly when offerCode is valid (test3)", () => {
    const pkg = new Package(
      "PKG2", // pkgID,
      71, //   pkgWeightInKg,
      199, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR001" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(180.5);
  });
  test("applyDiscount(offersData) sets this.#total correctly when offerCode is valid", () => {
    const pkg = new Package(
      "PKG2", // pkgID,
      71, //   pkgWeightInKg,
      199, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR001" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getTotal()).toBe(1624.5);
  });

  test("applyDiscount(offersData) sets this.#total correctly when offerCode is invalid", () => {
    const pkg = new Package(
      "PKG2", // pkgID,
      71, //   pkgWeightInKg,
      199, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "XXXXXXX" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getTotal()).toBe(1805);
  });

  test("applyDiscount(offersData) sets this.#discount to 0 when offerCode is null", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      10, //   pkgWeightInKg,
      100, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      null //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when offerCode is null", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      10, //   pkgWeightInKg,
      100, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      null //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
  test("applyDiscount(offersData) sets this.#discount to 0 when offerCode is not valid", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      10, //   pkgWeightInKg,
      100, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR009" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when offerCode is not valid", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      10, //   pkgWeightInKg,
      100, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR009" //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
  test("applyDiscount(offersData) sets this.#discount to 0 when Distance is below minimum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      100, //   pkgWeightInKg,
      49, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR002" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when Distance is below minimum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      100, //   pkgWeightInKg,
      49, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR002" //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
  test("applyDiscount(offersData) sets this.#discount to 0 when Distance is above maximum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      100, //   pkgWeightInKg,
      160, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR002" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when Distance is above maximum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      100, //   pkgWeightInKg,
      160, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR002" //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
  test("applyDiscount(offersData) sets this.#discount to 0 when Weight is below minimum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      8, //   pkgWeightInKg,
      60, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR003" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when Weight is above maximum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      8, //   pkgWeightInKg,
      60, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR003" //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
  test("applyDiscount(offersData) sets this.#discount to 0 when Distance is below minimum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      20, //   pkgWeightInKg,
      49, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR003" //   offerCode
    );
    pkg.applyDiscount(offersData);
    expect(pkg.getDiscount()).toBe(0);
  });
  test("checkDiscountValid(offersData) returns false when Distance is above maximum criteria in offer", () => {
    const pkg = new Package(
      "PKG3", // pkgID,
      20, //   pkgWeightInKg,
      49, //   pkgDistanceInKm,
      100, //   baseDeliveryCost,
      "OFR003" //   offerCode
    );
    pkg.checkDiscountValid(offersData);
    expect(pkg.checkDiscountValid(offersData)).toBe(false);
  });
});
