const processInput = require('./processInput');

const data = `100 3
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 10 100 OFR003`;

const data2 = `100 4
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 10 100 OFR003
PKG4 5 50 OFR004`;

const data3 = `100 2
PKG1 5 5 OFR001`;

const data4 = `100 3
PKG1 5 5 OFR001
15 5 OFR002
PKG3 10 100 OFR003`;

const data5 = `100 3
PKG1 5 5 OFR001
PKG2 15 5 OFR002
PKG3 100 OFR003`;

const data6 = `100 3
PKG1 5 5
PKG2 15 5
PKG3 10 100 OFR003`;

const data7 = `100 3
PKG1 5 5 OFR001
PKG1 15 5 OFR002
PKG3 10 100 OFR003`;

const data8 = `100 3
PKG1 5 5 OFR001
PKG2 15 G5 OFR002
PKG3 10 100 OFR003`;

const data9 = `100 3
PKG1 5 5 OFR001
PKG2 15 55 OFR002
PKG3 A1 100 OFR003`;

const data10 = `100 3
PKG1 5 -5 OFR001
PKG2 15 55 OFR002
PKG3 11 100 OFR003`;

const data11 = `100 3
PKG1 5 5 OFR001
PKG2 15 55 OFR002
PKG3 0 100 OFR003`;

const data12 = `100 3
PKG1 5 5 OFR001
PKG2 15 55 OFR002
PKG3 10 100 OFR003 OFR004`;

describe('processInput', () => {
  it('returns a package object when passed valid data', () => {
    const output = processInput(data);
    expect(output).toEqual({ PKG1: {}, PKG2: {}, PKG3: {} });
  }),
    it('returns an object with the same size as noOfPackages ', () => {
      const output = processInput(data2);
      expect(Object.keys(output).length).toEqual(4);
    }),
    it('throws a Missing Data error when data is undefined', () => {
      function undefinedInput() {
        processInput(undefined);
      }
      expect(undefinedInput).toThrowError('Missing Data');
    }),
    it('throws a Data inconsistency error when noOfPackages does not match number of package rows', () => {
      function noOfPackagesMismatch() {
        processInput(data3);
      }
      expect(noOfPackagesMismatch).toThrowError(
        'Input Data inconsistency (number of packages)'
      );
    }),
    it('throws a Data error when package ID is missing', () => {
      function packageIdMissing() {
        processInput(data4);
      }
      expect(packageIdMissing).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    }),
    it('throws a Data error when package distance or weight is missing', () => {
      function packageDistanceWeightMissing() {
        processInput(data5);
      }
      expect(packageDistanceWeightMissing).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    }),
    it('returns a package object when offer code(s) are missing', () => {
      const output = processInput(data6);
      expect(output).toEqual({ PKG1: {}, PKG2: {}, PKG3: {} });
    }),
    it('throws a duplicate Package ID error when two rows have the same Package ID', () => {
      function packageIDDuplicate() {
        processInput(data7);
      }
      expect(packageIDDuplicate).toThrowError('Duplicate package ID');
    }),
    it('throws a Data error when package distance is alphanumeric', () => {
      function packageDistanceAlphanumeric() {
        processInput(data8);
      }
      expect(packageDistanceAlphanumeric).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    }),
    it('throws a Data error when package weight is alphanumeric', () => {
      function packageWeightAlphanumeric() {
        processInput(data9);
      }
      expect(packageWeightAlphanumeric).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    }),
    it('throws a Data error when package distance is negative or zero', () => {
      function packageDistanceNegative() {
        processInput(data10);
      }
      expect(packageDistanceNegative).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    }),
    it('throws a Data error when package weight is negative or zero', () => {
      function packageWeightNegative() {
        processInput(data11);
      }
      expect(packageWeightNegative).toThrowError(
        'Input Data incomplete / incorrect format'
      );
    });
    it('throws a Data error when more than one offerCode is supplied', () => {
      function moreThanOneOfferCode() {
        processInput(data12);
      }
      expect(moreThanOneOfferCode).toThrowError(
        'Input Data inconsistency (Only one discount code can be supplied per package)',
      );
    });
});
