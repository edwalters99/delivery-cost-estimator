const processDiscount = require('./processDiscount');
const Package = require('./package');

jest.mock('./package');

const pkg1 = new Package(
  'PKG1', // pkgID,
  5, //   pkgWeightInKg,
  5, //   pkgDistanceInKm,
  100, //   baseDeliveryCost,
  'OFR001', //   offerCode
);
const pkg2 = new Package(
  'PKG2', // pkgID,
  15, //   pkgWeightInKg,
  5, //   pkgDistanceInKm,
  100, //   baseDeliveryCost,
  'OFR002', //   offerCode
);
const pkg3 = new Package(
  'PKG3', // pkgID,
  10, //   pkgWeightInKg,
  100, //   pkgDistanceInKm,
  100, //   baseDeliveryCost,
  'OFR003', //   offerCode
);

const packagesObject = { PKG1: pkg1, PKG2: pkg2, PKG3: pkg3 };

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

describe('processDiscount', () => {
  it('throws an error if packagesObject is undefined', () => {
    function packagesObjectUnd() {
      processDiscount(undefined, offersData);
    }
    expect(packagesObjectUnd).toThrowError(
      'PackagesObject unavailable. Unable to process discount',
    );
  });
  it('throws an error if offersData is undefined', () => {
    function offersDataUnd() {
      processDiscount(packagesObject, undefined);
    }
    expect(offersDataUnd).toThrowError(
      'offersData unavailable. Unable to process discount',
    );
  });
  it('modifies this.#discount in Package object', () => {
    expect(packagesObject['PKG1'].getDiscount()).toBe(0);
    expect(packagesObject['PKG3'].getDiscount()).toBe(0);
    processDiscount(packagesObject, offersData);
    expect(packagesObject['PKG1'].getDiscount()).toBe(0);
    expect(packagesObject['PKG3'].getDiscount()).toBe(35);
  });
});
